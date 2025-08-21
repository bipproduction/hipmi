"use client";

import { useParams } from "next/navigation";
import ComponentEvent_DetailData from "../../component/detail/detail_data";
import { useState } from "react";
import { clientLogger } from "@/util/clientLogger";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetEventDetailById } from "../../_lib/api_event";
import { MODEL_EVENT } from "../../_lib/interface";

export default function Event_DetailPublish() {
  const params = useParams<{ id: string }>();
  const eventId = params.id as string;
  const [data, setData] = useState<MODEL_EVENT | null>(null);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetEventDetailById({
        id: eventId,
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get data detail event", error);
    }
  }

  return (
    <>
      <ComponentEvent_DetailData isDaftarPeserta={true} data={data} />
    </>
  );
}
