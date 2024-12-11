import { newFunGetUserId } from "@/app/lib/new_fun_user_id";
import Ui_Konfirmasi from "@/app_modules/event/_ui/konfirmasi";

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
