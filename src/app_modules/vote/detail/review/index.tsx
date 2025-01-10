"use client";

import { IRealtimeData } from "@/app/lib/global_state";
import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import { Button, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import ComponentVote_DetailDataSebelumPublish from "../../component/detail/detail_data_sebelum_publish";
import { Vote_funEditStatusByStatusId } from "../../fun/edit/fun_edit_status_by_id";
import { MODEL_VOTING } from "../../model/interface";
import { voting_checkStatus } from "../../fun";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { AccentColor, MainColor } from "@/app_modules/_global/color";

export default function Vote_DetailReview({
  dataVote,
}: {
  dataVote: MODEL_VOTING;
}) {
  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentVote_DetailDataSebelumPublish data={dataVote as any} />
        <ButtonAction
          voteId={dataVote.id}
          statusId={dataVote.voting_StatusId}
        />
      </Stack>
    </>
  );
}

function ButtonAction({
  voteId,
  statusId,
}: {
  voteId: string;
  statusId: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  async function onUpdate() {
    const check = await voting_checkStatus({ id: voteId });

    if (check) {
      const res = await Vote_funEditStatusByStatusId(voteId, "3");
      if (res.status === 200) {
        const dataNotifikasi: IRealtimeData = {
          appId: res.data?.id as any,
          status: res.data?.Voting_Status?.name as any,
          userId: res.data?.authorId as any,
          pesan: res.data?.title as any,
          kategoriApp: "VOTING",
          title: "Membatalkan review",
        };

        const notif = await notifikasiToAdmin_funCreate({
          data: dataNotifikasi as any,
        });

        if (notif.status === 201) {
          WibuRealtime.setData({
            type: "notification",
            pushNotificationTo: "ADMIN",
          });

          WibuRealtime.setData({
            type: "trigger",
            pushNotificationTo: "ADMIN",
            dataMessage: dataNotifikasi,
          });
        }
        ComponentGlobal_NotifikasiBerhasil("Berhasil Batalkan Review", 2000);
        router.replace(RouterVote.status({ id: "3" }));
        setIsLoading(true);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } else {
      ComponentGlobal_NotifikasiPeringatan("Voting telah direview admin");
    }
  }
  return (
    <>
      <Button
        radius={"xl"}
        style={{ backgroundColor: MainColor.orange }}
        c={MainColor.darkblue}
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Batalkan Review
      </Button>

      <UIGlobal_Modal
        title={"Anda yakin akan membatalkan review?"}
        opened={openModal}
        close={() => setOpenModal(false)}
        buttonKiri={
          <Button c={AccentColor.white} radius={"xl"} onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            style={{ backgroundColor: AccentColor.yellow }}
            loading={isLoading ? true : false}
            radius={"xl"}
            c={MainColor.darkblue}
            onClick={() => {
              onUpdate();
            }}
          >
            Simpan
          </Button>
        }
      />
    </>
  );
}
