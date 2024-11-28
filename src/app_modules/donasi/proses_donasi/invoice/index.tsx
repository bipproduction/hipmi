"use client";

import { DIRECTORY_ID } from "@/app/lib";
import { IRealtimeData } from "@/app/lib/global_state";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import {
  Button,
  Center,
  CopyButton,
  FileButton,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconCamera, IconCircleCheck } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import TampilanRupiahDonasi from "../../component/tampilan_rupiah";
import { Donasi_funUpdateStatusInvoice } from "../../fun/update/fun_update_status_invoice";
import { gs_donasi_hot_menu } from "../../global_state";
import { MODEL_DONASI_INVOICE } from "../../model/interface";

export default function Donasi_InvoiceProses({
  dataInvoice,
}: {
  dataInvoice: MODEL_DONASI_INVOICE;
}) {
  const [invoice, setDataInvoice] = useState(dataInvoice);
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [active, setActive] = useAtom(gs_donasi_hot_menu);
  const [isLoading, setLoading] = useState(false);

  async function onClick() {
    try {
      setLoading(true);
      const uploadImage = await funGlobal_UploadToStorage({
        file: file as File,
        dirId: DIRECTORY_ID.donasi_bukti_transfer,
      });

      if (!uploadImage.success) {
        setLoading(false);
        return ComponentGlobal_NotifikasiPeringatan("Gagal upload file gambar");
      }

      const res = await Donasi_funUpdateStatusInvoice({
        invoiceId: invoice.id,
        statusId: "2",
        fileId: uploadImage.data.id,
      });
      if (res.status === 200) {
        // const dataNotif: any = {
        //   appId: res.data?.Donasi?.id as any,
        //   userId: res.data?.Donasi?.authorId as any,
        //   pesan: res.data?.Donasi?.title as any,
        //   status: res.data?.DonasiMaster_StatusInvoice?.name,
        //   kategoriApp: "DONASI",
        //   title: "Donatur melakukan transfer",
        // };

        const dataNotifikasi: IRealtimeData = {
          appId: res.data?.Donasi?.id as any,
          status: res.data?.DonasiMaster_StatusInvoice?.name as any,
          userId: res.data?.Donasi?.authorId as any,
          pesan: res.data?.Donasi?.title as any,
          kategoriApp: "DONASI",
          title: "Donatur telah melakukan transfer",
        };

        const notif = await notifikasiToAdmin_funCreate({
          data: dataNotifikasi as any,
        });

        if (notif.status === 201) {
           WibuRealtime.setData({
             type: "notification",
             pushNotificationTo: "ADMIN",
           });

          ComponentGlobal_NotifikasiBerhasil(res.message);
          setActive(2);
          router.push(RouterDonasi.proses_transaksi + `${invoice.id}`);
          setLoading(false);
        }
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
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
            color: "white",
          }}
        >
          <Title order={5}>Mohon transfer ke rekening dibawah</Title>
          <Group spacing={"xs"}>
            <Text>untuk diteruskan ke </Text>
            <Text fw={"bold"}>{invoice.Donasi.Author.username}</Text>
          </Group>
        </Stack>

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
          <Stack spacing={"md"}>
            <Stack spacing={0}>
              <Text>Bank {invoice.DonasiMaster_Bank.name}</Text>
              <Text>PT. Himpunan Pengusaha Badung</Text>
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
                      {invoice.DonasiMaster_Bank.norek}
                    </Title>
                  </Group>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Group position="right">
                    <CopyButton value={invoice.DonasiMaster_Bank.norek}>
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
                          {copied ? "Berhasil" : "Salin"}
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
                color: "white",
              }}
            >
              <Grid>
                <Grid.Col span={8}>
                  <Group position="left" align="center" h={"100%"}>
                    <Title order={4} color="white">
                      <TampilanRupiahDonasi nominal={+(+invoice.nominal)} />
                    </Title>
                  </Group>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Group position="right">
                    <CopyButton value={"" + +invoice.nominal}>
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
                          {copied ? "Berhasil" : "Salin"}
                        </Button>
                      )}
                    </CopyButton>
                  </Group>
                </Grid.Col>
              </Grid>
            </Paper>
            {/* <Text fz={"xs"} c={"gray"}>
              Sudah termasuk biaya admin Rp. 2.500,-
            </Text> */}
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
              <FileButton
                onChange={async (files: any | null) => {
                  try {
                    // const buffer = URL.createObjectURL(
                    //   new Blob([new Uint8Array(await files.arrayBuffer())])
                    // );
                    // console.log(buffer, "ini buffer");

                    setFile(files);
                  } catch (error) {
                    console.log(error);
                  }
                }}
                accept="image/png,image/jpeg"
              >
                {(props) => (
                  <Button
                    {...props}
                    radius={"xl"}
                    leftIcon={<IconCamera />}
                    bg={MainColor.yellow}
                    color="yellow"
                    c={"black"}
                  >
                    Upload
                  </Button>
                )}
              </FileButton>
            </Center>
            {file ? (
              <Center>
                <Group spacing={"xs"}>
                  <Text fz={"xs"} fs={"italic"}>
                    Upload berhasil{" "}
                  </Text>
                  <IconCircleCheck color="green" />
                </Group>
              </Center>
            ) : (
              <Center>
                <Text fz={"xs"} fs={"italic"}>
                  Upload bukti transfer anda !
                </Text>
              </Center>
            )}
          </Stack>
        </Paper>

        {file !== null ? (
          <Button
            loaderPosition="center"
            loading={isLoading}
            radius={"xl"}
            bg={MainColor.yellow}
            color="yellow"
            c={"black"}
            onClick={() => onClick()}
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
