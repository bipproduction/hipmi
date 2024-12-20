"use client";

import { RouterAdminGlobal } from "@/app/lib";
import { RouterAdminDonasi } from "@/app/lib/router_admin/router_admin_donasi";
import { RouterAdminDonasi_OLD } from "@/app/lib/router_hipmi/router_admin";
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
      <Paper radius={"md"} p={"md"}>
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
            <Paper withBorder p={"xs"}>
              <Stack>
                <Title align="center" order={4}>
                  Gambar Donasi
                </Title>
                <Admin_ComponentLoadImageLandscape fileId={donasi.imageId} />
              </Stack>
            </Paper>

            <Paper withBorder p={"sm"}>
              <Stack spacing={5}>
                <Title order={4}>Detail Donasi</Title>
                <Grid>
                  <Grid.Col span={4}>
                    <Text fz={"xs"}>Judul</Text>
                  </Grid.Col>
                  <Grid.Col span={"content"}>:</Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Title order={5} c="blue">
                      {donasi?.title}
                    </Title>
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={4}>
                    <Text fz={"xs"}>Penggalang Dana</Text>
                  </Grid.Col>
                  <Grid.Col span={"content"}>:</Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Title order={5} c="blue">
                      {donasi?.Author.username}
                    </Title>
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={4}>
                    <Text fz={"xs"}>Durasi</Text>
                  </Grid.Col>
                  <Grid.Col span={"content"}>:</Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Title order={5} c="blue">
                      {donasi?.DonasiMaster_Durasi.name} hari
                    </Title>
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={4}>
                    <Text fz={"xs"}>Dana dibutuhkan</Text>
                  </Grid.Col>
                  <Grid.Col span={"content"}>:</Grid.Col>
                  <Grid.Col span={"auto"}>
                    <ComponentGlobal_TampilanRupiah
                      nominal={+donasi?.target}
                      color="darkblue"
                    />
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={4}>
                    <Text fz={"xs"}>Kategori</Text>
                  </Grid.Col>
                  <Grid.Col span={"content"}>:</Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Title order={5} c="blue">
                      {donasi?.DonasiMaster_Ketegori?.name}
                    </Title>
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={4}>
                    <Text fz={"xs"}>Total donatur</Text>
                  </Grid.Col>
                  <Grid.Col span={"content"}>:</Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Title order={5} c="blue">
                      {countDonatur}
                    </Title>
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={4}>
                    <Text fz={12}>Progres</Text>
                  </Grid.Col>
                  <Grid.Col span={"content"}>:</Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Title order={5} c="blue">
                      {toNumber(donasi.progres).toFixed(2)} %
                    </Title>
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={4}>
                    <Text fz={12}>Dana terkumpul</Text>
                  </Grid.Col>
                  <Grid.Col span={"content"}>:</Grid.Col>
                  <Grid.Col span={"auto"}>
                    <ComponentGlobal_TampilanRupiah
                      nominal={+donasi?.terkumpul}
                      color="darkblue"
                    />
                  </Grid.Col>
                </Grid>
              </Stack>
            </Paper>

            {/* Pencairan Dana */}
            <Paper withBorder p={"sm"}>
              <Stack spacing={"xl"}>
                <Center>
                  <Title order={4}>Pencairan Dana</Title>
                </Center>
                <Grid>
                  <Grid.Col span={"auto"}>
                    <Stack spacing={0}>
                      <Text fz={"xs"}>Total Dana Dicairkan</Text>
                      <ComponentGlobal_TampilanRupiah
                        nominal={donasi?.totalPencairan}
                        color="darkblue"
                      />
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Stack spacing={0}>
                      <Text fz={"xs"}>Bank Tujuan</Text>
                      <Title order={6} c={"blue"}>
                        {donasi?.namaBank}
                      </Title>
                    </Stack>
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col span={"auto"}>
                    <Stack spacing={0}>
                      <Text fz={"xs"}>Akumulasi Pencairan</Text>
                      <Title order={6} c={"blue"}>
                        {donasi?.akumulasiPencairan} Kali
                      </Title>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Stack spacing={0}>
                      <Text fz={"xs"}>Nomor Rekening</Text>
                      <Title order={6} c={"blue"}>
                        {donasi?.rekening}
                      </Title>
                    </Stack>
                  </Grid.Col>
                </Grid>

                <Stack align="center" spacing={0}>
                  <Text fz={"xs"}>Sisa Dana</Text>
                  <ComponentGlobal_TampilanRupiah
                    nominal={
                      toNumber(donasi.terkumpul) -
                      toNumber(donasi.totalPencairan)
                    }
                    color="darkblue"
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
        <Center>{e?.Author.username}</Center>
      </td>
      <td>
        <Center>{e?.DonasiMaster_Bank?.name}</Center>
      </td>
      <td>
        <Center>
          <ComponentGlobal_TampilanRupiah color="black" nominal={+e?.nominal} />
        </Center>
      </td>
      <td>
        <Center>
          {new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(
            e?.createdAt
          )}
        </Center>
      </td>
      <td>
        <Center>
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
        <Group
          position="apart"
          bg={"gray.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Daftar Donatur</Title>
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
        </Group>

        <Paper p={"md"} withBorder shadow="lg" h={"80vh"}>
          <ScrollArea w={"100%"} h={"90%"}>
            <Table
              verticalSpacing={"xl"}
              horizontalSpacing={"md"}
              p={"md"}
              w={1500}
              striped
              highlightOnHover
            >
              <thead>
                <tr>
                  <th>
                    <Center>Nama Donatur</Center>
                  </th>
                  <th>
                    <Center>Nama Bank</Center>
                  </th>
                  <th>
                    <Center>Jumlah Donasi</Center>
                  </th>
                  <th>
                    <Center>Tanggal</Center>
                  </th>
                  <th>
                    <Center>Status</Center>
                  </th>
                  <th>
                    <Center>Bukti Transfer</Center>
                  </th>
                  <th>
                    <Center>Aksi</Center>
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
        <Center>
          <TampilanRupiahDonasi nominal={e.nominalCair} />
        </Center>
      </td>
      <td>
        <Center>{moment(e.createdAt).format("ll")}</Center>
      </td>
      <td>
        <Center>
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
        <Group
          position="apart"
          bg={"gray.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Rincian Pencairan Dana</Title>
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
        </Group>

        <Paper p={"md"} withBorder shadow="lg" h={"80vh"}>
          <ScrollArea w={"100%"} h={"90%"}>
            <Table
              verticalSpacing={"xl"}
              horizontalSpacing={"md"}
              p={"md"}
              w={1500}
              striped
              highlightOnHover
            >
              <thead>
                <tr>
                  <th>
                    <Center>Nominal</Center>
                  </th>
                  <th>
                    <Center>Tanggal</Center>
                  </th>
                  <th>
                    <Center>Judul</Center>
                  </th>
                  <th>Deskripsi</th>
                  <th>
                    <Center>Bukti Transfer</Center>
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
