import { AccentColor } from '@/app_modules/_global/color';
import { AdminColor } from '@/app_modules/_global/color/color_pallet';
import { ComponentAdminGlobal_TitlePage } from '@/app_modules/admin/_admin_global/_component';
import TampilanRupiahDonasi from '@/app_modules/donasi/component/tampilan_rupiah';
import { MODEL_DONASI_PENCAIRAN_DANA } from '@/app_modules/donasi/model/interface';
import { RouterAdminDonasi } from '@/lib/router_admin/router_admin_donasi';
import { Center, Box, Spoiler, Button, Stack, Group, ActionIcon, Paper, ScrollArea, Table, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconReload } from '@tabler/icons-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function TampilanListPencairan({
  pencairan,
}: {
  pencairan: MODEL_DONASI_PENCAIRAN_DANA[];
}) {
  const router = useRouter();
  const [data, setData] = useState(pencairan);
  const [opened, { open, close }] = useDisclosure(false);
  const [gambarId, setGambarId] = useState("");

  const rowTable = data.map((e) => (
    <tr key={e.id}>
      <td>
        <Center c={AdminColor.white}>
          <TampilanRupiahDonasi nominal={e.nominalCair} />
        </Center>
      </td>
      <td>
        <Center c={AdminColor.white}>{moment(e.createdAt).format("ll")}</Center>
      </td>
      <td>
        <Center c={AdminColor.white}>
          <Text>{e.title}</Text>
        </Center>
      </td>
      <td width={500}>
        <Box w={"100%"}>
          <Spoiler hideLabel="Sembunyikan" maxHeight={70} showLabel="Lihat">
            {e.deskripsi}
          </Spoiler>
        </Box>
      </td>
      <td>
        <Box>
          <Center>
            <Button
              radius={"xl"}
              bg={"green"}
              color="green"
              onClick={() => {
                // open();
                // setGambarId(e.imagesId);
                router.push(
                  RouterAdminDonasi.transfer_invoice_reimbursement + e?.imagesId
                );
              }}
            >
              Cek
            </Button>
          </Center>
        </Box>
      </td>
    </tr>
  ));

  return (
    <>

      <Stack spacing={"xs"} h={"100%"}>
        <ComponentAdminGlobal_TitlePage
          name="Rincian Pencairan Dana"
          color={AdminColor.softBlue}
          component={
            <Group>
              <ActionIcon
                size={"lg"}
                radius={"xl"}
                variant="light"
                onClick={() => {
                  // onRelaod();
                }}
              >
                <IconReload />
              </ActionIcon>
              {/* <Select
              placeholder="Pilih status"
              value={isSelect}
              data={listMasterStatus.map((e) => ({
                value: e.id,
                label: e.name,
              }))}
              onChange={(val) => {
                onSelect(val);
              }}
            /> */}
            </Group>
          }
        />

        <Paper p={"md"} bg={AdminColor.softBlue} shadow="lg" h={"80vh"}>
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
                    <Center c={AccentColor.white}>Nominal</Center>
                  </th>
                  <th>
                    <Center c={AccentColor.white}>Tanggal</Center>
                  </th>
                  <th>
                    <Center c={AccentColor.white}>Judul</Center>
                  </th>
                  <th style={{ color: AccentColor.white }}>Deskripsi</th>
                  <th>
                    <Center c={AccentColor.white}>Bukti Transfer</Center>
                  </th>
                </tr>
              </thead>
              <tbody>{rowTable}</tbody>
            </Table>
          </ScrollArea>

          {/* <Center mt={"xl"}>
            <Pagination
              value={isActivePage}
              total={isNPage}
              onChange={(val) => {
                onPageClick(val);
              }}
            />
          </Center> */}
        </Paper>
      </Stack>


    </>
  );
}


export default TampilanListPencairan;


