"use client";

import {
  Box,
  Center,
  Loader
} from "@mantine/core";

import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentEvent_CardRiwayat } from "../../component/card_view/card_riwayat";
import { event_getListSemuaRiwayat } from "../../fun/get/riwayat/get_list_semua_riwayat";
import { MODEL_EVENT } from "../../model/interface";

export default function Event_SemuaRiwayat({
  listData,
}: {
  listData: MODEL_EVENT[];
}) {
  const router = useRouter();
  const [data, setData] = useState(listData);
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
              const loadData = await event_getListSemuaRiwayat({
                page: activePage + 1,
              });
              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => <ComponentEvent_CardRiwayat data={item} />}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
