"use client";

import { Stack } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import ComponentEvent_DetailMainData from "../../component/detail/detail_main";
import ComponentEvent_ListPeserta from "../../component/detail/list_peserta";

export default function Event_DetailRiwayat({
  totalPeserta,
}: {
  totalPeserta: number;
}) {
  const params = useParams<{ id: string }>();
  const eventId = params.id;
  const router = useRouter();
  const [total, setTotal] = useState(totalPeserta);

  return (
    <>
      <Stack spacing={"lg"} py={"md"}>
        <ComponentEvent_DetailMainData />
        <ComponentEvent_ListPeserta eventId={eventId} total={total} />
      </Stack>
    </>
  );
}
