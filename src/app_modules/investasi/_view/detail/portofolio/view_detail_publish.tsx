"use client";

import {
  NEW_RouterInvestasi,
  RouterInvestasi_OLD,
} from "@/app/lib/router_hipmi/router_investasi";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoadImageLandscape,
} from "@/app_modules/_global/component";
import {
  Investasi_ComponentBoxDaftarBerita,
  Investasi_ComponentBoxDaftarDokumen,
  Investasi_ComponentBoxProgress,
  Investasi_ComponentBoxProspektus,
  Investasi_ComponentTitleAndValueInDetail,
} from "@/app_modules/investasi/_component";
import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import {
  Box,
  Button,
  Center,
  SimpleGrid,
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
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Investasi_ViewDetailPublish({
  dataInvestasi,
  userLoginId,
}: {
  dataInvestasi: MODEL_INVESTASI;
  userLoginId: string;
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
  async function onSubmit() {
    setLoadingButton(true);

    //NEW
    router.push(NEW_RouterInvestasi.pembelian + data.id, { scroll: false });
    setTotal(0);
    setJumlah(0);
  }

  return (
    <Stack>
      <Investasi_ComponentBoxProgress progress={data.progress} />

      <ComponentGlobal_CardStyles>
        <Stack spacing={"xl"}>
          <ComponentGlobal_AvatarAndUsername
            profile={data.author.Profile as any}
          />
          <ComponentGlobal_LoadImageLandscape fileId={data.imageId} />

          {/* Title dan Persentase */}
          <Center>
            <Title color={MainColor.white} order={3} align="center">
              {_.startCase(data.title)}
            </Title>
          </Center>

          {/* Rincian Data */}

          <Stack>
            <Investasi_ComponentTitleAndValueInDetail
              title="Investor"
              value={<Text c={MainColor.white}>{data.Investasi_Invoice.length} </Text>}
            />
            <Investasi_ComponentTitleAndValueInDetail
              title="Target Dana"
              value={
                <Text c={MainColor.white}>
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 20,
                  }).format(+data.targetDana)}{" "}
                </Text>
              }
            />

            <Investasi_ComponentTitleAndValueInDetail
              title="Harga Per Lembar"
              value={
                <Text c={MainColor.white}>
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+data.hargaLembar)}
                </Text>
              }
            />

            <Investasi_ComponentTitleAndValueInDetail
              title={<Text c={MainColor.white} fs={"italic"}>Return Of Invesment (RoI)</Text>}
              value={<Text c={MainColor.white}>{data.roi} %</Text>}
            />

            <Investasi_ComponentTitleAndValueInDetail
              title="Total Lembar"
              value={
                <Text c={MainColor.white}>
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+data.totalLembar)}{" "}
                  lembar
                </Text>
              }
            />

            <Investasi_ComponentTitleAndValueInDetail
              title="Sisa Lembar"
              value={
                <Text c={MainColor.white}>
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+data.sisaLembar)}{" "}
                  lembar
                </Text>
              }
            />

            <Investasi_ComponentTitleAndValueInDetail
              title="Jadwal Pembagian"
              value={<Text c={MainColor.white}>{data.MasterPembagianDeviden.name} Bulan </Text>}
            />
            <Investasi_ComponentTitleAndValueInDetail
              title="Pembagian Deviden"
              value={<Text c={MainColor.white}>{data.MasterPeriodeDeviden.name}</Text>}
            />
            <Investasi_ComponentTitleAndValueInDetail
              title="Pencarian Investor"
              value={<Text c={MainColor.white}>{data.MasterPencarianInvestor.name} Hari </Text>}
            />
          </Stack>

          {/* List Box */}
          <SimpleGrid
            cols={3}
            breakpoints={[
              { maxWidth: "62rem", cols: 3, spacing: "md" },
              { maxWidth: "48rem", cols: 2, spacing: "sm" },
              { maxWidth: "36rem", cols: 1, spacing: "sm" },
            ]}
          >
            <Investasi_ComponentBoxProspektus
              prospektusFileId={data.prospektusFileId}
            />
            <Investasi_ComponentBoxDaftarDokumen investasiId={data?.id} />
            <Investasi_ComponentBoxDaftarBerita investasiId={data?.id} />
          </SimpleGrid>
        </Stack>
      </ComponentGlobal_CardStyles>

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
            {userLoginId === data.authorId ? (
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
  );
}
