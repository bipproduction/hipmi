"use client";

import { Stack } from "@mantine/core";
import ComponentEvent_ListPeserta from "../../component/detail/list_peserta";
import { MODEL_EVENT_PESERTA } from "../../model/interface";
import { useParams } from "next/navigation";
import ComponentEvent_ListPesertaNew from "../../component/detail/list_peserta_new";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetEventPesertaById } from "../../_lib/api_event";
import { useState } from "react";
import { clientLogger } from "@/util/clientLogger";

// function Event_DaftarPeserta({ totalPeserta, eventId, isNewPeserta }: {
//   totalPeserta?: number;
//   eventId?: string;
//   isNewPeserta?: boolean | null;
// }) {
function Event_DaftarPeserta() {
  const params = useParams<{ id: string }>();

  const [data, setData] = useState<MODEL_EVENT_PESERTA[] | null>(null);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    onLoadDataPeserta();
  }, []);

  async function onLoadDataPeserta() {
    try {
      const respone = await apiGetEventPesertaById({
        id: params.id,
        page: `${activePage}`,
      });

      if (respone) {
        console.log(respone.data);
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get data peserta:", error);
    }
  }

  return (
    <>
      <Stack>
        <ComponentEvent_ListPesertaNew />
        {/* <ComponentEvent_ListPeserta eventId={params.id} total={totalPeserta as any} isNewPeserta={isNewPeserta} /> */}
      </Stack>
    </>
  );
}

export default Event_DaftarPeserta;
