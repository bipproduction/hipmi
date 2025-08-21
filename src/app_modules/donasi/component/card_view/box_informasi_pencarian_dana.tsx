import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Box, Center } from "@mantine/core";
import _ from "lodash";

import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { ScrollOnly } from "next-scroll-loader";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { donasi_funGetListPencairanDanaById } from "../../fun/get/get_list_pencairan_dana_by_id";
import { MODEL_DONASI_PENCAIRAN_DANA } from "../../model/interface";
import { ComponentDonasi_CardPencairanDana } from "./card_pencairan_dana";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetDonasiPencairanDanaById } from "../../lib/api_donasi";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export function ComponentDonasi_InformasiPencairanDana() {
  const param = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_DONASI_PENCAIRAN_DANA[] | null>(null);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    onLoadData();
  }, [param.id]);

  async function onLoadData() {
    try {
      const response = await apiGetDonasiPencairanDanaById({
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

  const onLoadMoreData = async () => {
    try {
      const nextPage = activePage + 1;
      setActivePage(nextPage);
      const response = await apiGetDonasiPencairanDanaById({
        id: param.id,
        page: nextPage,
      });
      if (response.success) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!data) return <CustomSkeleton height={300} mt={"lg"} />;

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData height={20} />
      ) : (
        <Box>
          <ScrollOnly
            height="62vh"
            renderLoading={() => (
              <Center>
                <ComponentGlobal_Loader size={25} />
              </Center>
            )}
            data={data}
            setData={setData as any}
            moreData={onLoadMoreData}
          >
            {(item) => <ComponentDonasi_CardPencairanDana data={item} />}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
