import { RouterAdminInvestasi } from "@/lib/router_admin/router_admin_investasi";
import { Center, Image, Paper, Text } from "@mantine/core";

export function AdminInvestasi_ViewBuktiTransfer({
  imageId,
}: {
  imageId: string;
}) {
  return (
    <>
      <Center>
        <Paper withBorder p={"md"}>
          <Image
            width={300}
            alt="Foto"
            src={RouterAdminInvestasi.api_bukti_transfer + imageId}
          />
        </Paper>
      </Center>
    </>
  );
}
