"use client";
import { gs_realtimeData, IRealtimeData } from "@/lib/global_state";
import { Button, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { WibuRealtime } from "wibu-pkg";
import { v4 } from "uuid";

export default function Page() {
  const [dataRealtime, setDataRealtime] = useAtom(gs_realtimeData);

  useShallowEffect(() => {
    console.log(
      dataRealtime?.userId == "user2"
        ? console.log("")
        : console.log(dataRealtime)
    );
  }, [dataRealtime]);

  async function onSend() {
    const newData: IRealtimeData = {
      appId: v4(),
      status: "Publish",
      userId: "user2",
      pesan: "apa kabar",
      title: "coba",
      kategoriApp: "INVESTASI",
    };

    WibuRealtime.setData({
      type: "notification",
      pushNotificationTo: "ADMIN",
    });
  }

  return (
    <Stack p={"md"} align="center" justify="center" h={"80vh"}>
      <Button
        onClick={() => {
          onSend();
        }}
      >
        Dari test 2 cuma notif
      </Button>
    </Stack>
  );
}
