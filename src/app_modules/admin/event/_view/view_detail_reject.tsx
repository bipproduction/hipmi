import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { MODEL_EVENT } from "@/app_modules/event/_lib/interface";
import { Button, Grid, Group, Stack, Textarea, Text} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencilPlus } from "@tabler/icons-react";
import { useState } from "react";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import { Admin_ComponentModal } from "../../_admin_global/_component/comp_admin_modal";
import AdminEvent_ComponentDetailData from "../_component/comp_detail_data";
import { AdminEvent_funEditCatatanById } from "../fun/edit/fun_edit_status_reject_by_id";

export function AdminEvent_ViewDetailReject({ data }: { data: MODEL_EVENT }) {
  const [newData, setNewData] = useState<MODEL_EVENT>(data);
  const [catatan, setCatatan] = useState(data.catatan);
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setLoading] = useState(false);

  async function handleUpdateReject() {
    if (catatan === "")
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Catatan");

    const body = {
      id: newData.id,
      catatan: catatan,
    };

    try {
      setLoading(true);
      const res = await AdminEvent_funEditCatatanById(body as any, "4");
      if (res.status === 200) {
        setNewData({
          ...newData,
          catatan: catatan,
        });
        ComponentGlobal_NotifikasiBerhasil(res.message);
        close();
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      console.log("Error add note reject", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Admin_ComponentBoxStyle>
        <Stack>
          <AdminEvent_ComponentDetailData data={newData} />
          <Grid>
            <Grid.Col span={3}>
              <Text fw={"bold"}>Catatan report</Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text>:</Text>
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Text>{newData.catatan}</Text>
            </Grid.Col>
          </Grid>

          <Group mt={100} spacing={"xl"} position="center">
            <Button
              color={"red"}
              leftIcon={<IconPencilPlus />}
              radius={"xl"}
              onClick={open}
            >
              Tambah catatan
            </Button>
          </Group>
        </Stack>
      </Admin_ComponentBoxStyle>

      <Admin_ComponentModal
        opened={opened}
        onClose={close}
        title="Tambah alasan penolakan"
      >
        <Stack>
          <Textarea
            minRows={2}
            maxRows={5}
            maxLength={300}
            value={catatan}
            autosize
            placeholder="Contoh: Karena deskripsi kurang lengkap, dll"
            onChange={(val) => {
              setCatatan(val.target.value);
            }}
          />
          <Group position="right">
            <Button radius={"xl"} onClick={close}>
              Batal
            </Button>
            <Button
              color="green"
              loading={isLoading}
              loaderPosition="center"
              radius={"xl"}
              onClick={() => {
                handleUpdateReject();
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Admin_ComponentModal>
    </>
  );
}
