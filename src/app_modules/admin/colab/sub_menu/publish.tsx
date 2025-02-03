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
  Pagination,
  Button,
  Modal,
  TextInput,
  Textarea,
  Box,
} from "@mantine/core";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { MODEL_COLLABORATION } from "@/app_modules/colab/model/interface";
import { useState } from "react";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import adminColab_getListAllPublish from "../fun/get/get_list_all_publish";
import ComponentAdminColab_DetailData from "../component/detail_data";
import adminColab_getOneByColabId from "../fun/get/get_one_by_colab_id";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import _ from "lodash";
import { IconBan, IconCheck, IconEye } from "@tabler/icons-react";
import adminColab_funReportProjectById from "../fun/edit/fun_report_project_by_id";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";

export default function AdminColab_TablePublish({
  listData,
}: {
  listData: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Project Collaboration" />
        <TableMenu listData={listData} />
        {/* <pre>{JSON.stringify(listData.nPage, null, 2)}</pre> */}
      </Stack>
    </>
  );
}
function TableMenu({ listData }: { listData: any }) {
  const [data, setData] = useState<MODEL_COLLABORATION[]>(listData.data);
  const [isNPage, setNPage] = useState(listData.nPage);
  const [activePage, setActivePage] = useState(1);

  const [idProject, setIdProject] = useState("");
  const [openDetail, setOpenDetail] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailData, setDetailData] = useState<MODEL_COLLABORATION>();

  const [openReject, setOpenReject] = useState(false);
  const [report, setReport] = useState("");
  const [loadingReject, setLoadingReject] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  // PAGINATION dan No awal  data di tampilkan
  let noAwal = activePage * 5 - 4;
  async function onLoad(pindahPage: any) {
    const load = await adminColab_getListAllPublish({ page: pindahPage });
    setActivePage(pindahPage);
    setData(load.data as any);
    setNPage(load.nPage);
  }

  // Table Body
  const tableRow = data.map((e, i) => (
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
          <Stack>
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
          </Stack>
        </Center>
      </td>
    </tr>
  ));

  // Menampilkan Detail Data
  async function getDetailData(colabId: any) {
    setLoadingDetail(true);
    setIdProject(colabId);

    await adminColab_getOneByColabId({ id: colabId }).then((res) => {
      if (res.status === 200) {
        setDetailData(res.data as any);
        setOpenDetail(true);
        setLoadingDetail(false);
      } else {
        ComponentGlobal_NotifikasiPeringatan("Gagal Load");
      }
    });
  }

  // Menampilkan Data Title yang akan di REJECT
  async function onRejected(colabId: string) {
    setLoadingReject(true);
    setIdProject(colabId);

    await adminColab_getOneByColabId({ id: colabId }).then((res) => {
      if (res.status === 200) {
        const selectedData = _.omit(res.data, [
          "Author",
          "ProjectCollaborationMaster_Industri",
          "ProjectCollaboration_Partisipasi",
          "benefit",
          "createdAt",
          "purpose",
          "lokasi",
        ]);

        setDetailData(selectedData as any);
        setOpenReject(true);
        setLoadingReject(false);
      } else {
        ComponentGlobal_NotifikasiPeringatan("Gagal Load");
      }
    });
  }

  // Update status report pada project
  async function onReport() {
    if (report === "")
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Alasan Report");

    await adminColab_funReportProjectById({
      colabId: idProject,
      report: report,
    }).then(async (res) => {
      if (res.status === 200) {
        const newData = await adminColab_getListAllPublish({
          page: activePage,
        });

        setActivePage(activePage);
        setData(newData.data as any);
        setNPage(newData.nPage);
        setOpenReject(false);
        ComponentGlobal_NotifikasiBerhasil(res.message);
      } else {
        ComponentGlobal_NotifikasiPeringatan(res.message);
      }
    });
  }

  return (
    <>
      <Stack spacing={"xs"}>
        <Group
          position="apart"
          bg={AdminColor.softBlue}
          p={"xs"}
          style={{ borderRadius: "6px" }}
          c={AdminColor.white}
        >
          <Title order={4}>Publish</Title>
        </Group>
        <Paper p={"md"} bg={AdminColor.softBlue} >
          <Stack>
            <ScrollArea h={"65vh"}>
              <Table
                verticalSpacing={"xs"}
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
                      <Center c={AdminColor.white}>Aksi</Center>
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

      {/* Detail Data */}
      <Modal
        opened={openDetail}
        onClose={() => setOpenDetail(false)}
        centered
        withCloseButton={false}
        size={"lg"}
      >
        <Paper p={"md"} bg={"gray.1"}>
          <ComponentAdminColab_DetailData data={detailData as any} />
        </Paper>
      </Modal>

      {/* Reject Project */}
      <Modal
        opened={openReject}
        onClose={() => setOpenReject(false)}
        centered
        withCloseButton={false}
        size={"lg"}
      >
        <Paper p={"md"}>
          <Stack>
            <Text>
              Apakah anda yakin ingin mereport project{" "}
              <Text span inherit fw={"bold"}>
                {detailData?.title}
              </Text>
              ?
            </Text>{" "}
            <Textarea
              minRows={2}
              placeholder="Ketik alasan report.."
              onChange={(val) => setReport(val.currentTarget.value)}
            />
            <Group position="right">
              <Button
                leftIcon={<IconCheck />}
                radius={"xl"}
                onClick={() => onReport()}
              >
                Simpan
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Modal>
    </>
  );
}
