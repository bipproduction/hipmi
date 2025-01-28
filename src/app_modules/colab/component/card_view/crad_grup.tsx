import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import { AccentColor, MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Paper, Grid, Stack, Center, Loader, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ComponentColab_CardGrup({ data }: { data: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [idRoom, setIdRoom] = useState("");

  return (
    <>
      <Paper
        style={{
          border: `2px solid ${AccentColor.blue}`,
          backgroundColor: AccentColor.darkblue,
          color: MainColor.white,
          borderRadius: "10px",
          marginBottom: "20px",
          padding: "15px",
        }}
        onClick={() => {
          router.push(
            RouterColab.group_chat + data?.ProjectCollaboration_RoomChat.id,
            { scroll: false }
          );
          setIdRoom(data?.ProjectCollaboration_RoomChat.id);
          setLoading(true);
        }}
      >
        <Grid align="center" h={"100%"}>
          <Grid.Col span={"auto"}>
            <Stack spacing={0}>
              <Text fw={"bold"} lineClamp={1}>
                {data?.ProjectCollaboration_RoomChat?.name}
              </Text>
              <Text fz={"xs"} >
                {
                  data?.ProjectCollaboration_RoomChat
                    ?.ProjectCollaboration_AnggotaRoomChat.length
                }{" "}
                Anggota
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={"content"}>
            <Center>
              {data?.ProjectCollaboration_RoomChat?.id === idRoom ? (
                <ComponentGlobal_Loader />
              ) : (
                <IconChevronRight color={MainColor.white} />
              )}
            </Center>
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
}
