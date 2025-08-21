import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
} from "@/app_modules/_global/notif_global";
import { UIGlobal_Modal } from "@/app_modules/_global/ui";
import { clientLogger } from "@/util/clientLogger";
import { Button } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  apiDeletePortofolio,
  apiGetOnePortofolioById,
} from "../lib/api_portofolio";
import { IDetailPortofolioBisnis } from "../lib/type_portofolio";

export default function ComponentPortofolio_ButtonDeleteNew({
  userLoginId,
}: {
  userLoginId: string;
}) {
  const param = useParams<{ id: string }>();
  const [openModal, setModal] = useState(false);
  const [loadingDel, setLoadingDel] = useState(false);
  const [dataPorto, setDataPorto] = useState<IDetailPortofolioBisnis>();
  const router = useRouter();

  async function onDelete() {
    try {
      setLoadingDel(true);
      const response = await apiDeletePortofolio(param.id);
      if (response) {
        ComponentGlobal_NotifikasiBerhasil(response.message);
        router.back();
      } else {
        setLoadingDel(false);
        ComponentGlobal_NotifikasiGagal(response?.message);
      }
    } catch (error) {
      setLoadingDel(false);
      clientLogger.error("Error delete portofolio", error);
      ComponentGlobal_NotifikasiGagal("Gagal menghapus portofolio");
    }
  }

  async function funGetPortofolio() {
    try {
      const response = await apiGetOnePortofolioById(param.id, "bisnis");
      if (response) {
        setDataPorto(response.data);
      }
    } catch (error) {
      console.error("Error get data button delete:", error);
    }
  }

  useShallowEffect(() => {
    funGetPortofolio();
  }, []);

  return (
    <>
      {userLoginId === dataPorto?.authorId && (
        <Button
          radius={"xl"}
          bg={MainColor.red}
          color="red"
          onClick={() => {
            setModal(true);
          }}
        >
          <IconTrash />
        </Button>
      )}

      <UIGlobal_Modal
        title={"Anda yakin menghapus portofolio ini ?"}
        opened={openModal}
        close={() => setModal(false)}
        buttonKiri={
          <Button radius={"xl"} onClick={() => setModal(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            radius={"xl"}
            color="red"
            loaderPosition="center"
            loading={loadingDel}
            onClick={() => onDelete()}
          >
            Hapus
          </Button>
        }
      />
    </>
  );
}
