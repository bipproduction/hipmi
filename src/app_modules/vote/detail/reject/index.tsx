"use client";

import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import { Button, SimpleGrid, Stack } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentVote_DetailDataSebelumPublish from "../../component/detail/detail_data_sebelum_publish";
import { Vote_funDeleteById } from "../../fun/delete/fun_delete_by_id";
import { Vote_funEditStatusByStatusId } from "../../fun/edit/fun_edit_status_by_id";
import { gs_vote_status } from "../../global_state";
import { MODEL_VOTING } from "../../model/interface";
import { RouterVote } from "@/lib/router_hipmi/router_vote";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { clientLogger } from "@/util/clientLogger";

export default function Vote_DetailReject({
  dataVote,
}: {
  dataVote: MODEL_VOTING;
}) {
  const [data, setData] = useState(dataVote);

  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentGlobal_BoxInformation isReport informasi={data?.catatan} />
        <ComponentVote_DetailDataSebelumPublish data={data as any} />
        <ButtonAction voteId={data.id} />
      </Stack>
    </>
  );
}

function ButtonAction({ voteId }: { voteId: string }) {
  const router = useRouter();
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onUpdate() {
    await Vote_funEditStatusByStatusId(voteId, "3").then((res) => {
      try {
        setIsLoading(true);
        if (res.status === 200) {
          ComponentGlobal_NotifikasiBerhasil("Berhasil Masuk Draft", 2000);
          router.replace(RouterVote.status({ id: "3" }));
        } else {
          setIsLoading(false);
          ComponentGlobal_NotifikasiGagal(res.message);
        }
      } catch (error) {
        setIsLoading(false);
        clientLogger.error("Error update voting", error);
      }
    });
  }

  async function onDelete() {
    await Vote_funDeleteById(voteId).then((res) => {
      try {
        setIsLoading(true);
        if (res.status === 200) {
          setOpenModal2(false);
          ComponentGlobal_NotifikasiBerhasil("Berhasil Hapus Vote", 2000);
          router.replace(RouterVote.status({ id: "4" }));
        } else {
          setIsLoading(false);
          ComponentGlobal_NotifikasiGagal(res.message);
        }
      } catch (error) {
        setIsLoading(false);
        clientLogger.error("Error delete vote", error);
      }
    });
  }

  return (
    <>
      <SimpleGrid cols={2}>
        <Button
          radius={"xl"}
          style={{ backgroundColor: AccentColor.yellow, fontWeight: "bold" }}
          c={MainColor.darkblue}
          onClick={() => {
            setOpenModal1(true);
          }}
        >
          Edit Kembali
        </Button>{" "}
        <Button
          radius={"xl"}
          c={AccentColor.white}
          style={{ backgroundColor: MainColor.red, fontWeight: "bold" }}
          onClick={() => {
            setOpenModal2(true);
          }}
        >
          Hapus
        </Button>
      </SimpleGrid>

      <UIGlobal_Modal
        title={"Anda akan mengedit kembali voting ini ?"}
        opened={openModal1}
        close={() => setOpenModal1(false)}
        buttonKiri={
          <Button
            radius={"xl"}
            style={{ backgroundColor: AccentColor.blue }}
            c={AccentColor.white}
            onClick={() => {
              setOpenModal1(false);
            }}
          >
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            loading={isLoading ? true : false}
            radius={"xl"}
            style={{ backgroundColor: AccentColor.yellow }}
            onClick={() => {
              onUpdate();
            }}
            c={MainColor.darkblue}
          >
            Simpan
          </Button>
        }
      />

      {/* MODAL HAPUS */}
      <UIGlobal_Modal
        title={"Anda yakin menghapus voting ini ?"}
        opened={openModal2}
        close={() => setOpenModal2(false)}
        buttonKiri={
          <Button
            radius={"xl"}
            onClick={() => {
              setOpenModal2(false);
            }}
            style={{ backgroundColor: AccentColor.blue }}
            c={AccentColor.white}
          >
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loading={isLoading ? true : false}
            loaderPosition="center"
            radius={"xl"}
            onClick={() => {
              onDelete();
            }}
            color="red"
          >
            Hapus
          </Button>
        }
      />
    </>
  );
}
