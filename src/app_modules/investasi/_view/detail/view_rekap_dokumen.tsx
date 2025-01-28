import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Box, Center } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { Investasi_ComponentCardRekapDocument } from "../../_component";
import { investasi_funGetAllDocumentById } from "../../_fun";
import { MODEL_INVESTASI_DOKUMEN } from "../../_lib/interface";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { apiGetDokumenInvestasiById } from "../../_lib/api_interface";
import { Investasi_SkeletonListDokumen } from "../../_component/skeleton_view";
import { clientLogger } from "@/util/clientLogger";

export function Investasi_ViewRekapDokumen() {
  const params = useParams<{ id: string }>();
  const investasiId = params.id;

  const [data, setData] = useState<MODEL_INVESTASI_DOKUMEN[] | null>(null);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetDokumenInvestasiById({
        id: investasiId,
        kategori: "get-all",
        page: `${activePage}`,
      });

      if (respone.success) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get data dokumen", error);
    }
  }

  if (data === null) {
    return <Investasi_SkeletonListDokumen />;
  }

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        <Box>
          <ScrollOnly
            height="90vh"
            renderLoading={() => (
              <Center>
                <ComponentGlobal_Loader size={25} />
              </Center>
            )}
            data={data}
            setData={setData as any}
            moreData={async () => {
              try {
                const respone = await apiGetDokumenInvestasiById({
                  id: investasiId,
                  kategori: "get-all",
                  page: `${activePage + 1}`,
                });

                if (respone.success) {
                  setActivePage((val) => val + 1);

                  return respone.data;
                }
              } catch (error) {
                clientLogger.error("Error load data dokumen:", error);
              }
            }}
          >
            {(item) => (
              <Investasi_ComponentCardRekapDocument
                data={item}
                onSetData={(val) => setData(val) as any}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
