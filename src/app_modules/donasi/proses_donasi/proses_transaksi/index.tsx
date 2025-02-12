"use client";

import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { Warna } from "@/lib/warna";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import mqtt_client from "@/util/mqtt_client";
import {
  Center,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { donasi_getOneStatusInvoiceById } from "../../fun/get/get_one_status_invoice_by_id";
import { gs_donasi_hot_menu } from "../../global_state";
import { MODEL_DONASI_INVOICE } from "../../model/interface";

export default function Donasi_ProsesTransaksi({
  statusInvoice,
  nomorAdmin,
}: {
  statusInvoice: MODEL_DONASI_INVOICE;
  nomorAdmin: any;
}) {
  const router = useRouter();
  const [data, setData] = useState(statusInvoice);
  const [hotMenu, setHotMenu] = useAtom(gs_donasi_hot_menu);

  interface MODAL_DONASI_INVOICE {
    invoiceId: string;
    statusInvoiceId: string;
  }

  useShallowEffect(() => {
    mqtt_client.subscribe("donasi_invoice");

    mqtt_client.on("message", (topic, message) => {
      const dataClient: MODAL_DONASI_INVOICE = JSON.parse(message.toString());
      if (topic === "donasi_invoice" && dataClient.invoiceId === data.id) {
        // setData({
        //   ...data,
        //   donasiMaster_StatusInvoiceId: dataClient.statusInvoiceId,
        // });
        onLoad();
      }
    });
  }, []);

  async function onLoad() {
    const loadData = await donasi_getOneStatusInvoiceById({
      invoiceId: data.id,
    });
    setData(loadData as any);
  }

  if (data.DonasiMaster_StatusInvoice.id === "1") {
    setHotMenu(2);
    router.replace(RouterDonasi.detail_donasi_saya + `${data.id}`, {
      scroll: false,
    });
  }

  return (
    <>
      {data.DonasiMaster_StatusInvoice.id === "1" ? (
        <>
          <Center h={"50vh"}>
            <Loader color="yellow" />
          </Center>
        </>
      ) : (
        <Stack>
          <Paper
            style={{
              backgroundColor: AccentColor.blue,
              border: `2px solid ${AccentColor.darkblue}`,
              padding: "15px",
              cursor: "pointer",
              borderRadius: "10px",
              color: MainColor.white,
            }}
          >
            <Stack spacing={"md"}>
              <Paper
                style={{
                  backgroundColor: MainColor.darkblue,
                  border: `2px solid ${AccentColor.darkblue}`,
                  padding: "15px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  color: MainColor.white,
                }}
              >
                <Stack align="center" justify="center">
                  <Title order={6}>Admin sedang memproses transaksimu</Title>
                  <Paper radius={1000} w={100} h={100}>
                    <Center h={"100%"}>
                      <Loader size={"lg"} color="yellow" variant="dots" />
                    </Center>
                  </Paper>
                  <Title order={6}>Mohon menunggu !</Title>
                </Stack>
              </Paper>
            </Stack>
          </Paper>
          <Paper
            style={{
              backgroundColor: AccentColor.blue,
              border: `2px solid ${AccentColor.darkblue}`,
              padding: "15px",
              cursor: "pointer",
              borderRadius: "10px",
              color: MainColor.white,
            }}
          >
            <Paper
              style={{
                backgroundColor: AccentColor.darkblue,
                border: `2px solid ${AccentColor.darkblue}`,
                padding: "15px",
                cursor: "pointer",
                borderRadius: "10px",
                color: MainColor.white,
              }}
            >
              <Group position="center">
                <Stack spacing={0}>
                  <Text fz={"xs"} fs={"italic"}>
                    Hubungi admin jika tidak kunjung di proses!
                  </Text>
                  <Text fz={"xs"} fs={"italic"}>
                    Klik pada logo Whatsapp ini.
                  </Text>
                </Stack>
                <Link
                  color="white"
                  style={{
                    color: "black",
                    textDecoration: "none",
                  }}
                  target="_blank"
                  href={`https://wa.me/+${nomorAdmin.nomor}?text=Hallo Admin , Saya ada kendala dalam proses transfer donasi!`}
                >
                  <IconBrandWhatsapp size={40} color={MainColor.green} />
                </Link>
              </Group>
            </Paper>
          </Paper>
        </Stack>
      )}
    </>
  );
}
