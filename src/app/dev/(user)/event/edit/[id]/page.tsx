import { Event_Edit } from "@/app_modules/event";
import { event_getOneById } from "@/app_modules/event/fun/get/get_one_by_id";
import { Event_getMasterTipeAcara } from "@/app_modules/event/fun/master/get_tipe_acara";
import _ from "lodash";

export default async function Page({ params }: { params: { id: string } }) {
  let eventId = params.id;
  const data = await event_getOneById(eventId);
  const dataEvent = _.omit(data, [
    "Author",
    "EventMaster_Status",
    "Event_Peserta",
    "createdAt",
    "updatedAt",
    "active",
  ]);

  const listTipeAcara = await Event_getMasterTipeAcara()

  return (
    <>
      <Event_Edit dataEvent={dataEvent as any} listTipeAcara={listTipeAcara as any}/>
    </>
  );
}
