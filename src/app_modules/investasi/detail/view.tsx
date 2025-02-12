"use client";

import {
  NEW_RouterInvestasi,
  RouterInvestasi_OLD,
} from "@/lib/router_hipmi/router_investasi";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import {
  ActionIcon,
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  Progress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import {
  IconBookDownload,
  IconFileDescription,
  IconSpeakerphone,
} from "@tabler/icons-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_INVESTASI } from "../_lib/interface";
import { ComponentGlobal_LoadImageLandscape } from "@/app_modules/_global/component";

export default function DetailInvestasi({
  dataInvestasi,
  loginUserId,
}: {
  dataInvestasi: MODEL_INVESTASI;
  loginUserId: string;
}) {
  const router = useRouter();
  const [data, setData] = useState(dataInvestasi);
  const [boxId, setBoxId] = useState(0);
  const [isLoadingBox, setLoadingBox] = useState(false);
  const [isLoadingButton, setLoadingButton] = useState(false);

  const [total, setTotal] = useLocalStorage({
    key: "total_investasi",
    defaultValue: 0,
  });
  const [jumlah, setJumlah] = useLocalStorage({
    key: "jumlah_investasi",
    defaultValue: 0,
  });

  const listBox = [
    {
      id: 1,
      name: "Prospektus",
      icon: <IconBookDownload size={70} color="white" />,
      route: RouterInvestasi_OLD.detail_prospektus,
    },
    {
      id: 2,
      name: "Dokumen",
      icon: <IconFileDescription size={70} color="white" />,
      route: RouterInvestasi_OLD.detail_dokumen,
    },
    {
      id: 3,
      name: "Berita",
      icon: <IconSpeakerphone size={70} color="white" />,
      route: RouterInvestasi_OLD.daftar_berita,
    },
  ];

  async function onSubmit() {
    setLoadingButton(true);

    //NEW
    router.push(NEW_RouterInvestasi.pembelian + data.id, { scroll: false });
    setTotal(0);
    setJumlah(0);
  }

  return (
    <>
      <Stack
        style={{
          backgroundColor: AccentColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          padding: "15px",
          borderRadius: "10px",
          color: "white",
          marginBottom: "15px",
        }}
      >
        {/* Foto username dan sisa waktu */}
        {/* <ComponentGlobal_AvatarAndAuthorName
          dataUser={dataInvestasi.author.Profile as any}
          componentRight={
            data.MasterProgresInvestasi.id === "1" ? (
              <Box>
                <Group position="right" spacing={"xs"}>
                  <Text>
                    Sisa waktu:{" "}
                    <Text span inherit>
                      {Number(data.MasterPencarianInvestor.name) -
                        moment(new Date()).diff(
                          new Date(data.countDown),
                          "days"
                        )}{" "}
                      Hari
                    </Text>
                  </Text>
                </Group>
              </Box>
            ) : (
              <Box>
                {data.MasterProgresInvestasi.id === "2" ? (
                  <Group position="right" spacing={"xs"}>
                    <IconCircleCheck color="green" />
                    <Text
                      truncate
                      variant="text"
                      c={Warna.hijau_tua}
                      sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                      ta="center"
                      fz="md"
                      fw={700}
                    >
                      Selesai
                    </Text>
                  </Group>
                ) : (
                  <Group position="right" spacing={"xs"}>
                    <IconXboxX color="red" />
                    <Text
                      truncate
                      variant="text"
                      c={Warna.merah}
                      sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                      ta="center"
                      fz="md"
                      fw={700}
                    >
                      Waktu Habis
                    </Text>
                  </Group>
                )}
              </Box>
            )
          }
        /> */}

        {/* <AspectRatio ratio={1 / 1} mx={"sm"} mah={250}>
          <Image
            alt=""
            src={RouterInvestasi_OLD.api_gambar + `${data.imagesId}`}
            radius={"sm"}
            height={250}
            width={"100%"}
          />
        </AspectRatio> */}

        <ComponentGlobal_LoadImageLandscape fileId={data.imageId} />

        {/* Title dan Progress */}
        <Box mb={"md"}>
          <Title order={3} mb={"xs"} align="center">
            {data.title}
          </Title>
          <Progress
            label={
              "" +
              (
                ((+data.totalLembar - +data.sisaLembar) / +data.totalLembar) *
                100
              ).toFixed(1) +
              "%"
            }
            value={
              +(
                ((+data.totalLembar - +data.sisaLembar) / +data.totalLembar) *
                100
              ).toFixed(1)
            }
            color="teal"
            size="xl"
            radius="xl"
          />
        </Box>

        {/* Rincian Data */}
        <Grid p={"md"} mb={"md"}>
          <Grid.Col span={6}>
            <Stack>
              <Box>
                <Text>Dana Dibutuhkan</Text>
                <Text>
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+data.targetDana)}
                </Text>
              </Box>
              <Box>
                <Text>Harga Per Lembar</Text>
                <Text>
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+data.hargaLembar)}
                </Text>
              </Box>
              <Box>
                <Text>Jadwal Pembagian</Text>
                <Text>{data.MasterPembagianDeviden.name} bulan </Text>
              </Box>
              <Box>
                <Text>Pembagian Deviden</Text>
                <Text>{data.MasterPeriodeDeviden.name}</Text>
              </Box>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack>
              <Box>
                <Text>Investor</Text>
                <Text>
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(dataInvestasi.Investasi_Invoice.length)}
                </Text>
              </Box>
              <Box>
                <Text>ROI</Text>
                <Text>{data.roi}%</Text>
              </Box>
              <Box>
                <Text>Total Lembar</Text>
                <Text>
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+data.totalLembar)}{" "}
                  lembar
                </Text>
              </Box>
              <Box>
                <Text>Sisa Lembar</Text>
                <Text>
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+data.sisaLembar)}{" "}
                  lembar
                </Text>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>

        {/* List Box */}
        <Group position="apart" px={"lg"}>
          {listBox.map((e, i) => (
            <Paper
              key={i}
              style={{
                padding: "15px",
                backgroundColor: AccentColor.blue,
                border: `2px solid ${AccentColor.softblue}`,
                borderRadius: "10px",
                color: "white",
              }}
            >
              <Flex direction={"column"} align={"center"} justify={"center"}>
                <Text fz={12}>{e.name}</Text>
                <ActionIcon
                  radius={"xl"}
                  loading={isLoadingBox && e?.id === boxId ? true : false}
                  variant="transparent"
                  size={60}
                  onClick={() => router.push(e.route + `${data.id}`)}
                >
                  {e.icon}
                </ActionIcon>
              </Flex>
            </Paper>
          ))}
        </Group>

        <Box my={"md"}>
          {data.sisaLembar === "0" ||
          Number(data.MasterPencarianInvestor.name) -
            moment(new Date()).diff(new Date(data.countDown), "days") <=
            0 ? (
            <Center mb={"md"}>
              <Button disabled radius={50} variant="transparent">
                Investasi Telah Ditutup
              </Button>
            </Center>
          ) : (
            <Box>
              {loginUserId === data.authorId ? (
                <Center mb={"md"}>
                  <Button disabled radius={50}>
                    Investasi Ini Milik Anda
                  </Button>
                </Center>
              ) : (
                <Center mb={"md"}>
                  <Button
                    loaderPosition="center"
                    loading={isLoadingButton}
                    w={"100%"}
                    radius={50}
                    bg={MainColor.yellow}
                    color="yellow"
                    c={"black"}
                    onClick={() => {
                      onSubmit();
                    }}
                  >
                    Beli Saham
                  </Button>
                </Center>
              )}
            </Box>
          )}
        </Box>
      </Stack>
    </>
  );
}
