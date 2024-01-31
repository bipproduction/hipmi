import { Event_Create } from "@/app_modules/event";
import { Event_getMasterTipeAcara } from "@/app_modules/event/fun/master/get_tipe_acara";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";
import _ from "lodash";

export default async function Page() {
  const userId = await User_getUserId()
  const listTipeAcara = await Event_getMasterTipeAcara();

  return <Event_Create listTipeAcara={listTipeAcara as any} authorId={userId}/>;
}