"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import { AccentColor, MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import mqtt_client from "@/util/mqtt_client";
import { Button, SimpleGrid, Stack } from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentVote_DetailDataSebelumPublish from "../../component/detail/detail_data_sebelum_publish";
import { Vote_funDeleteById } from "../../fun/delete/fun_delete_by_id";
import { Vote_funEditStatusByStatusId } from "../../fun/edit/fun_edit_status_by_id";
import { MODEL_VOTING } from "../../model/interface";
import { IRealtimeData } from "@/app/lib/global_state";
import { WibuRealtime } from "wibu-pkg";
import { useShallowEffect } from "@mantine/hooks";
import { voting_funGetOneVotingbyId } from "../../fun/get/fun_get_one_by_id";
import _ from "lodash";
import { clientLogger } from "@/util/clientLogger";

export default function Vote_DetailDraft({
  dataVote,
}: {
  dataVote: MODEL_VOTING;
}) {
  const [data, setData] = useState(dataVote);

  useShallowEffect(() => {
    onLoadData(setData);
  }, [setData]);

  async function onLoadData(setData: any) {
    const loadData = await voting_funGetOneVotingbyId(dataVote.id);
    setData(loadData);
  }

  return (
    <>
      <Stack spacing={"xl"}>
        {dataVote?.catatan && (
          <ComponentGlobal_BoxInformation isReport informasi={data?.catatan} />
        )}
        <ComponentVote_DetailDataSebelumPublish data={data} />
        <ButtonAction voteId={data.id} awalVote={data.awalVote} />
      </Stack>
    </>
  );
}

function ButtonAction({
  voteId,
  awalVote,
}: {
  voteId: string;
  awalVote: Date;
}) {
  const router = useRouter();
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onUpdate() {
    const hariIni = new Date();
    const cekHari = moment(awalVote).diff(hariIni, "days");

    if (cekHari < 0)
      return ComponentGlobal_NotifikasiPeringatan("Tanggal Voting Lewat");

    const res = await Vote_funEditStatusByStatusId(voteId, "2");
    if (res.status === 200) {
      const dataNotifikasi: IRealtimeData = {
        appId: res.data?.id as any,
        status: res.data?.Voting_Status?.name as any,
        userId: res.data?.authorId as any,
        pesan: res.data?.title as any,
        kategoriApp: "VOTING",
        title: "Mengajukan review",
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

        ComponentGlobal_NotifikasiBerhasil("Berhasil Ajukan Review", 2000);
        setIsLoading(true);
        router.replace(RouterVote.status({ id: "2" }));
      }
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  }

  async function onDelete() {
    await Vote_funDeleteById(voteId).then((res) => {
      try {
        setIsLoading(true);
        if (res.status === 200) {
          setOpenModal2(false);
          ComponentGlobal_NotifikasiBerhasil("Berhasil Hapus Vote", 2000);
          router.replace(RouterVote.status({ id: "3" }));
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
          style={{ backgroundColor: AccentColor.yellow }}
          c={MainColor.darkblue}
          onClick={() => {
            setOpenModal1(true);
          }}
        >
          Ajukan Review
        </Button>
        <Button
          radius={"xl"}
          style={{ backgroundColor: MainColor.red }}
          c={AccentColor.white}
          onClick={() => {
            setOpenModal2(true);
          }}
        >
          Hapus
        </Button>
      </SimpleGrid>

      {/* MODAL AJUKAN */}
      <UIGlobal_Modal
        title={"Anda yakin akan melakukan pengajuan review kembali ?"}
        opened={openModal1}
        close={() => setOpenModal1(false)}
        buttonKiri={
          <Button
            radius={"xl"}
            onClick={() => {
              setOpenModal1(false);
            }}
            style={{ backgroundColor: AccentColor.blue}} c={AccentColor.white}
          >
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            loading={isLoading ? true : false}
            radius={"xl"}
            onClick={() => {
              onUpdate();
            }}
            c={MainColor.darkblue}
            style={{ backgroundColor: AccentColor.yellow  }}
          >
            Ajukan
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
          style={{ backgroundColor: AccentColor.blue}} c={AccentColor.white}
            radius={"xl"}
            onClick={() => {
              setOpenModal2(false);
            }}
          >
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            radius={"xl"}
            loaderPosition="center"
            loading={isLoading ? true : false}
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
