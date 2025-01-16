"use client";
import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { clientLogger } from "@/util/clientLogger";
import { Box, Center, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Investasi_SkeletonListDokumen } from "../../_component/skeleton_view";
import { apiGetBeritaInvestasiById } from "../../_lib/api_interface";

export function Investasi_ViewRekapBerita() {
  const params = useParams<{ id: string }>();
  const investasiId = params.id;

  const router = useRouter();
  const [data, setData] = useState<any[] | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [visible, setVisible] = useState(false);


  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetBeritaInvestasiById({
        id: investasiId,
        kategori: "get-all",
        page: `${activePage}`,
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get data berita", error);
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
                const respone = await apiGetBeritaInvestasiById({
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
              <ComponentGlobal_CardStyles
                onClickHandler={() => {
                  router.push(NEW_RouterInvestasi.berita({ id: item.id }), {
                    scroll: false,
                  });
                  setVisible(true);
                }}
              >
                <Title order={6} lineClamp={1}>
                  {item.title}
                </Title>
                {visible && (
                  <ComponentGlobal_CardLoadingOverlay />
                )}
              </ComponentGlobal_CardStyles>
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
