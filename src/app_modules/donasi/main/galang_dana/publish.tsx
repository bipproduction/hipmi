"use client";

import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Box, Center } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import ComponentDonasi_CardPublish from "../../component/card_view/card_publish";
import { donasi_funGetAllStatusPublish } from "../../fun/get/status/get_all_status_publish";
import { MODEL_DONASI } from "../../model/interface";

export default function PostingPublishDonasi({
  listPublish,
}: {
  listPublish: MODEL_DONASI[];
}) {
  const [data, setData] = useState(listPublish);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        <Box >
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
              const loadData = await donasi_funGetAllStatusPublish({
                page: activePage + 1,
              });

              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentDonasi_CardPublish
                data={item}
                path={RouterDonasi.detail_publish}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
