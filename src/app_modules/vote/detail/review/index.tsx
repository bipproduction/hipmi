"use client";

import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import { IRealtimeData } from "@/lib/global_state";
import { RouterVote } from "@/lib/router_hipmi/router_vote";
import { Button, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { apiGetOneVotingById } from "../../_lib/api_voting";
import ComponentVote_DetailDataSebelumPublish from "../../component/detail/detail_data_sebelum_publish";
import { voting_checkStatus } from "../../fun";
import { Vote_funEditStatusByStatusId } from "../../fun/edit/fun_edit_status_by_id";
import { MODEL_VOTING } from "../../model/interface";

export default function Vote_DetailReview() {
  const { id } = useParams();
  const [data, setData] = useState<MODEL_VOTING | null>();

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const response = await apiGetOneVotingById({ id: id as string });
      if (response) {
        setData(response.data);
      } else {
        setData(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!data) return <CustomSkeleton height={400} />;

  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentVote_DetailDataSebelumPublish data={data} />
        <ButtonAction voteId={id as string} statusId={data.voting_StatusId} />
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
      setIsLoading(true);
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
      } else {
        setIsLoading(false);
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } else {
      setIsLoading(false);
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
          <Button
            style={{ backgroundColor: AccentColor.blue }}
            c={AccentColor.white}
            radius={"xl"}
            onClick={() => setOpenModal(false)}
          >
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
