"use client";

import ComponentEvent_DetailData from "../../component/detail/detail_data";
import ComponentEvent_ListPeserta from "../../component/detail/list_peserta";
import { MODEL_EVENT } from "../../model/interface";

export default function Event_DetailPublish({
  dataEvent,
  totalPeserta,
  eventId,
}: {
  dataEvent: MODEL_EVENT;
  totalPeserta: number;
  eventId: string;
}) {
  return (
    <>
      <ComponentEvent_DetailData data={dataEvent} />
      <ComponentEvent_ListPeserta eventId={eventId} total={totalPeserta} />
    </>
  );
}
