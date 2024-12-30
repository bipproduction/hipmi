import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import Ui_Konfirmasi from "@/app_modules/event/_ui/konfirmasi";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const eventId = (await params).id;
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <Ui_Konfirmasi userLoginId={userLoginId as string} eventId={eventId} />
    </>
  );
}
