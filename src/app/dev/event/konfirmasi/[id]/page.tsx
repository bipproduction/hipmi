import { newFunGetUserId } from "@/app/lib/new_fun_user_id";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import Ui_Konfirmasi from "@/app_modules/event/_ui/konfirmasi";
import { event_funCheckPesertaByUserId } from "@/app_modules/event/fun";
import { event_getOneById } from "@/app_modules/event/fun/get/get_one_by_id";
import moment from "moment";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const eventId = (await params).id;
  const userLoginId = await newFunGetUserId();

  return (
    <>
      <Ui_Konfirmasi userLoginId={userLoginId as string} eventId={eventId} />
    </>
  );
}
