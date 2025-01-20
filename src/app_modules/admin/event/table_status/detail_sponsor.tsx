'use client'
import { ActionIcon, Badge, Button, Center, Group, Paper, ScrollArea, Select, Stack, Table, Title } from '@mantine/core';
import React from 'react';
import AdminGlobal_ComponentBackButton from '../../_admin_global/back_button';
import { IconImageInPicture, IconReload } from '@tabler/icons-react';

const tableRows = [
  {
    id: 1,
    donatur: "Keiko",
    bank: "BRI",
    nominal: "Rp. 100.000",
    tanggal: "Kamis, 16 Januari 2025",

  }
]
function AdminEvent_DetailSponsor() {
  const rows = tableRows.map((row, i) => (
    <tr key={i}>
      <td>
        <Center>{row.donatur}</Center>
      </td>
      <td>
        <Center>{row.bank}</Center>
      </td>
      <td>
        <Center>{row.nominal}</Center>
      </td>
      <td>
        <Center>{row.tanggal}</Center>
      </td>
      <td>
        <Center>
          <Badge w={150}  variant='dot'>Berhasil</Badge>
        </Center>
      </td>
      <td>
        <Center>
          <Button radius={"xl"} bg={"blue"}>Cek</Button>
        </Center>
      </td>
      <td>
        <Center>
          <Button radius={"xl"} bg={"green"}>Cek</Button>
        </Center>
      </td>
      <td>
        <Center>
          <Button radius={"xl"} style={{ color: "green" }} bg={"white"}>Terima</Button>
        </Center>
      </td>
    </tr>
  ))
  return (
    <>
      <Stack>
        <AdminGlobal_ComponentBackButton />
        <Stack spacing={"xs"} h={"100%"}>
          <Group
            position='apart'
            bg={"gray.4"}
            p={"xs"}
            style={{ borderRadius: "6px" }}
          >
            <Title order={4}>Detail Sponsor</Title>
            <Group>
              <ActionIcon
                size={"lg"}
                radius={"xl"}
                variant='light'
              >
                <IconReload />
              </ActionIcon>
              <Select
                placeholder='Pilih Status'
                data={["Berhasil", "Proses", "Menunggu", "Gagal"]} />
            </Group>
          </Group>

          <Paper p={"md"} withBorder shadow="lg" h={"80vh"}>
            <ScrollArea w={"100%"} h={"90%"}>
              <Table
                verticalSpacing={"xl"}
                horizontalSpacing={"md"}
                p={"md"}
                w={1500}
                striped
                highlightOnHover
              >
                <thead>
                  <tr>
                    <th>
                      <Center>Nama Sponsor</Center>
                    </th>
                    <th>
                      <Center>Nama Bank</Center>
                    </th>
                    <th>
                      <Center>Nominal Sponsor</Center>
                    </th>
                    <th>
                      <Center>Tanggal</Center>
                    </th>
                    <th>
                      <Center>Status</Center>
                    </th>
                    <th>
                      <Center>Bukti Transfer</Center>
                    </th>
                    <th>
                      <Center>Gambar Sponsor</Center>
                    </th>
                    <th>
                      <Center>Aksi</Center>
                    </th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </ScrollArea>
          </Paper>

        </Stack>
      </Stack>
    </>
  );
}

export default AdminEvent_DetailSponsor;
