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
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import React, { useState } from "react";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../_admin_global/admin_notifikasi/notifikasi_berhasil";
import AdminGlobal_ComponentBackButton from "../../_admin_global/back_button";
import ComponentAdminDonasi_CeritaPenggalangDana from "../component/tampilan_detail_cerita";
import ComponentAdminDonasi_TampilanDetailDonasi from "../component/tampilan_detail_donasi";
import { AdminDonasi_getOneById } from "../fun/get/get_one_by_id";
import { AdminDonasi_funUpdateCatatanReject } from "../fun/update/fun_update_catatan_reject";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../_admin_global/admin_notifikasi/notifikasi_gagal";
import { Admin_ComponentModalReport } from "../../_admin_global/_component";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { useParams } from "next/navigation";
import { apiGetAdminDonasiById } from "../lib/api_fetch_admin_donasi";
import { clientLogger } from "@/util/clientLogger";
import CustomSkeletonAdmin from "../../_admin_global/_component/skeleton/customSkeletonAdmin";
import SkeletonAdminDetailDonasiReject from "../component/skeleton_detail donasi_reject";

export default function AdminDonasi_DetailReject() {
  const [data, setData] = useState<MODEL_DONASI | null>(null);
  const params = useParams<{ id: string }>();

  useShallowEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await apiGetAdminDonasiById({
          id: params.id,
        })

        if (response?.success && response?.data) {
          setData(response.data);
        } else {
          console.error("Invalid data format recieved:", response);
          setData(null);
        }
      } catch (error) {
        clientLogger.error("Invalid data format recieved:", error);
        setData(null);
      }
    }
    loadInitialData();
  })

  return (
    <>
      <Stack>
        {!data ? (
          <SkeletonAdminDetailDonasiReject/>
        ) : (
          <>
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
          </>
        )}
      </Stack >
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
      <Paper p={"md"} bg={AdminColor.softBlue}>
        <Stack>
          <Title c={AdminColor.white} order={5}>Alasan Penolakan :</Title>
          <Text c={AdminColor.white}>{catatan}</Text>
        </Stack>
      </Paper>
    </>
  );
}
