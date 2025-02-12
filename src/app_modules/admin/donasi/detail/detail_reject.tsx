"use client";

import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import { MODEL_DONASI } from "@/app_modules/donasi/model/interface";
import {
  AspectRatio,
  Button,
  Group,
  Image,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../_admin_global/admin_notifikasi/notifikasi_berhasil";
import AdminGlobal_ComponentBackButton from "../../_admin_global/back_button";
import ComponentAdminDonasi_CeritaPenggalangDana from "../component/tampilan_detail_cerita";
import ComponentAdminDonasi_TampilanDetailDonasi from "../component/tampilan_detail_donasi";
import { AdminDonasi_getOneById } from "../fun/get/get_one_by_id";
import { AdminDonasi_funUpdateCatatanReject } from "../fun/update/fun_update_catatan_reject";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../_admin_global/admin_notifikasi/notifikasi_gagal";
import { Admin_ComponentModalReport } from "../../_admin_global/_component";

export default function AdminDonasi_DetailReject({
  dataReject,
}: {
  dataReject: MODEL_DONASI;
}) {
  const [data, setData] = useState(dataReject);

  return (
    <>
      <Stack>
        <ButtonOnHeader
          catatan={data.catatan}
          donasiId={data.id}
          setDonasi={setData}
        />
        <CatatanReject catatan={data.catatan} />
        <SimpleGrid
          cols={2}
          spacing="lg"
          breakpoints={[
            { maxWidth: "md", cols: 2, spacing: "md" },
            { maxWidth: "sm", cols: 1, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "xs" },
          ]}
        >
          <ComponentAdminDonasi_TampilanDetailDonasi donasi={data} />
          <ComponentAdminDonasi_CeritaPenggalangDana
            cerita={data.CeritaDonasi}
          />
        </SimpleGrid>
      </Stack>
    </>
  );
}

function ButtonOnHeader({
  catatan,
  donasiId,
  setDonasi,
}: {
  catatan: string;
  donasiId: string;
  setDonasi: any;
}) {
  const [report, setReport] = useState(catatan);
  const [opened, setOpened] = useState(false);
  const [isLoading, setLoading] = useState(false);

  async function onUpdate() {
    const res = await AdminDonasi_funUpdateCatatanReject(donasiId, report);
    if (res.status === 200) {
      setLoading(true);
      ComponentAdminGlobal_NotifikasiBerhasil(res.message);
      setOpened(false);
      await AdminDonasi_getOneById(donasiId).then((res) => setDonasi(res));
    } else {
      ComponentAdminGlobal_NotifikasiGagal(res.message);
    }
  }

  return (
    <>
      <Stack>
        <Group position="apart">
          <AdminGlobal_ComponentBackButton />
          <Button
            radius={"xl"}
            bg={"orange"}
            color="orange"
            onClick={() => setOpened(true)}
          >
            Tambah catatan
          </Button>
        </Group>
      </Stack>

      <Admin_ComponentModalReport
        opened={opened}
        onClose={() => setOpened(false)}
        title="Tambah catatan"
        value={report}
        onHandlerChange={(val: React.ChangeEvent<HTMLTextAreaElement>) =>
          setReport(val.target.value)
        }
        buttonKanan={
          <>
            <Button
              loaderPosition="center"
              loading={isLoading}
              radius={"xl"}
              onClick={() => {
                onUpdate();
              }}
            >
              Simpan
            </Button>
          </>
        }
        buttonKiri={
          <>
            <Button
              radius={"xl"}
              onClick={() => {
                close();
              }}
            >
              Batal
            </Button>
          </>
        }
        cekInputKarakter={
          <>
            <ComponentGlobal_InputCountDown
              maxInput={300}
              lengthInput={report.length}
            />
          </>
        }
      />

      {/* <Modal
        opened={opened}
        onClose={close}
        centered
        size={"lg"}
        withCloseButton={false}
      >
        <Stack>
          <Textarea
            autosize
            minRows={3}
            maxRows={5}
            maxLength={300}
            label="Update alasan penolakan"
            placeholder="Masukan alasan penolakan"
            value={report}
            onChange={(val) => setReport(val.target.value)}
          />

          <Group position="right"></Group>
        </Stack>
      </Modal> */}
    </>
  );
}

function CatatanReject({ catatan }: { catatan: string }) {
  return (
    <>
      <Paper p={"md"} bg={"gray.1"}>
        <Stack>
          <Title order={5}>Alasan Penolakan :</Title>
          <Text>{catatan}</Text>
        </Stack>
      </Paper>
    </>
  );
}
