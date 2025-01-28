'use client'
import { useAtom } from 'jotai';
import React from 'react';
import { gs_admin_event_menu_publish } from '../_lib/global_state';
import { IconCircleCheck } from '@tabler/icons-react';
import { Button, Group, Stack } from '@mantine/core';
import AdminGlobal_ComponentBackButton from '../../_admin_global/back_button';
import { AdminEvent_ViewDetailPeserta } from '../_view';
import AdminEvent_ViewDetailData from '../detail/view_detail_data';
import AdminEvent_DetailDataSponsor from '../_component/detail_data_sponsor';

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
      name: "Daftar Sponsor",
      icon: <IconCircleCheck />,
    }
  ]
  return (
    <>
      <Stack>
        <AdminGlobal_ComponentBackButton />

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
          <AdminEvent_ViewDetailData />
        ) : null}
        {selectPage == "2" ? (
          <AdminEvent_ViewDetailPeserta dataPeserta={{}} eventId={""}/>
        ) : null}
        {selectPage == "3" ? (
          <AdminEvent_DetailDataSponsor />
        ) : null}
      </Stack>
    </>
  );
}

export default AdminEvent_DetailPublish;
