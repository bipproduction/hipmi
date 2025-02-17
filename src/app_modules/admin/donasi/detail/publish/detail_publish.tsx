"use client";

import { RouterAdminGlobal } from "@/lib";
import { RouterAdminDonasi } from "@/lib/router_admin/router_admin_donasi";
import { RouterAdminDonasi_OLD } from "@/lib/router_hipmi/router_admin";
import { ComponentGlobal_TampilanRupiah } from "@/app_modules/_global/component";
import { Admin_ComponentLoadImageLandscape } from "@/app_modules/admin/_admin_global";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_gagal";
import AdminGlobal_ComponentBackButton from "@/app_modules/admin/_admin_global/back_button";
import adminNotifikasi_funCreateToUser from "@/app_modules/admin/notifikasi/fun/create/fun_create_notif_user";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import {
  MODEL_DONASI,
  MODEL_DONASI_INVOICE,
  MODEL_DONASI_PENCAIRAN_DANA,
} from "@/app_modules/donasi/model/interface";
import { MODEL_NEW_DEFAULT_MASTER } from "@/app_modules/model_global/interface";
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
import { useDisclosure } from "@mantine/hooks";
import { IconReload } from "@tabler/icons-react";
import _, { toNumber } from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminDonasi_getListDonatur } from "../../fun/get/get_list_donatur_by_id";
import { AdminDonasi_getOneById } from "../../fun/get/get_one_by_id";
import adminDonasi_funUpdateStatusDanTotal from "../../fun/update/fun_update_status_dan_total";
import { ComponentAdminGlobal_TitlePage } from "@/app_modules/admin/_admin_global/_component";
import { AccentColor, AdminColor } from "@/app_modules/_global/color/color_pallet";

export default function AdminDonasi_DetailPublish({
  dataPublish,
  listDonatur,
  countDonatur,
  listPencairan,
  listMasterStatus,
}: {
  dataPublish: MODEL_DONASI;
  listDonatur: any[];
  countDonatur: number;
  listPencairan: MODEL_DONASI_PENCAIRAN_DANA[];
  listMasterStatus: MODEL_NEW_DEFAULT_MASTER[];
}) {
  const [dataDonasi, setDataDonasi] = useState(dataPublish);
  const [pencairan, setPencairan] = useState(listPencairan);
  const selectedData = _.omit(dataDonasi, [
    "Author",
    "imageDonasi",
    "CeritaDonasi",
    "DonasiMaster_Ketegori",
    "DonasiMaster_Durasi",
    "DonasiMaster_Status",
  ]);

  return (
    <>
      {/* <pre>{JSON.stringify(pencairan, null, 2)}</pre> */}
      <Stack>
        <AdminGlobal_ComponentBackButton
          path={RouterAdminDonasi.table_publish}
        />
        <TampilanDetailDonasi donasi={dataDonasi} countDonatur={countDonatur} />
        <TampilanListDonatur
          donatur={listDonatur}
          listMasterStatus={listMasterStatus}
          dataDonasi={selectedData as any}
          onSuccessDonasi={(val) => {
            setDataDonasi(val);
          }}
        />
        <TampilanListPencairan pencairan={pencairan} />
      </Stack>
    </>
  );
}

function TampilanDetailDonasi({
  donasi,
  countDonatur,
}: {
  donasi: MODEL_DONASI;
  countDonatur: number;
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
                <Admin_ComponentLoadImageLandscape fileId={donasi.imageId} />
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

//######################## LIST DONATUR #####################//
function TampilanListDonatur({
  donatur,
  listMasterStatus,
  dataDonasi,
  onSuccessDonasi,
}: {
  donatur: any;
  listMasterStatus: MODEL_NEW_DEFAULT_MASTER[];
  dataDonasi: MODEL_DONASI;
  onSuccessDonasi: (val: any) => void;
}) {
  const router = useRouter();
  const [isLoadingCek, setLoadingCek] = useState(false);
  const [idData, setIdData] = useState("");
  const [lisDonatur, setListDonatur] = useState<MODEL_DONASI_INVOICE[]>(
    donatur.data
  );
  const [isNPage, setNPage] = useState(donatur.nPage);
  const [isActivePage, setActivePage] = useState(1);
  const [isSelect, setSelect] = useState("");

  async function onRelaod() {
    const loadData = await adminDonasi_getListDonatur({
      donasiId: dataDonasi?.id,
      page: 1,
    });
    setSelect("");
    setListDonatur(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onSelect(s: any) {
    setSelect(s);
    const loadData = await adminDonasi_getListDonatur({
      donasiId: dataDonasi?.id,
      page: 1,
      selectStatusId: s,
    });
    setListDonatur(loadData.data as any);
    setNPage(loadData.nPage);
    setActivePage(1);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminDonasi_getListDonatur({
      donasiId: dataDonasi?.id,
      page: p,
      selectStatusId: isSelect,
    });
    setListDonatur(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const tableRows = lisDonatur.map((e, i) => (
    <tr key={i}>
      <td>
        <Center c={AccentColor.white}>{e?.Author.username}</Center>
      </td>
      <td>
        <Center c={AccentColor.white}>{e?.DonasiMaster_Bank?.name}</Center>
      </td>
      <td>
        <Center c={AccentColor.white}>
          <ComponentGlobal_TampilanRupiah  nominal={+e?.nominal} />
        </Center>
      </td>
      <td>
        <Center c={AccentColor.white}>
          {new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(
            e?.createdAt
          )}
        </Center>
      </td>
      <td>
        <Center c={AccentColor.white}>
          <Badge w={150} variant="dot">
            {e?.DonasiMaster_StatusInvoice?.name}
          </Badge>
        </Center>
      </td>
      <td>
        <Center>
          {e?.donasiMaster_StatusInvoiceId === "1" ||
            e?.donasiMaster_StatusInvoiceId === "2" ? (
            <Button
              loaderPosition="center"
              loading={isLoadingCek && idData === e?.id}
              radius={"xl"}
              onClick={() => {
                setLoadingCek(true), setIdData(e?.id);
                router.push(RouterAdminGlobal.preview_image({ id: e.imageId }));
              }}
            >
              Cek
            </Button>
          ) : (
            "-"
          )}
        </Center>
      </td>
      <td>
        <Center>
          {e?.donasiMaster_StatusInvoiceId === "1" ? (
            <Button radius={"xl"} disabled>
              Selesai
            </Button>
          ) : e?.DonasiMaster_StatusInvoice?.id === "2" ? (
            <ButtonAccept
              invoiceId={e?.id}
              donasiId={dataDonasi?.id}
              nominal={+e?.nominal}
              danaTerkumpul={+dataDonasi?.terkumpul}
              target={+dataDonasi?.target}
              onSuccessDonasi={(val) => {
                onSuccessDonasi(val);
              }}
              onSuccessDonatur={(val) => {
                setListDonatur(val.data);
                setNPage(val.nPage);
              }}
            />
          ) : (
            <Text>-</Text>
          )}
        </Center>
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        {/* <pre>{JSON.stringify(dataDonasi, null, 2)}</pre> */}
        <ComponentAdminGlobal_TitlePage
          name="Daftar Donatur"
          color={AdminColor.softBlue}
          component={
            <Group>
              <ActionIcon
                size={"lg"}
                radius={"xl"}
                variant="light"
                onClick={() => {
                  onRelaod();
                }}
              >
                <IconReload />
              </ActionIcon>
              <Select
                placeholder="Pilih status"
                value={isSelect}
                data={listMasterStatus.map((e) => ({
                  value: e.id,
                  label: e.name,
                }))}
                onChange={(val) => {
                  onSelect(val);
                }}
              />
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
                    <Center c={AccentColor.white}>Nama Donatur</Center>
                  </th>
                  <th>
                    <Center c={AccentColor.white}>Nama Bank</Center>
                  </th>
                  <th>
                    <Center c={AccentColor.white}>Jumlah Donasi</Center>
                  </th>
                  <th>
                    <Center c={AccentColor.white}>Tanggal</Center>
                  </th>
                  <th>
                    <Center c={AccentColor.white}>Status</Center>
                  </th>
                  <th>
                    <Center c={AccentColor.white}>Bukti Transfer</Center>
                  </th>
                  <th>
                    <Center c={AccentColor.white}>Aksi</Center>
                  </th>
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </Table>
          </ScrollArea>

          <Center mt={"xl"}>
            <Pagination
              value={isActivePage}
              total={isNPage}
              onChange={(val) => {
                onPageClick(val);
              }}
            />
          </Center>
        </Paper>
      </Stack>
    </>
  );
}

function ButtonAccept({
  invoiceId,
  donasiId,
  nominal,
  danaTerkumpul,
  target,
  onSuccessDonasi,
  onSuccessDonatur,
}: {
  invoiceId: string;
  donasiId: string;
  nominal: number;
  danaTerkumpul: number;
  target: number;
  onSuccessDonasi: (val: any) => void;
  onSuccessDonatur: (val: any) => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onAccept() {
    let nominalDonasi = nominal;
    let jumlahTerkumpul = danaTerkumpul;

    const updateStatus = await adminDonasi_funUpdateStatusDanTotal({
      invoiceId: invoiceId,
      donasiId: donasiId,
      jumlahTerkumpul: jumlahTerkumpul,
      nominal: nominalDonasi,
      statusInvoiceId: "1",
      target: target,
    });
    if (updateStatus.status == 200) {
      setIsLoading(true);
      const dataNotif = {
        appId: updateStatus.data?.id,
        userId: updateStatus.data?.authorId,
        pesan: updateStatus.data?.Donasi?.title,
        status: updateStatus.data?.DonasiMaster_StatusInvoice?.name,
        kategoriApp: "DONASI",
        title: "Terimakasih, Donasi anda telah diterima",
      };

      const notif = await adminNotifikasi_funCreateToUser({
        data: dataNotif as any,
      });

      if (notif.status === 201) {
        mqtt_client.publish(
          "USER",
          JSON.stringify({ userId: updateStatus?.data?.authorId, count: 1 })
        );

        mqtt_client.publish(
          "donasi_invoice",
          JSON.stringify({
            invoiceId: invoiceId,
            statusInvoiceId: "1",
          })
        );
      }

      const dataNotifToAuthorDonasi = {
        appId: updateStatus.data?.Donasi?.id,
        userId: updateStatus.data?.Donasi?.authorId,
        pesan: updateStatus.data?.Donasi?.title,
        status: "Donatur Baru",
        kategoriApp: "DONASI",
        title: "Ada donatur baru",
      };

      const notifToAuthorDonasi = await adminNotifikasi_funCreateToUser({
        data: dataNotifToAuthorDonasi as any,
      });

      if (notifToAuthorDonasi.status === 201) {
        mqtt_client.publish(
          "USER",
          JSON.stringify({
            userId: updateStatus?.data?.Donasi?.authorId,
            count: 1,
          })
        );
      }

      const updateData = await AdminDonasi_getOneById(donasiId);
      onSuccessDonasi(updateData as any);
      const updatelistDonatur = await adminDonasi_getListDonatur({
        donasiId: donasiId,
        page: 1,
      });
      onSuccessDonatur(updatelistDonatur);
      ComponentAdminGlobal_NotifikasiBerhasil(updateStatus.message);
      setIsLoading(false);
    } else {
      ComponentAdminGlobal_NotifikasiGagal(updateStatus.message);
      setIsLoading(false);
    }
    close();
  }

  return (
    <>
      <Button
        color="green"
        radius={"xl"}
        onClick={() => {
          open();
        }}
      >
        Terima
      </Button>

      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Paper>
          <Stack align="center">
            <Title
              align="center"
              order={6}
            >{`${"Anda sudah melihat bukti transfer dan yakin menerima donasi ini ?"}`}</Title>
            <Group position="center">
              <Button radius={"xl"} onClick={() => close()}>
                Batal
              </Button>
              <Button
                color="green"
                loading={isLoading}
                loaderPosition="center"
                radius={"xl"}
                onClick={() => {
                  onAccept();
                }}
              >
                Terima
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Modal>
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
      {/* <Modal opened={opened} onClose={close} centered>
        <AspectRatio ratio={9 / 16}>
          <Image
            src={RouterDonasi.api_gambar_pencairan + `${gambarId}`}
            alt="Foto"
          />
        </AspectRatio>
      </Modal> */}

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

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
                  <th style={{ color: AccentColor.white}}>Deskripsi</th>
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

      {/* <Stack p={"md"}>
        <Title order={3}>Rincian Pencairan Dana</Title>
        {_.isEmpty(pencairan) ? (
          <Paper bg={"gray.1"} p={"xs"}>
            <Center>BELUM ADA PENCAIRAN DANA</Center>
          </Paper>
        ) : (
          <Paper withBorder p={"xs"}>
            <Table horizontalSpacing={"md"} verticalSpacing={"md"}>
              <thead>
                <tr>
                  <th>Nominal</th>
                  <th>Tanggal</th>
                  <th>Judul</th>
                  <th>
                    <Center>Deskripsi</Center>
                  </th>
                  <th>
                    <Center>Bukti Transfer</Center>
                  </th>
                </tr>
              </thead>
              <tbody>{rowTable}</tbody>
            </Table>
          </Paper>
        )}
      </Stack> */}
    </>
  );
}
