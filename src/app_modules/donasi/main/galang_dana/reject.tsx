"use client";

import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Box, Center } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { ComponentDonasi_CardStatus } from "../../component/card_view/card_status";
import { donasi_funGetAllStatusReject } from "../../fun/get/status/get_all_status_reject";
import { MODEL_DONASI } from "../../model/interface";

export default function PostingRejectDonasi({
  listReject,
}: {
  listReject: MODEL_DONASI[];
}) {
  const [data, setData] = useState(listReject);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
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
              const loadData = await donasi_funGetAllStatusReject({
                page: activePage + 1,
              });

              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentDonasi_CardStatus
                data={item}
                path={RouterDonasi.detail_reject}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
