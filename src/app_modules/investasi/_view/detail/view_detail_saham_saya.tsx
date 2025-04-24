import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  Investasi_ComponentBoxDetailData,
  Investasi_ComponentBoxHargaDanLembarSaham,
  Investasi_ComponentBoxProgress,
} from "../../_component";
import {
  apiGetOneSahamInvestasiById
} from "../../_lib/api_fetch_new_investasi";
import { MODEL_INVOICE_INVESTASI } from "../../_lib/interface";

export function Investasi_ViewDetailSahamSaya() {
  const param = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_INVOICE_INVESTASI | null>(null);

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      const response = await apiGetOneSahamInvestasiById({ id: param.id });
      if (response.success) {
        setData(response.data);
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Error get investasi", error);
      setData(null);
    }
  };

  if (!data) return <CustomSkeleton height={"80vh"} width={"100%"} />;

  return (
    <>
      <Stack mb={"lg"}>
        <Investasi_ComponentBoxHargaDanLembarSaham data={data as any} />
        <Investasi_ComponentBoxProgress
          progress={data?.Investasi?.progress as any}
        />
        <Investasi_ComponentBoxDetailData data={data as any} />
      </Stack>
    </>
  );
}
