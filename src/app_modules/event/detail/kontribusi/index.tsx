"use client";

import { Stack } from "@mantine/core";
import ComponentEvent_DetailMainData from "../../component/detail/detail_main";

export default function Event_DetailKontribusi() {
  return (
    <>
      <Stack spacing={"lg"} mb={"md"}>
        <ComponentEvent_DetailMainData />
        {/* <ComponentEvent_ListPeserta eventId={eventId} total={totalPeserta} /> */}
      </Stack>
    </>
  );
}
