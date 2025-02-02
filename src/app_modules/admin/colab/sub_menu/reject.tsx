"use client";

import {
  Stack,
  Group,
  Title,
  Paper,
  ScrollArea,
  Table,
  Center,
  Text,
  Badge,
  Spoiler,
  Box,
  Pagination,
} from "@mantine/core";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { useState } from "react";
import { MODEL_COLLABORATION } from "@/app_modules/colab/model/interface";
import adminColab_getListAllRejected from "../fun/get/get_list_all_reject";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";

export default function AdminColab_TableRejected({
  listReject,
}: {
  listReject: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Project Collaboration" />
        <TableMenu listReject={listReject} />
      </Stack>
    </>
  );
}
function TableMenu({ listReject }: { listReject: any }) {
  const [data, setData] = useState<MODEL_COLLABORATION[]>(listReject.data);
  const [isNPage, setNPage] = useState(listReject.nPage);
  const [activePage, setActivePage] = useState(1);

  let noAwal = activePage * 5 - 4;
  async function onLoad(pindahPage: any) {
    const load = await adminColab_getListAllRejected({ page: pindahPage });
    setActivePage(pindahPage);
    setData(load.data as any);
    setNPage(load.nPage);
  }

  const tableRow = data?.map((e, i) => (
    <tr key={i}>
      <td>
        <Center c={AdminColor.white}>{noAwal++}</Center>
      </td>
      <td>
        <Center c={AdminColor.white}>
          <Text lineClamp={1}>{e?.Author?.Profile?.name}</Text>
        </Center>
      </td>
      <td>
        <Center c={AdminColor.white}>
          <Box>
            <Center c={AdminColor.white}>
              <Text lineClamp={1}>{e?.title}</Text>
            </Center>
          </Box>
        </Center>
      </td>
      <td>
        <Center c={AdminColor.white}>
          <Text>{e?.ProjectCollaborationMaster_Industri.name}</Text>
        </Center>
      </td>
      <td>
        <Center c={AdminColor.white}>
          <Text>{e?.ProjectCollaboration_Partisipasi.length}</Text>
        </Center>
      </td>
      <td>
        <Center>
          <Box w={400}>
            <Center>
              <Spoiler
                hideLabel={"sembunyikan"}
                maxHeight={50}
                showLabel="tampilkan"
              >
                {e?.report}
              </Spoiler>
            </Center>
          </Box>
        </Center>

        {/* <Stack>
            <Button
              loading={
                idProject === e?.id ? (loadingDetail ? true : false) : false
              }
              leftIcon={<IconEye />}
              loaderPosition="center"
              radius={"xl"}
              color="green"
              onClick={() => {
                getDetailData(e.id);
              }}
            >
              Detail
            </Button>
            <Button
              loading={
                idProject === e?.id ? (loadingReject ? true : false) : false
              }
              leftIcon={<IconBan />}
              loaderPosition="center"
              radius={"xl"}
              color="red"
              onClick={() => {
                onRejected(e.id);
              }}
            >
              Reject
            </Button>
          </Stack> */}
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"}>
        <Group
          position="apart"
          bg={AdminColor.softBlue}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title c={AdminColor.white} order={4}>Reject</Title>
        </Group>
        <Paper p={"md"} bg={AdminColor.softBlue}>
          <Stack>
            <ScrollArea h={"65vh"}>
              <Table
                verticalSpacing={"lg"}
                horizontalSpacing={"md"}
                p={"md"}
                
              >
                <thead>
                  <tr>
                    <th>
                      <Center c={AdminColor.white}>No</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Username</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Title</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Industri</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Jumlah Partisipan</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Report</Center>
                    </th>
                  </tr>
                </thead>
                <tbody>{tableRow}</tbody>
              </Table>
            </ScrollArea>
            <Pagination
              position="center"
              total={isNPage}
              value={activePage}
              onChange={(val) => {
                onLoad(val);
              }}
            />
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
