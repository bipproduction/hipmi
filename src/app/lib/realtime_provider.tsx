"use client";

import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { WibuRealtime } from "wibu-pkg";
import {
  gs_admin_ntf,
  gs_adminDonasi_triggerReview,
  gs_adminEvent_triggerReview,
  gs_adminJob_triggerReview,
  gs_adminVoting_triggerReview,
  gs_donasiTriggerBeranda,
  gs_eventTriggerBeranda,
  gs_jobTiggerBeranda,
  gs_realtimeData,
  gs_user_ntf,
  gs_votingTiggerBeranda,
  IRealtimeData,
} from "./global_state";
import { newFunGetUserId } from "./new_fun_user_id";
import { useState } from "react";

// const WIBU_REALTIME_TOKEN: string | undefined =
//   process.env.NEXT_PUBLIC_WIBU_REALTIME_TOKEN;

// Pasang tipe data di package WibuRealtime sebagai type adata setData
export type TypeNotification = {
  type: "message" | "notification" | "trigger";
  pushNotificationTo: "ADMIN" | "USER";
  dataMessage?: IRealtimeData;
  userLoginId?: string;
};

export default function RealtimeProvider({
  WIBU_REALTIME_TOKEN,
}: {
  WIBU_REALTIME_TOKEN: string;
}) {
  const [userLoginId, setUserLoginId] = useState("");
  const [dataRealtime, setDataRealtime] = useAtom(gs_realtimeData);
  const [newAdminNtf, setNewAdminNtf] = useAtom(gs_admin_ntf);
  const [newUserNtf, setNewUserNtf] = useAtom(gs_user_ntf);

  // JOB
  const [isTriggerJobBeranda, setIsTriggerJobBeranda] =
    useAtom(gs_jobTiggerBeranda);
  const [isAdminJob_TriggerReview, setIsAdminJob_TriggerReview] = useAtom(
    gs_adminJob_triggerReview
  );

  // EVENT
  const [isTriggerEventBeranda, setIsTriggerEventBeranda] = useAtom(
    gs_eventTriggerBeranda
  );
  const [isAdminEvent_TriggerReview, setIsAdminEvent_TriggerReview] = useAtom(
    gs_adminEvent_triggerReview
  );

  // VOTING
  const [isTriggerVotingBeranda, setIsTriggerVotingBeranda] = useAtom(
    gs_votingTiggerBeranda
  );
  const [isAdminVoting_TriggerReview, setIsAdminVoting_TriggerReview] = useAtom(
    gs_adminVoting_triggerReview
  );

  // DONASI
  const [isAdminDonasi_TriggerReview, setIsAdminDonasi_TriggerReview] = useAtom(
    gs_adminDonasi_triggerReview
  );
  const [isTriggerDonasiBeranda, setIsTriggerDonasiBeranda] = useAtom(
    gs_donasiTriggerBeranda
  );

  async function loadUserId() {
    const userId = await newFunGetUserId();

    setUserLoginId(userId as string);
  }

  useShallowEffect(() => {
    loadUserId();

    try {
      WibuRealtime.init({
        project: "hipmi",
        WIBU_REALTIME_TOKEN: WIBU_REALTIME_TOKEN,
        onData(data: TypeNotification) {
          if (
            data.type == "notification" &&
            data.pushNotificationTo == "ADMIN"
          ) {
            setNewAdminNtf((e) => e + 1);
          }

          // Notifikasi ke semua user , yang datanya di acc admin
          if (
            data.type == "notification" &&
            data.pushNotificationTo == "USER" &&
            data.dataMessage?.userId == userLoginId
          ) {
            setNewUserNtf((e) => e + 1);
            setDataRealtime(data.dataMessage as any);
          }

          // ---------------------- JOB ------------------------- //
          if (
            data.type == "trigger" &&
            data.pushNotificationTo == "ADMIN" &&
            data.dataMessage?.kategoriApp == "JOB"
          ) {
            setIsAdminJob_TriggerReview(true);
          }

          if (
            data.type == "trigger" &&
            data.pushNotificationTo == "USER" &&
            data.dataMessage?.kategoriApp == "JOB" &&
            data.dataMessage.status == "Publish"
          ) {
            setIsTriggerJobBeranda(true);
          }
          // ---------------------- JOB ------------------------- //

          // ---------------------- EVENT ------------------------- //
          if (
            data.type == "trigger" &&
            data.pushNotificationTo == "ADMIN" &&
            data.dataMessage?.kategoriApp == "EVENT"
          ) {
            setIsAdminEvent_TriggerReview(true);
          }

          if (
            data.type == "trigger" &&
            data.pushNotificationTo == "USER" &&
            data.dataMessage?.kategoriApp == "EVENT" &&
            data.dataMessage.status == "Publish"
          ) {
            setIsTriggerEventBeranda(true);
          }

          if (
            data.type == "notification" &&
            data.pushNotificationTo == "USER" &&
            data.dataMessage?.status == "Peserta Event" &&
            userLoginId !== data.dataMessage?.userId
          ) {
            setNewUserNtf((e) => e + 1);
          }
          // ---------------------- EVENT ------------------------- //

          // ---------------------- VOTING ------------------------- //
          if (
            data.type == "trigger" &&
            data.pushNotificationTo == "ADMIN" &&
            data.dataMessage?.kategoriApp == "VOTING"
          ) {
            setIsAdminVoting_TriggerReview(true);
          }

          if (
            data.type == "trigger" &&
            data.pushNotificationTo == "USER" &&
            data.dataMessage?.kategoriApp == "VOTING" &&
            data.dataMessage.status == "Publish"
          ) {
            setIsTriggerVotingBeranda(true);
          }

          if (
            data.type == "notification" &&
            data.pushNotificationTo == "USER" &&
            data.dataMessage?.status == "Voting Masuk" &&
            userLoginId !== data.dataMessage?.userId
          ) {
            setNewUserNtf((e) => e + 1);
          }
          // ---------------------- VOTING ------------------------- //

          // ---------------------- DONASI ------------------------- //
          if (
            data.type == "trigger" &&
            data.pushNotificationTo == "ADMIN" &&
            data.dataMessage?.kategoriApp == "DONASI"
          ) {
            setIsAdminDonasi_TriggerReview(true);
          }

          if (
            data.type == "trigger" &&
            data.pushNotificationTo == "USER" &&
            data.dataMessage?.kategoriApp == "DONASI" &&
            data.dataMessage.status == "Publish"
          ) {
            setIsTriggerDonasiBeranda(true);
          }

          // if (
          //   data.type == "notification" &&
          //   data.pushNotificationTo == "ADMIN" &&
          //   data.dataMessage?.status == "Menunggu" &&
          //   userLoginId !== data.dataMessage?.userId
          // ) {
          //   console.log("yes");
          // }

          // ---------------------- DONASI ------------------------- //
        },
      });
    } catch (error) {
      console.log("Error!:", error);
    }
  }, []);

  return null;
}
