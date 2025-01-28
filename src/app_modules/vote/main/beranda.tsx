"use client";

import { gs_votingTiggerBeranda } from "@/app/lib/global_state";
import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { clientLogger } from "@/util/clientLogger";
import {
  Affix,
  Box,
  Button,
  Center,
  Loader,
  rem,
  Stack,
  TextInput,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { apiGetAllVoting } from "../_lib/api_voting";
import { Voting_ComponentSkeletonViewPublish } from "../component";
import ComponentVote_CardViewPublish from "../component/card_view_publish";
import { MODEL_VOTING } from "../model/interface";

export default function Vote_Beranda() {
  const [data, setData] = useState<MODEL_VOTING[] | null>(null);
  const [activePage, setActivePage] = useState(1);

  // Realtime
  const [isTriggerVotingBeranda, setIsTriggerVotingBeranda] = useAtom(
    gs_votingTiggerBeranda
  );
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useShallowEffect(() => {
    if (isTriggerVotingBeranda) {
      setIsShowUpdate(true);
    }
  }, [isTriggerVotingBeranda, setIsShowUpdate]);

  useShallowEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const loadData = await apiGetAllVoting({
        kategori: "beranda",
        page: "1",
      });
      setData(loadData.data as any);
      setIsTriggerVotingBeranda(false);
    } catch (error) {
      clientLogger.error("Error get data beranda", error);
    }
  }

  async function onSearch(s: string) {
    try {
      const loadData = await apiGetAllVoting({
        kategori: "beranda",
        page: "1",
        search: s,
      });
      setData(loadData.data as any);
    } catch (error) {
      clientLogger.error("Error get data beranda", error);
    }
  }

  async function onLoadData() {
    try {
      setIsLoading(true);
      const loadData = await apiGetAllVoting({
        kategori: "beranda",
        page: "1",
      });
      setData(loadData.data as any);
      setIsShowUpdate(false);
      setIsTriggerVotingBeranda(false);
    } catch (error) {
      clientLogger.error("Error get data beranda", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Stack mt={"1vh"}>
      {isShowUpdate && (
        <Affix position={{ top: rem(100) }} w={"100%"}>
          <Center>
            <Button
              style={{
                transition: "0.5s",
                border: `1px solid ${AccentColor.skyblue}`,
              }}
              bg={AccentColor.blue}
              loaderPosition="center"
              loading={isLoading}
              radius={"xl"}
              opacity={0.8}
              onClick={() => {
                onLoadData();
              }}
            >
              Update beranda
            </Button>
          </Center>
        </Affix>
      )}

      <TextInput
        radius={"xl"}
        placeholder="Masukan judul voting"
        onChange={(val) => onSearch(val.target.value)}
        styles={{ input: { backgroundColor: MainColor.white } }}
      />

      <ComponentGlobal_CreateButton path={RouterVote.create} />

      {_.isNull(data) ? (
        <Voting_ComponentSkeletonViewPublish />
      ) : _.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        <Box>
          <ScrollOnly
            height="75vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <Loader color={"yellow"} />
              </Center>
            )}
            data={data}
            setData={setData as any}
            moreData={async () => {
              const loadData = await apiGetAllVoting({
                kategori: "beranda",
                page: `${activePage + 1}`,
              });

              setActivePage((val) => val + 1);

              return loadData.data;
            }}
          >
            {(item) => (
              <ComponentVote_CardViewPublish
                data={item}
                path={RouterVote.main_detail}
                authorName={true}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </Stack>
  );
}
