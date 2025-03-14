"use client";

import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import { RouterForum } from "@/lib/router_hipmi/router_forum";
import { clientLogger } from "@/util/clientLogger";
import {
  Affix,
  Box,
  Center,
  Loader,
  Stack,
  TextInput,
  rem,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { apiGetAllForum } from "../component/api_fetch_forum";
import { ButtonUpdateBeranda } from "../component/button/button_update_beranda";
import ComponentForum_BerandaCardView from "../component/main_component/card_view";
import { Forum_ComponentIsDataEmpty } from "../component/other_component";
import { Forum_SkeletonCard } from "../component/skeleton_view";
import { MODEL_FORUM_POSTING } from "../model/interface";
import mqtt_client from "@/util/mqtt_client";
import { AccentColor } from "@/app_modules/_global/color";

export default function Forum_Beranda({
  userLoginId,
}: {
  userLoginId: string;
}) {
  const [data, setData] = useState<MODEL_FORUM_POSTING[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setIsSearch] = useState("");
  const [isNewPost, setIsNewPost] = useState(false);
  const [countNewPost, setCountNewPost] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useShallowEffect(() => {
    handleLoadData(isSearch);
  }, [isSearch]);

  const handleLoadData = async (isSearch: string) => {
    setIsLoading(true);
    try {
      const response = await apiGetAllForum({
        page: "1",
        search: isSearch,
      });

      if (response) {
        setData(response.data);
        setActivePage(1);
        setHasMore(response.data.length > 0);
      }
    } catch (error) {
      clientLogger.error("Error get data forum", error);
      setData([]);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMoreData = async () => {
    if (!hasMore || isLoading) return null;

    try {
      const nextPage = activePage + 1;

      const response = await apiGetAllForum({
        page: `${nextPage}`,
        search: isSearch,
      });

      if (response?.data && response.data.length > 0) {
        setActivePage(nextPage);
        setHasMore(response.data.length > 0);
        return response.data;
      } else {
        setHasMore(false);
        return null;
      }
    } catch (error) {
      clientLogger.error("Error get data forum", error);
      setHasMore(false);
      return null;
    }
  };

  const hanldeSearch = async (text: string) => {
    setIsSearch(text);
    setActivePage(1);
    setHasMore(true);
  };

  useShallowEffect(() => {
    mqtt_client.subscribe("Forum_create_new");
    mqtt_client.subscribe("Forum_ganti_status");
    mqtt_client.subscribe("Forum_hapus_data");
    mqtt_client.subscribe("Forum_detail_ganti_status");

    mqtt_client.on("message", (topic: any, message: any) => {
      // console.log(topic);
      const cloneData = _.clone(data);

      if (topic === "Forum_create_new") {
        const newData = JSON.parse(message.toString());
        setIsNewPost(newData.isNewPost);
        const tambah = countNewPost + newData.count;
        setCountNewPost(tambah);
      }

      if (topic === "Forum_hapus_data") {
        const newData = JSON.parse(message.toString());
        setData(newData.data);
      }

      if (topic === "Forum_ganti_status") {
        const newData = JSON.parse(message.toString());
        setData(newData.data);
      }

      if (topic === "Forum_detail_ganti_status") {
        const newData = JSON.parse(message.toString());

        const updateOneData = cloneData?.map((val) => ({
          ...val,
          ForumMaster_StatusPosting: {
            id:
              val.id === newData.id
                ? newData.data.id
                : val.ForumMaster_StatusPosting.id,
            status:
              val.id === newData.id
                ? newData.data.status
                : val.ForumMaster_StatusPosting.status,
          },
        }));

        setData(updateOneData as any);
      }
    });
  }, [countNewPost, data]);

  return (
    <>
      {isNewPost && (
        <Affix position={{ top: rem(100) }} w={"100%"}>
          <ButtonUpdateBeranda
            countNewPost={countNewPost}
            onSetData={(val) => setData(val)}
            onSetIsNewPost={(val) => {
              setIsNewPost(val);
            }}
            onSetCountNewPosting={(val) => {
              setCountNewPost(val);
            }}
          />
        </Affix>
      )}

      <ComponentGlobal_CreateButton path={RouterForum.create} />

      <Stack>
        <TextInput
          disabled={!data}
          radius={"xl"}
          placeholder="Topik forum apa yang anda cari hari ini ?"
          onChange={(val) => {
            hanldeSearch(val.currentTarget.value);
          }}
        />

        {!data.length && isLoading ? (
          <Forum_SkeletonCard />
        ) : _.isEmpty(data) ? (
          <Forum_ComponentIsDataEmpty />
        ) : (
          // --- Main component --- //
          <Box
          >
            <ScrollOnly
              height="80vh"
              renderLoading={() => (
                <Center mt={"lg"}>
                  <Loader color={"yellow"} />
                </Center>
              )}
              data={data}
              setData={setData as any}
              moreData={handleMoreData}
            >
              {(item) => (
                <ComponentForum_BerandaCardView
                  data={item}
                  userLoginId={userLoginId}
                  onLoadData={(val) => {
                    setData(val);
                  }}
                  allData={data}
                />
              )}
            </ScrollOnly>
          </Box>
        )}
      </Stack>
    </>
  );
}
