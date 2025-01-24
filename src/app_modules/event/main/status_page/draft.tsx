"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Box, Center, Loader } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import ComponentEvent_BoxListStatus from "../../component/box_list_status";
import { event_getAllDraft } from "../../fun/get/status/get_all_draft";
import { MODEL_EVENT } from "../../_lib/interface";

export default function Event_StatusDraft({
  listDraft,
}: {
  listDraft: MODEL_EVENT[];
}) {
  const [data, setData] = useState(listDraft);
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
              const loadData = await event_getAllDraft({
                page: activePage + 1,
              });
              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentEvent_BoxListStatus
                data={item}
                path={RouterEvent.detail_draft}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
