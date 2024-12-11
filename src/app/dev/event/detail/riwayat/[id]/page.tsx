import { Event_DetailRiwayat } from "@/app_modules/event";
import { Event_countTotalPesertaById } from "@/app_modules/event/fun/count/count_total_peserta_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let eventId = params.id;
  const totalPeserta = await Event_countTotalPesertaById(eventId);

  return (
    <>
      <Event_DetailRiwayat
        totalPeserta={totalPeserta as any}
        eventId={eventId}
      />
    </>
  );
}
