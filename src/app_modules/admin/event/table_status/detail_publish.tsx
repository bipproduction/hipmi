'use client'
import { Button, Group, Stack } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { useAtom } from 'jotai';
import Admin_ComponentBackButton from '../../_admin_global/back_button';
import AdminEvent_ComponentDetailPublish from '../_component/comp_detail_publish';
import { gs_admin_event_menu_publish } from '../_lib/global_state';
import { AdminEvent_ViewDetailPeserta } from '../_view';

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
    // {
    //   id: "3",
    //   name: "Daftar Sponsor",
    //   icon: <IconCircleCheck />,
    // }
  ]
  return (
    <>
      <Stack>
        <Admin_ComponentBackButton />

        <Group>
          {listPage.map((e) => (
            <Button
              radius={"xl"}
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
        {selectPage == "1" ? (
          <AdminEvent_ComponentDetailPublish data={{} as any} />
        ) : null}
        {selectPage == "2" ? (
          <AdminEvent_ViewDetailPeserta />
        ) : null}
        {/* {selectPage == "3" ? (
          <AdminEvent_DetailDataSponsor />
        ) : null} */}
      </Stack>
    </>
  );
}

export default AdminEvent_DetailPublish;
