"use client";

import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Box, Center, Stack } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentDonasi_ListKabar from "../../component/card_view/ui_card_kabar";
import { donasi_funGetListKabarById } from "../../fun/get/get_list_kabar";
import { MODEL_DONASI_KABAR } from "../../model/interface";

export function Donasi_ViewRekapKabar({
  donasiId,
  listKabar,
}: {
  donasiId: string;
  listKabar: MODEL_DONASI_KABAR[];
}) {
  const router = useRouter();
  const [data, setData] = useState(listKabar);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Stack>
        {_.isEmpty(data) ? (
          <ComponentGlobal_IsEmptyData />
        ) : (
          <Box>
            <ScrollOnly
              height="85vh"
              renderLoading={() => (
                <Center>
                  <ComponentGlobal_Loader size={25} />
                </Center>
              )}
              data={data}
              setData={setData}
              moreData={async () => {
                const loadData = await donasi_funGetListKabarById({
                  page: activePage + 1,
                  donasiId: donasiId,
                });

                setActivePage((val) => val + 1);

                return loadData;
              }}
            >
              {(item) => (
                <ComponentDonasi_ListKabar
                  kabar={item}
                  route={RouterDonasi.update_kabar}
                />
              )}
            </ScrollOnly>
          </Box>
        )}
      </Stack>
    </>
  );
}
