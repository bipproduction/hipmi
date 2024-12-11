import { newFunGetUserId } from "@/app/lib/new_fun_user_id";
import { Event_DetailMain } from "@/app_modules/event";
import { Event_countTotalPesertaById } from "@/app_modules/event/fun/count/count_total_peserta_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let eventId = params.id;
  const userLoginId = await newFunGetUserId();
  const totalPeserta = await Event_countTotalPesertaById(eventId);

  return (
    <>
      <Event_DetailMain
        userLoginId={userLoginId as string}
        totalPeserta={totalPeserta as any}
        eventId={eventId}
      />
    </>
  );
}
