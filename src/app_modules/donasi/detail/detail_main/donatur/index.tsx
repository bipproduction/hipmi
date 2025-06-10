"use client";

import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { ComponentDonasi_CardDonatur } from "@/app_modules/donasi/component/card_view/ui_card_donatur";
import { apiGetDonasiListDonaturById } from "@/app_modules/donasi/lib/api_donasi";
import { MODEL_DONASI_INVOICE } from "@/app_modules/donasi/model/interface";
import { Box, Center } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function DonaturDonasi() {
  const param = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_DONASI_INVOICE[] | null>(null);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const response = await apiGetDonasiListDonaturById({
        id: param.id,
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
      const response = await apiGetDonasiListDonaturById({
        id: param.id,
        page: nextPage,
      });

      if (response.success) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (!data) return <CustomSkeleton height={200} />;

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
            setData={setData as any}
            moreData={onMoreData}
          >
            {(item) => <ComponentDonasi_CardDonatur data={item} />}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
