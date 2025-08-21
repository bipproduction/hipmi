"use client";

import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { Box, Center } from "@mantine/core";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import _ from "lodash";
import { ComponentDonasi_CardStatus } from "../../component/card_view/card_status";
import { MODEL_DONASI } from "../../model/interface";
import { donasi_funGetAllStatusReview } from "../../fun/get/status/get_all_status_review";
import { ScrollOnly } from "next-scroll-loader";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { useState } from "react";

export default function PostingReviewDonasi({
  listReview,
}: {
  listReview: MODEL_DONASI[];
}) {
  const [data, setData] = useState(listReview);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        // --- Main component --- //
        <Box>
          <ScrollOnly
            height="75vh"
            renderLoading={() => (
              <Center>
                <ComponentGlobal_Loader size={25} />
              </Center>
            )}
            data={data}
            setData={setData}
            moreData={async () => {
              const loadData = await donasi_funGetAllStatusReview({
                page: activePage + 1,
              });
              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentDonasi_CardStatus
                data={item}
                path={RouterDonasi.detail_review}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
