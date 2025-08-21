import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_LoadImageCustom,
} from "@/app_modules/_global/component";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import {
  Badge,
  Card,
  Grid,
  Group,
  Progress,
  Stack,
  Text
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_DONASI_INVOICE } from "../../model/interface";
import ComponentDonasi_TampilanHitungMundur from "../tampilan_hitung_mundur";
import TampilanRupiahDonasi from "../tampilan_rupiah";

export function ComponentDonasi_CardInvoice({
  data,
}: {
  data: MODEL_DONASI_INVOICE;
}) {
  const router = useRouter();
  const [donasiId, setEventId] = useState("");
  const [visible, setVisible] = useState(false);

  async function onCekInvoice() {
    if (data.donasiMaster_StatusInvoiceId === "1") {
      return router.push(RouterDonasi.detail_donasi_saya + `${data?.id}`);
    } else {
      if (data.donasiMaster_StatusInvoiceId === "2") {
        return router.push(RouterDonasi.proses_transaksi + `${data?.id}`);
      } else {
        if (data.donasiMaster_StatusInvoiceId === "3") {
          return router.push(RouterDonasi.invoice + `${data?.id}`);
        } else {
          ComponentGlobal_NotifikasiGagal("Gagal Melihat Invoice");
        }
      }
    }
  }

  return (
    <>
      <Card
        style={{
          backgroundColor: AccentColor.blue,
          border: `2px solid ${AccentColor.darkblue}`,
          padding: "15px",
          cursor: "pointer",
          borderRadius: "10px",
          color: "white",
          marginBottom: "15px",
        }}
        onClick={() => onCekInvoice()}
      >
        <Stack>
          <Grid>
            <Grid.Col span={5}>
              <Stack spacing={5}>
                <Stack spacing={0}>
                  <Text fz={"xs"} fw={"bold"} truncate>
                    {data.Donasi.title}
                  </Text>
                  <ComponentDonasi_TampilanHitungMundur
                    durasi={data.Donasi.DonasiMaster_Durasi.name}
                    publishTime={data.Donasi.publishTime}
                    textSize={10}
                  />
                </Stack>
                <Progress value={+data.Donasi.progres} color="orange" />
                <Group position="apart">
                  <Stack spacing={0}>
                    <Text fz={10}>Donasi Saya</Text>
                    <Text fz={10} fw={"bold"} c={"orange"} truncate>
                      <TampilanRupiahDonasi nominal={+data.nominal} />
                    </Text>
                  </Stack>
                </Group>
                <Badge size="xs" variant="filled" color="yellow">
                  <Text>{data.DonasiMaster_StatusInvoice.name}</Text>
                </Badge>
              </Stack>
            </Grid.Col>
            <Grid.Col span={7}>
              <ComponentGlobal_LoadImageCustom
                height={150}
                fileId={data.Donasi.imageId}
              />
            </Grid.Col>
          </Grid>
          {/* {width > 575 ? "" : <Divider />} */}
        </Stack>
        {visible && donasiId !== "" ? (
          <ComponentGlobal_CardLoadingOverlay />
        ) : (
          ""
        )}
      </Card>
    </>
  );
}
