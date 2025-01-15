import { RouterEvent } from '@/app/lib/router_hipmi/router_event';
import { AccentColor, MainColor } from '@/app_modules/_global/color';
import { ActionIcon, Flex, Paper, Text, Loader } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

function Event_ComponentBoxDaftarPeserta({ eventId }: { eventId?: string }) {
  const params = useParams<{ id: string }>()
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  return (
    <>
      <Paper
        style={{
          padding: "15px",
          backgroundColor: AccentColor.blue,
          border: `2px solid ${AccentColor.softblue}`,
          borderRadius: "10px",
          color: "white",
        }}
        onClick={() => {
          setLoading(true);
          router.push(RouterEvent.daftar_peserta({ id: params.id }), {
            scroll: false,
          });
          // router.push(RouterInvestasi_OLD.detail_dokumen + investasiId, { scroll: false });
        }}
      >
        <Flex direction={"column"} align={"center"} justify={"center"}>
          <Text c={MainColor.white} fz={12}>Daftar Peserta</Text>
          <ActionIcon radius={"xl"} variant="transparent" size={60}>
            {isLoading ? (
              <Loader color="yellow" />
            ) : (
              <IconUser size={70} color={MainColor.white} />
            )}
          </ActionIcon>
        </Flex>
      </Paper>
    </>
  );
}
export default Event_ComponentBoxDaftarPeserta;
