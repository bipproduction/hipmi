"use client";

import { AccentColor } from "@/app_modules/_global/color";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { MODEL_COLLABORATION_ROOM_CHAT } from "@/app_modules/colab/model/interface";
import {
  Box,
  Center,
  Modal,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Title
} from "@mantine/core";
import { IconCircleDot } from "@tabler/icons-react";
import { useState } from "react";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import Admin_DetailButton from "../../_admin_global/_component/button/detail_button";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { Admin_V3_ComponentPaginationBreakpoint } from "../../_components_v3/comp_pagination_breakpoint";
import ComponentAdminColab_DetailData from "../component/detail_data";
import adminColab_getListAllGroupChat from "../fun/get/get_list_all_group_chat";
import adminColab_getOneRoomChatById from "../fun/get/get_one_room_chat_by_id";

export default function AdminColab_TableGroup({
  listGroup,
}: {
  listGroup: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Project Collaboration" />
        <TableMenu listGroup={listGroup} />
      </Stack>
    </>
  );
}
function TableMenu({ listGroup }: { listGroup: any }) {
  const [data, setData] = useState<MODEL_COLLABORATION_ROOM_CHAT[]>(
    listGroup.data
  );
  const [isNPage, setNPage] = useState(listGroup.nPage);
  const [activePage, setActivePage] = useState(1);

  const [idProject, setIdProject] = useState("");
  const [openDetail, setOpenDetail] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailData, setDetailData] = useState<MODEL_COLLABORATION_ROOM_CHAT>();

  // PAGINATION dan No awal  data di tampilkan
  let noAwal = activePage * 5 - 4;
  async function onLoad(pindahPage: any) {
    const load = await adminColab_getListAllGroupChat({ page: pindahPage });
    setActivePage(pindahPage);
    setData(load.data as any);
    setNPage(load.nPage);
  }

  async function onDetailData(roomId: string) {
    setLoadingDetail(true);
    await adminColab_getOneRoomChatById({ roomId: roomId }).then((res) => {
      if (res.status === 200) {
        setIdProject(roomId);
        setLoadingDetail(false);
        setDetailData(res.data as any);
        setOpenDetail(true);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  const tableRow = data.map((e, i) => (
    <tr key={i} style={{ color: AdminColor.white }}>
      {/* <td>
        <Center c={AdminColor.white}>{noAwal++}</Center>
      </td> */}
      <td>
        <Box w={150}>
          <Text lineClamp={1}>
            {e?.ProjectCollaboration?.Author?.Profile?.name}
          </Text>
        </Box>
      </td>
      <td>
        <Box w={150}>
          <Text lineClamp={1}>{e?.name}</Text>
        </Box>
      </td>
      <td>
        <Box w={150}>
          <Text>
            {e?.ProjectCollaboration?.ProjectCollaborationMaster_Industri?.name}
          </Text>
        </Box>
      </td>
      <td>
        <Center>
          <Text>{e?.ProjectCollaboration_AnggotaRoomChat.length}</Text>
        </Center>
      </td>
      <td>
        <Center>
          <Stack>
            <Admin_DetailButton
              path={`/dev/admin/colab/detail/group/${e.id}`}
            />
          </Stack>
        </Center>
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"}>
        <ComponentAdminGlobal_TitlePage
          name="Group Chat"
          color={AdminColor.softBlue}
          component={<></>}
        />
        <Paper p={"md"} bg={AdminColor.softBlue}>
          <Stack>
            <ScrollArea h={"65vh"}>
              <Table verticalSpacing={"xs"} horizontalSpacing={"md"} p={"md"}>
                <thead>
                  <tr>
                    {/* <th>
                      <Center c={AdminColor.white}>No</Center>
                    </th> */}
                    <th>
                      <Text c={AdminColor.white}>Admin Room</Text>
                    </th>
                    <th>
                      <Text c={AdminColor.white}>Nama Group</Text>
                    </th>
                    <th>
                      <Text c={AdminColor.white}>Industri</Text>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Anggota Group</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Aksi</Center>
                    </th>
                  </tr>
                </thead>
                <tbody>{tableRow}</tbody>
              </Table>
            </ScrollArea>
            <Admin_V3_ComponentPaginationBreakpoint
              total={isNPage}
              value={activePage}
              onChange={(val) => {
                onLoad(val);
              }}
            />
          </Stack>
        </Paper>
      </Stack>

      <Modal
        styles={{ body: { backgroundColor: AccentColor.darkblue } }}
        opened={openDetail}
        onClose={() => setOpenDetail(false)}
        centered
        size={"xl"}
        withCloseButton={false}
      >
        <SimpleGrid cols={2}>
          <Paper bg={AdminColor.softBlue} p={"md"} h={500}>
            <ScrollArea h={"100%"} w={"100%"}>
              <ComponentAdminColab_DetailData
                data={detailData?.ProjectCollaboration as any}
              />
            </ScrollArea>
          </Paper>
          <Paper bg={AdminColor.softBlue} p={"md"} h={500}>
            <ScrollArea h={"100%"}>
              <Stack>
                <Center>
                  <Title c={AdminColor.white} order={4}>
                    Anggota
                  </Title>
                </Center>
                <Stack>
                  {detailData?.ProjectCollaboration_AnggotaRoomChat?.map(
                    (e, i) => (
                      <Box key={i}>
                        <Text lineClamp={1}>
                          <IconCircleDot color={AdminColor.white} size={10} />{" "}
                          <Text c={AdminColor.white} span inherit>
                            {e?.User?.Profile?.name}
                          </Text>
                        </Text>
                      </Box>
                    )
                  )}
                </Stack>
              </Stack>
            </ScrollArea>
          </Paper>
        </SimpleGrid>
      </Modal>
    </>
  );
}
