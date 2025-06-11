"use client";

import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { Box, Center, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useParams } from "next/navigation";
import { useState } from "react";
import ComponentDonasi_ListKabar from "../../component/card_view/ui_card_kabar";
import { apiGetDonasiListKabarById } from "../../lib/api_donasi";
import { MODEL_DONASI_KABAR } from "../../model/interface";

export function Donasi_ViewRekapKabar() {
  const { id } = useParams();
  const [data, setData] = useState<MODEL_DONASI_KABAR[] | null>(null);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const response = await apiGetDonasiListKabarById({
        id: id as string,
        page: activePage,
      });

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function onMoreData() {
    try {
      const nextPage = activePage + 1;
      setActivePage(nextPage);
      const response = await apiGetDonasiListKabarById({
        id: id as string,
        page: nextPage,
      });

      if (response.success) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (!data) return <CustomSkeleton height={100} />;

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
              setData={setData as any}
              moreData={onMoreData}
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
