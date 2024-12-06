import { newFunGetUserId } from "@/app/lib/new_fun_user_id";
import { Event_Create } from "@/app_modules/event";
import { Event_getMasterTipeAcara } from "@/app_modules/event/fun/master/get_tipe_acara";

export default async function Page() {
  const userLoginId = await newFunGetUserId();
  const listTipeAcara = await Event_getMasterTipeAcara();

  return (
    <Event_Create
      listTipeAcara={listTipeAcara as any}
      authorId={userLoginId as string}
    />
  );
}
