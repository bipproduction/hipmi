"use client";

import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import {
  Stack,
  Title,
  Group,
  Paper,
  Grid,
  CopyButton,
  Button,
  Center,
  FileButton,
  Text,
} from "@mantine/core";
import { IconCamera, IconCircleCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_INVOICE_INVESTASI } from "../../_lib/interface";
import { investasi_funUploadBuktiTransferById } from "../../_fun";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import { DIRECTORY_ID } from "@/lib";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { IRealtimeData } from "@/lib/global_state";
import { notifikasiToAdmin_funCreate } from "@/app_modules/notifikasi/fun";
import { WibuRealtime } from "wibu-pkg";
import { clientLogger } from "@/util/clientLogger";
import { ComponentGlobal_ButtonUploadFileImage } from "@/app_modules/_global/component";

export function Investasi_ViewInvoice({
  dataInvoice,
}: {
  dataInvoice: MODEL_INVOICE_INVESTASI;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(dataInvoice);
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>(null);

  async function onUpload() {
    try {
      setLoading(true);
      const uploadFileToStorage = await funGlobal_UploadToStorage({
        file: file as any,
        dirId: DIRECTORY_ID.investasi_bukti_transfer,
      });

      if (!uploadFileToStorage.success) {
        setLoading(false);
        ComponentGlobal_NotifikasiPeringatan("Gagal upload bukti transfer");
        return;
      }

      const res = await investasi_funUploadBuktiTransferById({
        invoiceId: data.id,
        fileId: uploadFileToStorage.data.id,
      });

      if (res.status != 200) {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal(res.message);
        return;
      }

      const dataNotifikasi: IRealtimeData = {
        appId: dataInvoice.Investasi.id,
        status: "Proses",
        userId: dataInvoice.authorId as string,
        pesan: "Bukti transfer telah diupload",
        kategoriApp: "INVESTASI",
        title: "Invoice baru",
      };

      const notif = await notifikasiToAdmin_funCreate({
        data: dataNotifikasi as any,
      });

      if (notif.status === 201) {
        WibuRealtime.setData({
          type: "notification",
          pushNotificationTo: "ADMIN",
          dataMessage: dataNotifikasi,
        });

        ComponentGlobal_NotifikasiBerhasil(res.message);

        router.push(NEW_RouterInvestasi.proses_transaksi + data.id, {
          scroll: false,
        });
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error(" Error upload invoice", error);
    }
  }

  return (
    <>
      <Stack spacing={"lg"} py={"md"}>
        <Stack
          spacing={0}
          style={{
            backgroundColor: AccentColor.blue,
            border: `2px solid ${AccentColor.darkblue}`,
            padding: "15px",
            cursor: "pointer",
            borderRadius: "10px",
            color: MainColor.white,
          }}
        >
          <Title order={5}>Mohon transfer ke rekening dibawah</Title>
        </Stack>

        <Paper
          style={{
            backgroundColor: AccentColor.blue,
            border: `2px solid ${AccentColor.darkblue}`,
            padding: "15px",
            cursor: "pointer",
            borderRadius: "10px",
            color: MainColor.white,
            marginBottom: "15px",
          }}
        >
          <Stack spacing={"md"}>
            <Stack spacing={0}>
              <Text>Bank {data?.MasterBank?.namaBank}</Text>
              <Text>{data?.MasterBank?.namaAkun}</Text>
            </Stack>
            <Paper
              style={{
                backgroundColor: AccentColor.darkblue,
                border: `2px solid ${AccentColor.blue}`,
                padding: "15px",
                cursor: "pointer",
                borderRadius: "10px",
                color: "white",
              }}
            >
              <Grid>
                <Grid.Col span={8}>
                  <Group position="left" align="center" h={"100%"}>
                    <Title order={4} color={MainColor.yellow}>
                      {data?.MasterBank?.norek}
                    </Title>
                  </Group>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Group position="right">
                    <CopyButton value={data?.MasterBank?.norek}>
                      {({ copied, copy }) => (
                        <Button
                          style={{
                            transition: "0.5s",
                          }}
                          radius={"xl"}
                          onClick={copy}
                          color={copied ? "teal" : "yellow"}
                          c={"black"}
                        >
                          {copied ? "Disalin" : "Salin"}
                        </Button>
                      )}
                    </CopyButton>
                  </Group>
                </Grid.Col>
              </Grid>
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
            marginBottom: "15px",
          }}
        >
          <Stack spacing={"md"}>
            <Stack spacing={0}>
              <Text>Jumlah transfer</Text>
            </Stack>
            <Paper
              style={{
                backgroundColor: AccentColor.darkblue,
                border: `2px solid ${AccentColor.blue}`,
                padding: "15px",
                cursor: "pointer",
                borderRadius: "10px",
                color: MainColor.white,
              }}
            >
              <Grid>
                <Grid.Col span={8}>
                  <Group position="left" align="center" h={"100%"}>
                    <Title order={4} color="white">
                      <TampilanRupiahDonasi nominal={+(+data.nominal)} />
                    </Title>
                  </Group>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Group position="right">
                    <CopyButton value={"" + +data.nominal}>
                      {({ copied, copy }) => (
                        <Button
                          style={{
                            transition: "0.5s",
                          }}
                          variant="filled"
                          radius={"xl"}
                          color={copied ? "teal" : "yellow"}
                          c={"black"}
                          onClick={copy}
                        >
                          {copied ? "Disalin" : "Salin"}
                        </Button>
                      )}
                    </CopyButton>
                  </Group>
                </Grid.Col>
              </Grid>
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
            color: "white",
            marginBottom: "15px",
          }}
        >
          <Stack spacing={"sm"}>
            <Center>
              <ComponentGlobal_ButtonUploadFileImage
                onSetFile={setFile}
                accept="image/png,image/png,image/jpeg,application/pdf"
              />
            </Center>
            {file ? (
              <Center>
                <Group spacing={"xs"}>
                  <Text c={MainColor.white} fz={"xs"} fs={"italic"}>
                    Upload berhasil{" "}
                  </Text>
                  <IconCircleCheck color="green" />
                </Group>
              </Center>
            ) : (
              <Center>
                <Text c={MainColor.white} fz={"xs"} fs={"italic"}>
                  Upload bukti transfer anda !
                </Text>
              </Center>
            )}
          </Stack>
        </Paper>

        {file !== null ? (
          <Button
            radius={"xl"}
            bg={MainColor.yellow}
            color="yellow"
            c={"black"}
            loaderPosition="center"
            loading={isLoading}
            onClick={() => {
              onUpload();
            }}
          >
            Saya Sudah Transfer
          </Button>
        ) : (
          <Button disabled radius={"xl"}>
            Menunggu Bukti Transfer
          </Button>
        )}
      </Stack>
    </>
  );
}
