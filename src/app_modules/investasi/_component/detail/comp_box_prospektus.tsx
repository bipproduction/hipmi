import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { ActionIcon, Flex, Loader, Paper, Text } from "@mantine/core";
import { IconBookDownload } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";

export function Investasi_ComponentBoxProspektus({
  prospektusFileId,
}: {
  prospektusFileId: string;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

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
          if (!prospektusFileId)
            return ComponentGlobal_NotifikasiPeringatan(
              "Prospektus belum diupload"
            );
          setLoading(true);
          router.push(
            NEW_RouterInvestasi.file_prospektus({ id: prospektusFileId }),
            { scroll: false }
          );
        }}
      >
        <Flex direction={"column"} align={"center"} justify={"center"}>
          <Text c={MainColor.white} fz={12}>
            Prospektus
          </Text>
          <ActionIcon radius={"xl"} variant="transparent" size={60}>
            {isLoading ? (
              <Loader color="yellow" />
            ) : (
              <IconBookDownload size={70} color={MainColor.white} />
            )}
          </ActionIcon>
        </Flex>
      </Paper>
    </>
  );
}
