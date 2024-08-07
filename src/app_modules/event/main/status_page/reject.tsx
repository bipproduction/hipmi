"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import {
  Box,
  Center,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MODEL_EVENT } from "../../model/interface";
import ComponentEvent_BoxListStatus from "../../component/box_list_status";
import _ from "lodash";
import ComponentEvent_IsEmptyData from "../../component/is_empty_data";
import { event_getAllReject } from "../../fun/get/status/get_all_reject";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { event_getAllReview } from "../../fun/get/status/get_all_review";

export default function Event_StatusReject({
  listReject,
}: {
  listReject: MODEL_EVENT[];
}) {
  const [data, setData] = useState(listReject);
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
              const loadData = await event_getAllReject({
                page: activePage + 1,
              });
              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentEvent_BoxListStatus
                data={item}
                path={RouterEvent.detail_reject}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
