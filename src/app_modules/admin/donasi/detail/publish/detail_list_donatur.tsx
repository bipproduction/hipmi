import { AccentColor } from '@/app_modules/_global/color';
import { AdminColor } from '@/app_modules/_global/color/color_pallet';
import { ComponentGlobal_TampilanRupiah } from '@/app_modules/_global/component';
import { apiGetMasterStatusTransaksi } from '@/app_modules/_global/lib/api_fetch_master';
import { globalStatusTransaksi } from '@/app_modules/_global/lib/master_list_app';
import { ComponentAdminGlobal_TitlePage } from '@/app_modules/admin/_admin_global/_component';
import CustomSkeletonAdmin from '@/app_modules/admin/_admin_global/_component/skeleton/customSkeletonAdmin';
import { MODEL_DONASI } from '@/app_modules/donasi/model/interface';
import { MODEL_NEW_DEFAULT_MASTER } from '@/app_modules/model_global/interface';
import { RouterAdminGlobal } from '@/lib';
import { clientLogger } from '@/util/clientLogger';
import { Center, Badge, Button, Stack, Group, ActionIcon, Select, Paper, ScrollArea, Table, Pagination, Text, Modal, Title } from '@mantine/core';
import { useDisclosure, useShallowEffect } from '@mantine/hooks';
import { IconReload } from '@tabler/icons-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { apiGetAdminAllDaftarDonatur } from '../../lib/api_fetch_admin_donasi';
import { ComponentAdminGlobal_NotifikasiBerhasil } from '@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_berhasil';
import { ComponentAdminGlobal_NotifikasiGagal } from '@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_gagal';
import adminNotifikasi_funCreateToUser from '@/app_modules/admin/notifikasi/fun/create/fun_create_notif_user';
import adminDonasi_funUpdateStatusDanTotal from '../../fun/update/fun_update_status_dan_total';

function TampilanListDonatur({ setReloadDonasi, donasi, isReload }: { setReloadDonasi: (val: boolean) => void, donasi: MODEL_DONASI, isReload: boolean }) {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const donasiId = params.id;
  const [isLoadingCek, setLoadingCek] = useState(false);
  const [idData, setIdData] = useState("");
  const [lisDonatur, setListDonatur] = useState<any[] | null>(null);
  const [listStatus, setListStatus] = useState<MODEL_NEW_DEFAULT_MASTER[] | null>(null);
  const [isNPage, setNPage] = useState<number>(1);
  const [isActivePage, setActivePage] = useState(1);
  const [selectStatus, setSelectStatus] = useState("");
  const [isLoadingReload, setIsLoadingReload] = useState(false);


  useShallowEffect(() => {
    handleLoadData();
  }, [isActivePage, selectStatus, isReload]);

  useShallowEffect(() => {
    handleLoadStatus();
  }, [])

  const handleLoadData = async () => {
    try {
      console.log("Ini active page", isActivePage);
      const cek = globalStatusTransaksi.find((e) => e.id === selectStatus);
      const response = await apiGetAdminAllDaftarDonatur({
        id: donasiId,
        page: `${isActivePage}`,
        status: cek?.name,
      });

      if (response?.success && response?.data?.data) {
        console.log("data lis", response.data);
        setListDonatur(response.data.data);
        setNPage(response.data.nPage || 1);
        setIsLoadingReload(false)
      } else {
        console.error("Invalid data format received:", response);
        setListDonatur([]);

      }
    } catch (error) {
      clientLogger.error("Error get data daftar donatur", error);
      setListDonatur([]);

    }
  }

  const handleLoadStatus = async () => {
    try {
      const response = await apiGetMasterStatusTransaksi();


      if (response?.success && response?.data) {
        setListStatus(response.data);

      } else {
        console.error("Invalid data format received:", response);
        setListStatus(null);
      }
    } catch (error) {
      clientLogger.error("Error get status donatur", error);
      setListStatus(null);
    }
  }
  const onPageClick = async (page: number) => {
    console.log("page", page);
    setActivePage(page);
  }
  async function onSelect(selectStatus: any) {
    setSelectStatus(selectStatus);
    setActivePage(1)
  }
  async function onReload() {
    setSelectStatus("");
    setIsLoadingReload(true)
    handleLoadData();
  }



  const renderTableBody = () => {

    if(isLoadingReload) return (
      <tr>
        <td colSpan={12}>
          <Center>
            <Text c={AccentColor.white}>Loading Data... </Text>
          </Center>
        </td>
      </tr>
    )
    if (!Array.isArray(lisDonatur) || lisDonatur.length === 0) {
      return (
        <tr>
          <td colSpan={12}>
            <Center>
              <Text c={AccentColor.white}>Tidak ada data</Text>
            </Center>
          </td>
        </tr>
      );
    }

    return lisDonatur?.map((e, i) => (
      <tr key={i}>
        <td>
          <Center c={AccentColor.white}>{e?.Author.username}</Center>
        </td>
        <td>
          <Center c={AccentColor.white}>{e?.DonasiMaster_Bank?.name}</Center>
        </td>
        <td>
          <Center c={AccentColor.white}>
            <ComponentGlobal_TampilanRupiah nominal={+e?.nominal} />
          </Center>
        </td>
        <td>
          <Center c={AccentColor.white}>
            {new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(
              new Date(e?.createdAt)
            )}
          </Center>
        </td>
        <td>
          <Center >
            <Badge c={AccentColor.white} w={150} variant="dot">
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
                donasiId={donasi.id}
                nominal={+e?.nominal}
                danaTerkumpul={+donasi?.terkumpul}
                target={+donasi?.target}
                isReload

                onSetDonasi={() => {
                  setReloadDonasi(true);
                }}
                onSuccessDonatur={(val) => {
                  setListDonatur(val.data);
                  setNPage(val.nPage);
                  isReload
                }}
              />
            ) : (
              <Text>-</Text>
            )}
          </Center>
        </td>
      </tr>
    ));
  }

  if (!lisDonatur && !listStatus) return <CustomSkeletonAdmin height={"80vh"} />

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
                style={{
                  transition: "0.5s",
                }}
                disabled={selectStatus ==""}
                radius={"xl"}
                variant="light"
                onClick={() => {
                  onReload();
                }}
              >
                <IconReload />
              </ActionIcon>
              <Select
                placeholder="Pilih status"
                value={selectStatus}
                data={listStatus?.map((e, i) => ({
                  value: e.id,
                  label: e.name,
                })) || []}
                onChange={(val: any) => {
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
              <tbody>{renderTableBody()}</tbody>
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

export default TampilanListDonatur;
function ButtonAccept({
  invoiceId,
  donasiId,
  nominal,
  danaTerkumpul,
  target,
  onSetDonasi: onSuccessDonasi,
  onSuccessDonatur,
  isReload
}: {
  invoiceId: string;
  donasiId: string;
  nominal: number;
  danaTerkumpul: number;
  target: number;
  onSetDonasi: (val: boolean) => void;
  onSuccessDonatur: (val: any) => void;
  isReload: boolean
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onAccept() {
    let nominalDonasi = nominal;
    let jumlahTerkumpul = danaTerkumpul;
    setIsLoading(true);
    isReload

    console.log({

      jumlahTerkumpul: jumlahTerkumpul,
      nominal: nominalDonasi,
      statusInvoiceId: "1",
      target: target,
    });

    const updateStatus = await adminDonasi_funUpdateStatusDanTotal({
      invoiceId: invoiceId,
      donasiId: donasiId,
      jumlahTerkumpul: jumlahTerkumpul,
      nominal: nominalDonasi,
      target: target,
      statusInvoiceId: "1",
    });



    if (updateStatus.status == 200) {
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

      // const updateData = await AdminDonasi_getOneById(donasiId);
      // onSuccessDonasi(updateData as any);
      // const updatelistDonatur = await adminDonasi_getListDonatur({
      //   donasiId: donasiId,
      //   page: 1,
      // });
      onSuccessDonasi(true);
      ComponentAdminGlobal_NotifikasiBerhasil(updateStatus.message);
      setIsLoading(false);
      close();
    } else {
      ComponentAdminGlobal_NotifikasiGagal(updateStatus.message);
      setIsLoading(false);
    }
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