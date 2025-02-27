import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { ActionIcon, Flex, Loader, Paper, Text } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

function Event_ComponentBoxDaftarSponsor() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const params = useParams<{ id: string }>();
  return (
    <>
      <Paper
        style={{
          padding: "15px",
          backgroundColor: AccentColor.blue,
          border: `2px solid ${AccentColor.softblue}`,
          borderRadius: "10px",
          color: "white",
        }}
        onClick={() => {
          // setLoading(true);
          // router.push(RouterEvent.daftar_sponsor({ id: params.id }), {
          //   scroll: false,
          // });
          ComponentGlobal_NotifikasiPeringatan("Fitur belum tersedia");
        }}
      >
        <Flex direction={"column"} align={"center"} justify={"center"}>
          <Text c={MainColor.white} fz={12}>
            Daftar Sponsor
          </Text>
          <ActionIcon radius={"xl"} variant="transparent" size={60}>
            {isLoading ? (
              <Loader color="yellow" />
            ) : (
              <IconStar size={40} color={MainColor.white} />
            )}
          </ActionIcon>
        </Flex>
      </Paper>
    </>
  );
}
export default Event_ComponentBoxDaftarSponsor;
