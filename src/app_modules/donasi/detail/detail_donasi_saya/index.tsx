"use client";

import { Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import ComponentDonasi_CeritaPenggalangMain from "../../component/detail_main/cerita_penggalang";
import { ComponentDonasi_DetailDataMain } from "../../component/detail_main/detail_data_donasi";
import ComponentDonasi_InformasiPenggalangMain from "../../component/detail_main/informasi_penggalang";
import TampilanRupiahDonasi from "../../component/tampilan_rupiah";
import { MODEL_DONASI_INVOICE } from "../../model/interface";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { apiGetCountDonatur, apiGetDonasiInvoiceById } from "../../lib/api_donasi";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function DetailDonasiSaya() {
  const params = useParams<{ id: string }>();
  const invoiceId = params.id;
  const [invoice, setInvoice] = useState<MODEL_DONASI_INVOICE | null>(null);
  const [countDonatur, setCountDonatur] = useState<number | null>(null);

  useShallowEffect(() => {
    onLoadData();
    getCountDonatur();
  }, [invoiceId]);

  async function onLoadData() {
    try {
      const response = await apiGetDonasiInvoiceById({ id: invoiceId });
      if (response.success) {
        setInvoice(response.data);
      }
    } catch (error) {
      console.error("Error fetching invoice data:", error);
    }
  }

  async function getCountDonatur() {
    try {
      const response = await apiGetCountDonatur({ id: invoiceId });
      if (response.success) {
        setCountDonatur(response.data);
      }
    } catch (error) {
      console.error("Error fetching count donatur data:", error);
    }
  }

  if (!invoice || countDonatur === null) {
    return <CustomSkeleton height={400} />;
  }

  return (
    <>
      <Stack pb={"lg"}>
        <Stack
          spacing={0}
          style={{
            padding: "15px",
            border: `2px solid ${AccentColor.blue}`,
            backgroundColor: AccentColor.darkblue,
            borderRadius: "10px",
            color: "white",
          }}
          align={"center"}
        >
          <Text>Donasi Saya:</Text>
          <Title order={4} c={"blue"}>
            <TampilanRupiahDonasi nominal={+invoice?.nominal} />
          </Title>
        </Stack>
        <ComponentDonasi_DetailDataMain
          donasi={invoice?.Donasi}
          countDonatur={countDonatur}
        />
        <ComponentDonasi_InformasiPenggalangMain
          author={invoice?.Donasi.Author}
        />
        <ComponentDonasi_CeritaPenggalangMain donasi={invoice?.Donasi} />
      </Stack>
    </>
  );
}
