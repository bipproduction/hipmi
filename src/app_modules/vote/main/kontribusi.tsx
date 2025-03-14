"use client";

import { RouterVote } from "@/lib/router_hipmi/router_vote";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { clientLogger } from "@/util/clientLogger";
import { Box, Center, Loader, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { apiGetAllVoting } from "../_lib/api_voting";
import ComponentVote_CardViewPublish from "../component/card_view_publish";
import { MODEL_VOTE_KONTRIBUTOR } from "../model/interface";
import { Voting_ComponentSkeletonViewKontribusi } from "../component/skeleton_view";

export default function Vote_Kontribusi() {
  const [data, setData] = useState<MODEL_VOTE_KONTRIBUTOR[] | null>(null);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const loadData = await apiGetAllVoting({
        kategori: "kontribusi",
        page: "1",
      });
      setData(loadData.data as any);
    } catch (error) {
      clientLogger.error("Error get data beranda", error);
    }
  }

  return (
    <>
      <Stack>
        {_.isNull(data) ? (
          <Voting_ComponentSkeletonViewKontribusi />
        ) : _.isEmpty(data) ? (
          <ComponentGlobal_IsEmptyData />
        ) : (
          <Box>
            <ScrollOnly
              height="80vh"
              renderLoading={() => (
                <Center mt={"lg"}>
                  <Loader color={"yellow"} />
                </Center>
              )}
              data={data}
              setData={setData as any}
              moreData={async () => {
                const loadData = await apiGetAllVoting({
                  kategori: "kontribusi",
                  page: `${activePage + 1}`,
                });

                setActivePage((val) => val + 1);

                return loadData.data;
              }}
            >
              {(item) => (
                <ComponentVote_CardViewPublish
                  path={RouterVote.detail_kontribusi}
                  pilihanSaya={true}
                  data={item.Voting}
                  authorName={true}
                  namaPilihan={item.Voting_DaftarNamaVote.value}
                />
              )}
            </ScrollOnly>
          </Box>
        )}
      </Stack>
    </>
  );
}
