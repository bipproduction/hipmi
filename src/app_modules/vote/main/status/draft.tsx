"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { clientLogger } from "@/util/clientLogger";
import { Box, Center, Loader } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { apiGetAllVoting } from "../../_lib/api_voting";
import { Voting_ComponentSkeletonViewStatus } from "../../component";
import ComponentVote_CardViewStatus from "../../component/card_view_status";
import { MODEL_VOTING } from "../../model/interface";

export default function Vote_StatusDraft() {
  const [data, setData] = useState<MODEL_VOTING[] | null>(null);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const respone = await apiGetAllVoting({
        kategori: "status",
        page: "1",
        status: "3",
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get data review", error);
    }
  }

  return (
    <>
      {_.isNull(data) ? (
        <Voting_ComponentSkeletonViewStatus />
      ) : _.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        // --- Main component --- //
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
              const respone = await apiGetAllVoting({
                kategori: "status",
                page: `${activePage + 1}`,
                status: "3",
              });
              setActivePage((val) => val + 1);

              return respone.data;
            }}
          >
            {(item) => (
              <ComponentVote_CardViewStatus
                data={item}
                path={RouterVote.detail_review}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
