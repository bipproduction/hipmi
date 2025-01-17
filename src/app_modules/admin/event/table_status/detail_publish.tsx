import { useAtom } from 'jotai';
import React from 'react';
import { gs_admin_event_menu_publish } from '../_lib/global_state';
import { IconCircleCheck } from '@tabler/icons-react';
import { Button, Group, Stack } from '@mantine/core';
import AdminGlobal_ComponentBackButton from '../../_admin_global/back_button';

function AdminEvent_DetailPublish() {
  const [selectPage, setSelectPage] = useAtom(gs_admin_event_menu_publish);
  const listPage = [
    {
      id: "1",
      name: "Detail Event",
      icon: <IconCircleCheck />,
    },
    {
      id: "2",
      name: "Daftar Peserta",
      icon: <IconCircleCheck />,
    },
    {
      id: "3",
      name: "Daftar Sponsor"
    }
  ]
  return (
    <>
      <Stack>
        <AdminGlobal_ComponentBackButton />

        <Group>
          {listPage.map((e) => (
            <Button
              key={e.id}
              color={selectPage == e.id ? "green" : "gray"}
              onClick={() => setSelectPage(e.id)}
              style={{
                transition: "all 0.5s",
              }}
            >
              {e.name}
            </Button>

          ))}
        </Group>
      </Stack>
    </>
  );
}

export default AdminEvent_DetailPublish;
