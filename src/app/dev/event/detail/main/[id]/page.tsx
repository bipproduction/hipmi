import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Event_DetailMain } from "@/app_modules/event";
import { Event_countTotalPesertaById } from "@/app_modules/event/fun/count/count_total_peserta_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let eventId = params.id;
  const userLoginId = await funGetUserIdByToken();
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
