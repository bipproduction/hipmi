import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import {
  UIGlobal_DrawerCustom,
  UIGlobal_Modal,
} from "@/app_modules/_global/ui";
import {
  ActionIcon,
  Button,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_INVESTASI_DOKUMEN } from "../../_lib/interface";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import {
  investasi_funDeleteDokumenById,
  investasi_funGetAllDocumentById,
} from "../../_fun";
import { funGlobal_DeleteFileById } from "@/app_modules/_global/fun";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { apiGetDokumenInvestasiById } from "../../_lib/api_interface";
import { clientLogger } from "@/util/clientLogger";

export function Investasi_ComponentCardRekapDocument({
  data,
  onSetData,
}: {
  data: MODEL_INVESTASI_DOKUMEN;
  onSetData: (val: any) => any[];
}) {
  const params = useParams<{ id: string }>();
  const investasiId = params.id;

  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [visible, setVisible] = useState(false);

  async function onDelete() {
    try {
      setIsLoadingDelete(true);
      const deleteFileFromStorage = await funGlobal_DeleteFileById({
        fileId: data.fileId,
      });

      if (!deleteFileFromStorage.success) {
        ComponentGlobal_NotifikasiPeringatan("Gagal hapus file lama");
      }

      const deleteFromDB = await investasi_funDeleteDokumenById({
        dokumenId: data.id,
      });

      if (deleteFromDB.status !== 200) {
        ComponentGlobal_NotifikasiPeringatan(deleteFromDB.message);
        return;
      }
      ComponentGlobal_NotifikasiBerhasil(deleteFromDB.message);
      setOpenModal(false);

      const respone = await apiGetDokumenInvestasiById({
        id: investasiId,
        kategori: "get-all",
        page: "1",
      });

      if (respone.success) {
        onSetData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error hapus dokumen", error);
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return (
    <>
      <ComponentGlobal_CardStyles>
        <Grid>
          <Grid.Col
            span={"auto"}
            onClick={() => {
              router.push(
                NEW_RouterInvestasi.file_prospektus({ id: data.fileId }),
                { scroll: false }
              );
              setVisible(true);
            }}
          >
            <Stack justify="center" h={"100%"}>
              <Text lineClamp={2}>{data.title}</Text>
            </Stack>
          </Grid.Col>

          <Grid.Col span={"content"} onClick={() => setOpenDrawer(true)}>
            <Group grow>
              <ActionIcon variant="transparent">
                <IconDots color="white" />
              </ActionIcon>
            </Group>
          </Grid.Col>
        </Grid>
        {visible && <ComponentGlobal_CardLoadingOverlay />}
      </ComponentGlobal_CardStyles>

      <UIGlobal_DrawerCustom
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={
          <SimpleGrid cols={2}>
            <Stack align="center" spacing={"xs"}>
              <ActionIcon
                variant="transparent"
                c="white"
                onClick={() => {
                  setIsLoadingEdit(true);
                  router.push(
                    NEW_RouterInvestasi.edit_dokumen({ id: data.id }),
                    { scroll: false }
                  );
                }}
              >
                {isLoadingEdit ? <ComponentGlobal_Loader /> : <IconEdit />}
              </ActionIcon>
              <Text fz={"sm"} align="center" color="white">
                Edit Dokumen
              </Text>
            </Stack>

            <Stack align="center" spacing={"xs"}>
              <ActionIcon
                variant="transparent"
                c="white"
                onClick={() => {
                  setOpenModal(true);
                  setOpenDrawer(false);
                }}
              >
                <IconTrash color="red" />
              </ActionIcon>
              <Text fz={"sm"} c={"red"} align="center" color="white">
                Hapus Dokumen
              </Text>
            </Stack>
          </SimpleGrid>
        }
      />

      <UIGlobal_Modal
        opened={openModal}
        close={() => setOpenModal(false)}
        title={"Anda yakin akan menghapus dokumen ini ?"}
        buttonKiri={
          <Button radius={"xl"} onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            loading={isLoadingDelete}
            radius={"xl"}
            color={"red"}
            onClick={() => {
              onDelete();
            }}
          >
            Hapus
          </Button>
        }
      />
    </>
  );
}
