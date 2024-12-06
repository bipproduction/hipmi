"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Box, Center } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import ComponentEvent_BoxListStatus from "../../component/box_list_status";
import { event_getAllByStatusId } from "../../fun";
import { MODEL_EVENT } from "../../model/interface";

export default function Event_StatusPublish({
  listPublish,
}: {
  listPublish: MODEL_EVENT[];
}) {
  const [data, setData] = useState(listPublish);
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
                <ComponentGlobal_Loader size={25} />
              </Center>
            )}
            data={data}
            setData={setData}
            moreData={async () => {
              const loadData = await event_getAllByStatusId({
                page: activePage + 1,
                statusId: "1"
              });
              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentEvent_BoxListStatus
                data={item}
                path={RouterEvent.detail_publish}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
