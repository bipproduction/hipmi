import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Event_Create } from "@/app_modules/event";
import { Event_getMasterTipeAcara } from "@/app_modules/event/fun/master/get_tipe_acara";

export default async function Page() {
  const userLoginId = await funGetUserIdByToken();
  const listTipeAcara = await Event_getMasterTipeAcara();

  return (
    <Event_Create
      listTipeAcara={listTipeAcara as any}
      authorId={userLoginId as string}
    />
  );
}
