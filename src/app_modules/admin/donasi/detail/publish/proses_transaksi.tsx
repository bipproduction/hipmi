"use client";

import {
  ActionIcon,
  AspectRatio,
  Box,
  Button,
  Center,
  Group,
  HoverCard,
  Image,
  Modal,
  Paper,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import ComponentAdminDonasi_TombolKembali from "../../component/tombol_kembali";
import { MODEL_DONASI_INVOICE } from "@/app_modules/donasi/model/interface";
import { useState } from "react";
import moment from "moment";
import { IconQuestionMark } from "@tabler/icons-react";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import { AdminDonasi_funUpdateStatusInvoice } from "../../fun/update/fun_update_status_invoice";
import { AdminDonasi_getListStatusInvoiceProses } from "../../fun/get/get_list_status_invoice_proses";
import { AdminDonasi_funUpdateProgresDanTerkumpul } from "../../fun/update/fun_update_progres_dan_terkumpul";
import { useDisclosure } from "@mantine/hooks";
import { RouterAdminDonasi_OLD } from "@/lib/router_hipmi/router_admin";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_gagal";

export default function AdminDonasi_ProsesTransaksi({
  listProses,
}: {
  listProses: MODEL_DONASI_INVOICE[];
}) {
  const [invoice, setInvoice] = useState<MODEL_DONASI_INVOICE[]>(listProses);
  const [opened, { open, close }] = useDisclosure(false);
  const [imageId, setImageId] = useState("");

  async function onClick(invoice: MODEL_DONASI_INVOICE) {
    let nominal: number = +invoice.nominal;
    let terkumpulSementaras: number = +invoice.Donasi.terkumpul;
    const totalTerkumpul = terkumpulSementaras + nominal;

    await AdminDonasi_funUpdateStatusInvoice(invoice.id, "1").then(
      async (res) => {
        if (res.status === 200) {
          ComponentAdminGlobal_NotifikasiBerhasil(res.message);
          await AdminDonasi_funUpdateProgresDanTerkumpul(
            invoice.Donasi.id,
            totalTerkumpul
          ).then(async (res) => {
            if (res.status === 200) {
              await AdminDonasi_getListStatusInvoiceProses(
                invoice.Donasi.id
              ).then((res: any) => {
                setInvoice(res);
              });
            } else {
              ComponentAdminGlobal_NotifikasiGagal(res.message);
            }
          });
        } else {
          ComponentAdminGlobal_NotifikasiGagal(res.message);
        }
      }
    );
  }

  const rowTable = invoice.map((e) => (
    <tr key={e.id}>
      <td>{e.Author.username}</td>
      <td>
        <TampilanRupiahDonasi nominal={+e.nominal} />
      </td>
      <td>
        <Center>{e.DonasiMaster_Bank.name}</Center>
      </td>
      <td>{`${moment(e.createdAt).format("ll")}`}</td>
      <td>
        <Center>
          <Button
            radius={"xl"}
            variant="outline"
            onClick={() => {
              open();
              setImageId(e.imagesId);
            }}
          >
            Lihat
          </Button>
        </Center>
      </td>
      <td>
        <Center>
          <Button
            radius={"xl"}
            variant="filled"
            color="green"
            onClick={() => onClick(e)}
          >
            Accept
          </Button>
        </Center>{" "}
      </td>
    </tr>
  ));

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        <ModalBuktiTransfer imageId={imageId} />
      </Modal>
      {/* <pre>{JSON.stringify(invoice, null, 2)}</pre>  */}
      <Stack>
        <ComponentAdminDonasi_TombolKembali />
        <Stack>
          <HeaderPage />

          <Paper p={"md"} withBorder>
            <Table>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Nominal</th>
                  <th>
                    <Center>Metode Pembayaran</Center>
                  </th>
                  <th>Tanggal</th>
                  <th>
                    <Center>Bukti Transfer</Center>
                  </th>
                  <th>
                    <Center>Aksi</Center>
                  </th>
                </tr>
              </thead>
              <tbody>{rowTable}</tbody>
            </Table>
          </Paper>
        </Stack>
      </Stack>
    </>
  );
}

function HeaderPage() {
  return (
    <>
      <Group position="apart" px={"md"}>
        <Title order={5}>Update Status Donatur</Title>
        <Group position="left">
          <HoverCard width={280} shadow="md">
            <HoverCard.Target>
              <ActionIcon bg={"gray.3"} radius={"xl"}>
                <IconQuestionMark color="black" />
              </ActionIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Group spacing={4}>
                <Text fz="sm">Sebelum melakukan aksi</Text>
                <Text fz="sm" fw={"bold"} c={"green"}>
                  ACCEPT
                </Text>
                <Text fz={"sm"}>
                  Pastikan kembali transaksi donatur sesuai dengan mutasi pada
                  Bank tertuju
                </Text>
              </Group>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
      </Group>
    </>
  );
}

function ModalBuktiTransfer({ imageId }: { imageId: string }) {
  return (
    <>
      <AspectRatio ratio={9 / 16}>
        <Image
          alt="Foto"
          src={RouterAdminDonasi_OLD.api_gambar_bukti_transfer + `${imageId}`}
        />
      </AspectRatio>
    </>
  );
}
