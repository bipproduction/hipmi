"use client";

import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import {
  ActionIcon,
  AspectRatio,
  Box,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  Progress,
  Stack,
  Text,
  Title
} from "@mantine/core";
import {
  IconBookDownload,
  IconCircleCheck,
  IconFileDescription,
  IconSpeakerphone,
} from "@tabler/icons-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_INVESTASI } from "../../_lib/interface";

export default function DetailPublishInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_INVESTASI;
}) {
  const router = useRouter();
  const [investasi, setInvestasi] = useState(dataInvestasi);

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
      route: RouterInvestasi_OLD.edit_dokumen,
    },
    {
      id: 3,
      name: "Berita",
      icon: <IconSpeakerphone size={70} color="white" />,
      route: RouterInvestasi_OLD.list_edit_berita,
    },
  ];

  return (
    <Stack
      style={{
        paddingInline: "15px",
        paddingBlock: "15px",
        backgroundColor: AccentColor.darkblue,
        border: `2px solid ${AccentColor.blue}`,
        borderRadius: "10px",
        color: "white",
        marginBottom: "15px",
      }}
    >
      {Number(investasi.MasterPencarianInvestor.name) -
        moment(new Date()).diff(new Date(investasi.countDown), "days") <=
      0 ? (
        <Group
          position="center"
          mb={"sm"}
          style={{
            color: "white",
          }}
        >
          <IconCircleCheck color="green" />
          <Text c={"green"}>Selesai</Text>
        </Group>
      ) : (
        <Group
          mb={"sm"}
          position="center"
          style={{
            color: "white",
          }}
        >
          <Text>
            Sisa waktu :{" "}
            {Number(investasi.MasterPencarianInvestor.name) -
              moment(new Date()).diff(
                new Date(investasi.countDown),
                "days"
              )}{" "}
            hari
          </Text>
        </Group>
      )}

      <AspectRatio ratio={1 / 1} mx={"sm"} mah={250}>
        <Image
          alt=""
          src={RouterInvestasi_OLD.api_gambar + `${investasi.imagesId}`}
          radius={"sm"}
          height={250}
          width={"100%"}
        />
      </AspectRatio>

      {/* Title dan Persentase */}
      <Box mb={"md"}>
        <Title align="center" order={3} mb={"xs"}>
          {investasi.title}
        </Title>
        <Progress
          label={
            "" +
            (
              ((+investasi.totalLembar - +investasi.sisaLembar) /
                +investasi.totalLembar) *
              100
            ).toFixed(1) +
            "%"
          }
          value={
            +(
              ((+investasi.totalLembar - +investasi.sisaLembar) /
                +investasi.totalLembar) *
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
                }).format(+investasi.targetDana)}
              </Text>
            </Box>
            <Box>
              <Text>Harga Per Lembar</Text>
              <Text>
                Rp.{" "}
                {new Intl.NumberFormat("id-ID", {
                  maximumSignificantDigits: 10,
                }).format(+investasi.hargaLembar)}
              </Text>
            </Box>
            <Box>
              <Text>Jadwal Pembagian</Text>
              <Text>{investasi.MasterPembagianDeviden.name} bulan </Text>
            </Box>
            <Box>
              <Text>Pembagian Deviden</Text>
              <Text>{investasi.MasterPeriodeDeviden.name}</Text>
            </Box>
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack>
            <Box>
              <Text>ROI</Text>
              <Text>{investasi.roi}%</Text>
            </Box>
            <Box>
              <Text>Total Lembar</Text>
              <Text>
                {new Intl.NumberFormat("id-ID", {
                  maximumSignificantDigits: 10,
                }).format(+investasi.totalLembar)}{" "}
                lembar
              </Text>
            </Box>
            <Box>
              <Text>Sisa Lembar</Text>
              <Text>
                {new Intl.NumberFormat("id-ID", {
                  maximumSignificantDigits: 10,
                }).format(+investasi.sisaLembar)}{" "}
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
                // loading={isLoadingBox && e?.id === boxId ? true : false}
                variant="transparent"
                size={60}
                onClick={() => router.push(e.route + `${investasi.id}`)}
              >
                {e.icon}
              </ActionIcon>
            </Flex>
          </Paper>
        ))}
      </Group>
    </Stack>
  );
}
