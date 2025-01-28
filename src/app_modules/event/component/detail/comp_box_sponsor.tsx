import { RouterEvent } from '@/app/lib/router_hipmi/router_event';
import { AccentColor, MainColor } from '@/app_modules/_global/color';
import { ActionIcon, Flex, Loader, Paper, Text } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

function Event_ComponentBoxDaftarSponsor() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const params = useParams<{ id: string }>();
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
          router.push(RouterEvent.daftar_sponsor({ id: params.id }), {
            scroll: false,
          });
          // router.push(RouterInvestasi_OLD.detail_dokumen + investasiId, { scroll: false });
        }}
      >
        <Flex direction={"column"} align={"center"} justify={"center"}>
          <Text c={MainColor.white} fz={12}>
            Daftar Sponsor
          </Text>
          <ActionIcon radius={"xl"} variant="transparent" size={60}>
            {isLoading ? (
              <Loader color="yellow" />
            ) : (
              <IconStar size={40} color={MainColor.white} />
            )}
          </ActionIcon>
        </Flex>
      </Paper>
    </>
  );
}
export default Event_ComponentBoxDaftarSponsor;
