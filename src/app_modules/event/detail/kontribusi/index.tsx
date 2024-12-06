"use client";

import { Stack } from "@mantine/core";
import ComponentEvent_DetailMainData from "../../component/detail/detail_main";
import ComponentEvent_ListPeserta from "../../component/detail/list_peserta";

export default function Event_DetailKontribusi({
  eventId,
  totalPeserta,
}: {
  eventId: string;
  totalPeserta: number;
}) {
  return (
    <>
      <Stack spacing={"lg"} mb={"md"}>
        <ComponentEvent_DetailMainData eventId={eventId} />
        <ComponentEvent_ListPeserta eventId={eventId} total={totalPeserta} />
      </Stack>
    </>
  );
}
