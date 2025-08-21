"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_InputCountDown } from "@/app_modules/_global/component";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
} from "@/app_modules/_global/notif_global";
import { Admin_ComponentBoxStyle } from "@/app_modules/admin/_admin_global/_component/comp_admin_boxstyle";
import adminNotifikasi_funCreateToUser from "@/app_modules/admin/notifikasi/fun/create/fun_create_notif_user";
import { MODEL_JOB } from "@/app_modules/job/model/interface";
import { IRealtimeData } from "@/lib/global_state";
import {
  Button,
  Grid,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { IconBan } from "@tabler/icons-react";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { AdminJob_funEditCatatanById } from "../../fun/edit/fun_edit_catatan_by_id";
import { AdminJob_ComponentImageView } from "./image_view";
import { Admin_V3_ComponentBreakpoint } from "@/app_modules/admin/_components_v3/comp_simple_grid_breakpoint";
import { Admin_V3_ComponentDetail } from "@/app_modules/admin/_components_v3/comp_detail_data";

export function AdminJob_DetailReject({ data }: { data: MODEL_JOB }) {
  const [isLoading, setLoading] = useState(false);
  const [isModal, setModal] = useState(false);
  const [newData, setNewData] = useState<MODEL_JOB>(data);
  const [catatan, setCatatan] = useState(data.catatan);

  const listData = [
    {
      title: "Username",
      value: newData.Author.username,
    },
    {
      title: "Judul",
      value: newData.title,
    },
    {
      title: "Report",
      value: newData.catatan,
    },
    {
      title: "Konten",
      value: <div dangerouslySetInnerHTML={{ __html: newData.content }} />,
    },
    {
      title: "Deskripsi",
      value: <div dangerouslySetInnerHTML={{ __html: newData.deskripsi }} />,
    },
  ];

  async function onReject() {
    try {
      setLoading(true);
      const reject = await AdminJob_funEditCatatanById(newData.id, catatan);
      if (reject.status === 200) {
        const dataNotifikasi: IRealtimeData = {
          appId: reject.data?.id as any,
          status: reject.data?.MasterStatus?.name as any,
          userId: reject.data?.authorId as any,
          pesan: reject.data?.title as any,
          kategoriApp: "JOB",
          title: "Report tambahan",
        };

        const notif = await adminNotifikasi_funCreateToUser({
          data: dataNotifikasi as any,
        });

        if (notif.status === 201) {
          WibuRealtime.setData({
            type: "notification",
            pushNotificationTo: "USER",
            dataMessage: dataNotifikasi,
          });
        }
        setModal(false);
        setNewData({ ...newData, catatan: catatan });
        ComponentGlobal_NotifikasiBerhasil(reject.message);
      } else {
        ComponentGlobal_NotifikasiGagal(reject.message);
      }
    } catch (error) {
      console.log("Error reject", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Admin_V3_ComponentBreakpoint>
        <Admin_ComponentBoxStyle>
          <Stack>
            {listData.map((item, index) => (
              <Admin_V3_ComponentDetail key={index} item={item} />
            ))}
          </Stack>

          <Group position="center" mt={"xl"}>
            <Button
              color={"red"}
              leftIcon={<IconBan />}
              radius={"xl"}
              c={AdminColor.white}
              onClick={() => {
                setModal(true);
              }}
            >
              Tambah Catatan
            </Button>
          </Group>
        </Admin_ComponentBoxStyle>

        {newData.imageId && (
          <AdminJob_ComponentImageView imageId={newData.imageId} />
        )}
      </Admin_V3_ComponentBreakpoint>

      <Modal
        styles={{
          header: { backgroundColor: AdminColor.softBlue },
          body: { backgroundColor: AdminColor.softBlue },
          title: { color: AdminColor.white },
        }}
        opened={isModal}
        onClose={() => {
          setModal(false);
        }}
        withCloseButton={false}
        size={"sm"}
        centered
      >
        <Stack>
          <Stack spacing={5}>
            <Textarea
              minRows={3}
              maxRows={5}
              maxLength={300}
              autosize
              label={
                <Text c={AdminColor.white} fw={"bold"}>
                  Alasan Penolakan
                </Text>
              }
              placeholder="Masukkan alasan penolakan lowongan ini"
              value={catatan}
              onChange={(val) => setCatatan(val.target.value)}
            />
            <ComponentGlobal_InputCountDown
              lengthInput={newData.catatan.length}
              maxInput={300}
            />
          </Stack>
          <Group position="right">
            <Button radius={"xl"} onClick={() => setModal(false)}>
              Batal
            </Button>
            <Button
              loading={isLoading}
              loaderPosition="center"
              style={{
                transition: "0.5s",
              }}
              disabled={newData.catatan === "" ? true : false}
              radius={"xl"}
              onClick={() => {
                onReject();
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
