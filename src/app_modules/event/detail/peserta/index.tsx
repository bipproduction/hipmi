"use client"

import { Stack } from '@mantine/core';
import ComponentEvent_ListPeserta from '../../component/detail/list_peserta';
import { MODEL_EVENT_PESERTA } from '../../model/interface';
import { useParams } from 'next/navigation';
import ComponentEvent_ListPesertaNew from '../../component/detail/list_peserta_new';

// function Event_DaftarPeserta({ totalPeserta, eventId, isNewPeserta }: {
//   totalPeserta?: number;
//   eventId?: string;
//   isNewPeserta?: boolean | null;
// }) {
  function Event_DaftarPeserta() {
  return (
    <>
      <Stack>
        <ComponentEvent_ListPesertaNew/>
        {/* <ComponentEvent_ListPeserta eventId={params.id} total={totalPeserta as any} isNewPeserta={isNewPeserta} /> */}
      </Stack>
    </>
  );
}

export default Event_DaftarPeserta;
