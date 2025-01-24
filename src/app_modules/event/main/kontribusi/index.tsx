"use client";

import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import {
  Box,
  Center
} from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { ComponentEvent_CardKontributor } from "../../component/card_view/card_kontributor";
import { event_getListKontibusiByUserId } from "../../fun/get/get_list_kontribusi_by_user_id";
import { MODEL_EVENT_PESERTA } from "../../_lib/interface";

export default function Event_Kontribusi({
  listKontribusi,
}: {
  listKontribusi: MODEL_EVENT_PESERTA[];
}) {
  const [data, setData] = useState(listKontribusi);
  const [activePage, setActivePage] = useState(1);

  return (
    <Box>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        <Box>
          <ScrollOnly
            height="82vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <ComponentGlobal_Loader />
              </Center>
            )}
            data={data}
            setData={setData}
            moreData={async () => {
              const loadData = await event_getListKontibusiByUserId({
                page: activePage + 1,
              });

              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => <ComponentEvent_CardKontributor data={item} />}
          </ScrollOnly>
        </Box>
        // --- Main component --- //
      )}
    </Box>
  );
}
