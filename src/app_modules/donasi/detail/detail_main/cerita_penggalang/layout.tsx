"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewFooter,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import ButtonDonasi from "@/app_modules/donasi/component/footer_button_donasi";
import { apiGetOneDonasiById } from "@/app_modules/donasi/lib/api_donasi";
import { MODEL_DONASI } from "@/app_modules/donasi/model/interface";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function LayoutCeritaPenggalangDonasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const param = useParams<{ id: string }>();
  const [data, setData] = useState({} as MODEL_DONASI);
  const [loading, setLoading] = useState(true);

  useShallowEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const response = await apiGetOneDonasiById(param.id, "semua");

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // if (data?.donasiMaster_StatusDonasiId !== "1") {
  //   return (
  //     <>
  //       <UI_NewLayoutTamplate>
  //         <UI_NewHeader>
  //           <Component_Header title="Cerita Penggalang Dana" />
  //         </UI_NewHeader>
  //         <UI_NewChildren>{children}</UI_NewChildren>
  //       </UI_NewLayoutTamplate>
  //     </>
  //   );
  // }

  return (
    <UI_NewLayoutTamplate>
      <UI_NewHeader>
        <Component_Header title="Cerita Penggalang Dana" />
      </UI_NewHeader>
      <UI_NewChildren>
        {loading ? (
          <CustomSkeleton height={400} />
        ) : (
          data?.donasiMaster_StatusDonasiId === "1" ? (
            children
          ) : (
            <CustomSkeleton height={400} />
          )
        )}
      </UI_NewChildren>
      {data?.donasiMaster_StatusDonasiId === "1" && (
        <UI_NewFooter>
          <ButtonDonasi donasiId={data?.id as string} />
        </UI_NewFooter>
      )}
    </UI_NewLayoutTamplate>
  );
}
