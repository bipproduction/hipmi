import { RouterAdminEvent } from '@/app/lib/router_admin/router_admin_event';
import { AdminColor } from '@/app_modules/_global/color/color_pallet';
import { Button, Center, Pagination, Paper, ScrollArea, Stack, Table, Title } from '@mantine/core';
import { IconDeviceDesktop, IconDownload, IconImageInPicture } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const tableRows = [
  {
    id: 1,
    sponsor: <IconImageInPicture />,
    username: "@NicoArya",
    name: "Nico Arya",
    nomor: "+628123456789",
    email: "nicoarya@gmail.com",

  }
]
function AdminEvent_DetailDataSponsor() {
  const router = useRouter();
  const rows = tableRows.map((row, i) => (
    <tr key={i}>
      <td>
        <Center c={AdminColor.white}>{row.sponsor}</Center>
      </td>
      <td>
        <Center>
          <Button leftIcon={<IconDownload size={20} />} size='xs' style={{ borderColor: "black", color: "black" }} bg={"#e6e6e6"}>Download</Button>
        </Center>
      </td>
      <td>
        <Center c={AdminColor.white}>{row.username}</Center>
      </td>
      <td>
        <Center c={AdminColor.white}>{row.name}</Center>
      </td>
      <td>
        <Center c={AdminColor.white}>{row.nomor}</Center>
      </td>
      <td>
        <Center c={AdminColor.white}>{row.email}</Center>
      </td>
      <td>
        <Center>
          <Button leftIcon={<IconDeviceDesktop size={20} />} onClick={() => router.push(RouterAdminEvent.detail_sponsor)} radius={"xl"} bg={"green"}>Tampilkan</Button>
        </Center>
      </td>
    </tr>
  ))
  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <Paper
          bg={AdminColor.softBlue}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title c={AdminColor.white} order={4}>Daftar Sponsor</Title>
        </Paper>

        <Paper p={"md"} bg={AdminColor.softBlue} shadow='lg' h={"80vh"}>
          <ScrollArea w={"100%"} h={"90%"}>
            <Table
              verticalSpacing={"xl"}
              horizontalSpacing={"md"}
              p={"md"}
              w={1500}
              
            >
              <thead>
                <tr>
                  <th>
                    <Center c={AdminColor.white}>Sponsor</Center>
                  </th>
                  <th>
                    <Center c={AdminColor.white}>Download</Center>
                  </th>
                  <th>
                    <Center c={AdminColor.white}>Username</Center>
                  </th>
                  <th>
                    <Center c={AdminColor.white}>Nama</Center>
                  </th>
                  <th>
                    <Center c={AdminColor.white}>Nomor</Center>
                  </th>
                  <th>
                    <Center c={AdminColor.white}>Email</Center>
                  </th>
                  <th>
                    <Center c={AdminColor.white}>Aksi</Center>
                  </th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </ScrollArea>

          <Center>
            <Pagination
              value={1}
              total={10}
            />
          </Center>
        </Paper>
      </Stack>
    </>
  );
}

export default AdminEvent_DetailDataSponsor;
