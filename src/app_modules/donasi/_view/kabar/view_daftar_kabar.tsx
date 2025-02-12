import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Box, Center } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import ComponentDonasi_ListKabar from "../../component/card_view/ui_card_kabar";
import { donasi_funGetListKabarById } from "../../fun/get/get_list_kabar";

export function Donasi_ViewDaftarKabar({ dataDonasi ,donasiId}: { dataDonasi: any[], donasiId: string }) {
  const [data, setData] = useState(dataDonasi);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        <Box>
          <ScrollOnly
            height="92vh"
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
                route={RouterDonasi.detail_kabar}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
