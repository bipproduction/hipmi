"use client";

import { AccentColor, AdminColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_TampilanRupiah } from "@/app_modules/_global/component";
import { apiGetMasterStatusTransaksi } from "@/app_modules/_global/lib/api_fetch_master";
import { globalStatusTransaksi } from "@/app_modules/_global/lib/master_list_app";
import { Admin_ComponentLoadImageLandscape } from "@/app_modules/admin/_admin_global";
import { ComponentAdminGlobal_TitlePage } from "@/app_modules/admin/_admin_global/_component";
import CustomSkeletonAdmin from "@/app_modules/admin/_admin_global/_component/skeleton/customSkeletonAdmin";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_gagal";
import AdminGlobal_ComponentBackButton from "@/app_modules/admin/_admin_global/back_button";
import adminNotifikasi_funCreateToUser from "@/app_modules/admin/notifikasi/fun/create/fun_create_notif_user";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import {
  MODEL_DONASI,
  MODEL_DONASI_PENCAIRAN_DANA
} from "@/app_modules/donasi/model/interface";
import { MODEL_NEW_DEFAULT_MASTER } from "@/app_modules/model_global/interface";
import { RouterAdminGlobal } from "@/lib";
import { RouterAdminDonasi } from "@/lib/router_admin/router_admin_donasi";
import { RouterAdminDonasi_OLD } from "@/lib/router_hipmi/router_admin";
import { clientLogger } from "@/util/clientLogger";
import mqtt_client from "@/util/mqtt_client";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  Grid,
  Group,
  Modal,
  Pagination,
  Paper,
  ScrollArea,
  Select,
  SimpleGrid,
  Spoiler,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { IconReload } from "@tabler/icons-react";
import { toNumber } from "lodash";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import adminDonasi_funUpdateStatusDanTotal from "../../fun/update/fun_update_status_dan_total";
import { apiGetAdminAllDaftarDonatur, apiGetAdminDonasiById } from "../../lib/api_fetch_admin_donasi";
import TampilanListDonatur from "./detail_list_donatur";

export default function AdminDonasi_DetailPublish({
  countDonatur,
  listPencairan,
}: {
  countDonatur: number;
  listPencairan: MODEL_DONASI_PENCAIRAN_DANA[];
}) {
  const [pencairan, setPencairan] = useState(listPencairan);
  const [isReload, setReload] = useState(false);
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_DONASI | null>(null);
  // 

  useShallowEffect(() => {
    loadInitialData();
  }, [isReload])

  const loadInitialData = async () => {
    try {
      const response = await apiGetAdminDonasiById({
        id: params.id,
      })

      if (response?.success && response?.data) {
        console.log("data", response.data);
        setData(response.data)
        setReload(false)

      } else {
        console.log("Invalid data format recieved:", response);
        setData(null)
      }
    } catch (error) {
      clientLogger.error("Invalid data format recieved:", error);
      setData(null);
    }
  }

  return (
    <>
      {/* <pre>{JSON.stringify(pencairan, null, 2)}</pre> */}
      <Stack>
        <>
          <AdminGlobal_ComponentBackButton
            path={RouterAdminDonasi.table_publish}
          />
          {!data ? (<CustomSkeletonAdmin height={"40vh"} />) : (
            <TampilanDetailDonasi
              countDonatur={countDonatur} donasi={data} />
          )}
          {!data ? (<CustomSkeletonAdmin height={"80vh"} />) : (
            <TampilanListDonatur
              setReloadDonasi={(val) => {
                setReload(val)
              }}
              donasi={data}
              isReload={isReload}
            />)}
          <TampilanListPencairan pencairan={pencairan} />
        </>
      </Stack>
    </>
  );
}

function TampilanDetailDonasi({
  countDonatur,
  donasi

}: {
  countDonatur: number;
  donasi: MODEL_DONASI;

}) {


  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const [isLoadingPencairanDana, setIsLoadingPencairanDana] = useState(false);


  return (
    <>
      <Paper bg={AdminColor.softBlue} radius={"md"} p={"md"}>
        <Stack>
          <SimpleGrid
            cols={3}
            spacing="lg"
            breakpoints={[
              { maxWidth: "62rem", cols: 3, spacing: "md" },
              { maxWidth: "48rem", cols: 2, spacing: "sm" },
              { maxWidth: "36rem", cols: 1, spacing: "sm" },
            ]}
          >
            <Paper p={"xs"} bg={AdminColor.softBlue}>
              <Stack>
                <Title c={AdminColor.white} align="center" order={4}>
                  Gambar Donasi
                </Title>
                <Admin_ComponentLoadImageLandscape fileId={donasi?.imageId} />
              </Stack>
            </Paper>

            <Paper p={"sm"} bg={AdminColor.softBlue}>
              <Stack spacing={5}>
                <Title c={AdminColor.white} order={4}>Detail Donasi</Title>
                <Grid>
                  <Grid.Col span={4}>
                    <Text c={AdminColor.white} fz={"xs"}>Judul</Text>
                  </Grid.Col>
                  <Grid.Col c={AdminColor.white} span={"content"}>:</Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Title order={5} c={AdminColor.white}>
                      {donasi?.title}
                    </Title>
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={4}>
                    <Text c={AdminColor.white} fz={"xs"}>Penggalang Dana</Text>
                  </Grid.Col>
                  <Grid.Col c={AdminColor.white} span={"content"}>:</Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Title order={5} c={AdminColor.white}>
                      {donasi?.Author.username}
                    </Title>
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={4}>
                    <Text c={AdminColor.white} fz={"xs"}>Durasi</Text>
                  </Grid.Col>
                  <Grid.Col c={AdminColor.white} span={"content"}>:</Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Title c={AdminColor.white} order={5}>
                      {donasi?.DonasiMaster_Durasi.name} hari
                    </Title>
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={4}>
                    <Text c={AdminColor.white} fz={"xs"}>Dana dibutuhkan</Text>
                  </Grid.Col>
                  <Grid.Col c={AdminColor.white} span={"content"}>:</Grid.Col>
                  <Grid.Col span={"auto"}>
                    <ComponentGlobal_TampilanRupiah
                      nominal={+donasi?.target}
                      color={AdminColor.yellow}
                    />
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={4}>
                    <Text c={AdminColor.white} fz={"xs"}>Kategori</Text>
                  </Grid.Col>
                  <Grid.Col c={AdminColor.white} span={"content"}>:</Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Title c={AdminColor.white} order={5}>
                      {donasi?.DonasiMaster_Ketegori?.name}
                    </Title>
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={4}>
                    <Text c={AdminColor.white} fz={"xs"}>Total donatur</Text>
                  </Grid.Col>
                  <Grid.Col c={AdminColor.white} span={"content"}>:</Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Title order={5} c={AdminColor.white}>
                      {countDonatur}
                    </Title>
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={4}>
                    <Text c={AdminColor.white} fz={12}>Progres</Text>
                  </Grid.Col>
                  <Grid.Col c={AdminColor.white} span={"content"}>:</Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Title order={5} c={AdminColor.white}>
                      {toNumber(donasi.progres).toFixed(2)} %
                    </Title>
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={4}>
                    <Text c={AdminColor.white} fz={12}>Dana terkumpul</Text>
                  </Grid.Col>
                  <Grid.Col c={AdminColor.white} span={"content"}>:</Grid.Col>
                  <Grid.Col span={"auto"}>
                    <ComponentGlobal_TampilanRupiah
                      nominal={+donasi?.terkumpul}
                      color={AdminColor.yellow}
                    />
                  </Grid.Col>
                </Grid>
              </Stack>
            </Paper>

            {/* Pencairan Dana */}
            <Paper bg={AdminColor.softBlue} p={"sm"}>
              <Stack spacing={"xl"}>
                <Center>
                  <Title c={AdminColor.white} order={4}>Pencairan Dana</Title>
                </Center>
                <Grid>
                  <Grid.Col span={"auto"}>
                    <Stack spacing={0}>
                      <Text c={AdminColor.white} fz={"xs"}>Total Dana Dicairkan</Text>
                      <ComponentGlobal_TampilanRupiah
                        nominal={donasi?.totalPencairan}
                        color={AdminColor.yellow}
                      />
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Stack spacing={0}>
                      <Text c={AdminColor.white} fz={"xs"}>Bank Tujuan</Text>
                      <Title order={6} c={AdminColor.white}>
                        {donasi?.namaBank}
                      </Title>
                    </Stack>
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col span={"auto"}>
                    <Stack spacing={0}>
                      <Text c={AdminColor.white} fz={"xs"}>Akumulasi Pencairan</Text>
                      <Title order={6} c={AdminColor.white}>
                        {donasi?.akumulasiPencairan} Kali
                      </Title>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Stack spacing={0}>
                      <Text fz={"xs"} c={AdminColor.white}>Nomor Rekening</Text>
                      <Title order={6} c={AdminColor.white}>
                        {donasi?.rekening}
                      </Title>
                    </Stack>
                  </Grid.Col>
                </Grid>

                <Stack align="center" spacing={0}>
                  <Text c={AdminColor.white} fz={"xs"}>Sisa Dana</Text>
                  <ComponentGlobal_TampilanRupiah
                    nominal={
                      toNumber(donasi.terkumpul) -
                      toNumber(donasi.totalPencairan)
                    }
                    color={AdminColor.yellow}
                  />
                </Stack>

                <Button
                  loaderPosition="center"
                  loading={isLoadingPencairanDana}
                  radius={"xl"}
                  onClick={() => {
                    setIsLoadingPencairanDana(true);
                    router.push(
                      RouterAdminDonasi_OLD.pencairan_dana + `${donasi?.id}`
                    );
                  }}
                >
                  Cairkan Dana
                </Button>
              </Stack>
            </Paper>
          </SimpleGrid>
        </Stack>
      </Paper>

      <Modal opened={opened} onClose={close} centered>
        <PencairanDana />
      </Modal>
    </>
  );
}

function PencairanDana() {
  return (
    <>
      <Stack>
        <TextInput label="Masukan nominal" />
      </Stack>
    </>
  );
}

//######################## LIST PENCAIRAN #####################//
function TampilanListPencairan({
  pencairan,
}: {
  pencairan: MODEL_DONASI_PENCAIRAN_DANA[];
}) {
  const router = useRouter();
  const [data, setData] = useState(pencairan);
  const [opened, { open, close }] = useDisclosure(false);
  const [gambarId, setGambarId] = useState("");

  const rowTable = data.map((e) => (
    <tr key={e.id}>
      <td>
        <Center c={AdminColor.white}>
          <TampilanRupiahDonasi nominal={e.nominalCair} />
        </Center>
      </td>
      <td>
        <Center c={AdminColor.white}>{moment(e.createdAt).format("ll")}</Center>
      </td>
      <td>
        <Center c={AdminColor.white}>
          <Text>{e.title}</Text>
        </Center>
      </td>
      <td width={500}>
        <Box w={"100%"}>
          <Spoiler hideLabel="Sembunyikan" maxHeight={70} showLabel="Lihat">
            {e.deskripsi}
          </Spoiler>
        </Box>
      </td>
      <td>
        <Box>
          <Center>
            <Button
              radius={"xl"}
              bg={"green"}
              color="green"
              onClick={() => {
                // open();
                // setGambarId(e.imagesId);
                router.push(
                  RouterAdminDonasi.transfer_invoice_reimbursement + e?.imagesId
                );
              }}
            >
              Cek
            </Button>
          </Center>
        </Box>
      </td>
    </tr>
  ));

  return (
    <>

      <Stack spacing={"xs"} h={"100%"}>
        <ComponentAdminGlobal_TitlePage
          name="Rincian Pencairan Dana"
          color={AdminColor.softBlue}
          component={
            <Group>
              <ActionIcon
                size={"lg"}
                radius={"xl"}
                variant="light"
                onClick={() => {
                  // onRelaod();
                }}
              >
                <IconReload />
              </ActionIcon>
              {/* <Select
              placeholder="Pilih status"
              value={isSelect}
              data={listMasterStatus.map((e) => ({
                value: e.id,
                label: e.name,
              }))}
              onChange={(val) => {
                onSelect(val);
              }}
            /> */}
            </Group>
          }
        />

        <Paper p={"md"} bg={AdminColor.softBlue} shadow="lg" h={"80vh"}>
          <ScrollArea w={"100%"} h={"90%"}>
            <Table
              verticalSpacing={"xl"}
              horizontalSpacing={"md"}
              p={"md"}
              w={1500}

            >
              <thead>
                <tr>
                  <th>
                    <Center c={AccentColor.white}>Nominal</Center>
                  </th>
                  <th>
                    <Center c={AccentColor.white}>Tanggal</Center>
                  </th>
                  <th>
                    <Center c={AccentColor.white}>Judul</Center>
                  </th>
                  <th style={{ color: AccentColor.white }}>Deskripsi</th>
                  <th>
                    <Center c={AccentColor.white}>Bukti Transfer</Center>
                  </th>
                </tr>
              </thead>
              <tbody>{rowTable}</tbody>
            </Table>
          </ScrollArea>

          {/* <Center mt={"xl"}>
            <Pagination
              value={isActivePage}
              total={isNPage}
              onChange={(val) => {
                onPageClick(val);
              }}
            />
          </Center> */}
        </Paper>
      </Stack>


    </>
  );
}
