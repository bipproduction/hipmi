"use client";

import { Stack } from "@mantine/core";
import ComponentEvent_DetailMainData from "../../component/detail/detail_main";

export default function Event_DetailRiwayat() {
  return (
    <>
      <Stack spacing={"lg"} py={"md"}>
        <ComponentEvent_DetailMainData />
        {/* <ComponentEvent_ListPeserta eventId={eventId}  /> */}
      </Stack>
    </>
  );
}
