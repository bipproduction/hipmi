"use client";

import { RouterEvent } from "@/lib/router_hipmi/router_event";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Box, Center, Loader } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import ComponentEvent_BoxListStatus from "../../component/box_list_status";
import { event_getAllReview } from "../../fun/get/status/get_all_review";
import { MODEL_EVENT } from "../../_lib/interface";

export default function Event_StatusReview({
  listReview,
}: {
  listReview: MODEL_EVENT[];
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
              <Center mt={"lg"}>
                <Loader color={"yellow"} />
              </Center>
            )}
            data={data}
            setData={setData}
            moreData={async () => {
              const loadData = await event_getAllReview({
                page: activePage + 1,
              });
              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentEvent_BoxListStatus
                data={item}
                path={RouterEvent.detail_review}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
