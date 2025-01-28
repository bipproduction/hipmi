"use client";

import { Stack } from "@mantine/core";
import ComponentEvent_DetailMainData from "../../component/detail/detail_main";
import ComponentEvent_ListPeserta from "../../component/detail/list_peserta";
import { useParams } from "next/navigation";

export default function Event_DetailKontribusi({
  totalPeserta,
}: {
  totalPeserta: number;
}) {
  const params = useParams<{id: string}>()
  const eventId = params.id
  return (
    <>
      <Stack spacing={"lg"} mb={"md"}>
        <ComponentEvent_DetailMainData/>
        <ComponentEvent_ListPeserta eventId={eventId} total={totalPeserta} />
      </Stack>
    </>
  );
}
