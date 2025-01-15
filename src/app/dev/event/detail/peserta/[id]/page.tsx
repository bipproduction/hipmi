import Event_DaftarPeserta from '@/app_modules/event/detail/peserta';
import { Event_countTotalPesertaById } from '@/app_modules/event/fun/count/count_total_peserta_by_id';
import { event_getOneById } from '@/app_modules/event/fun/get/get_one_by_id';
import React from 'react';

export default async function Page() { 
  // const dataEvent = await event_getOneById(eventId);
  // const totalPeserta = await Event_countTotalPesertaById(eventId);

  return (
    <Event_DaftarPeserta />
  )

}
