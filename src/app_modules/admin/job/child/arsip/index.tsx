"use client";

import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import { MODEL_JOB } from "@/app_modules/job/model/interface";
import {
  Box,
  Button,
  Center,
  Modal,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
  Title
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEyeCheck } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminJob_TableArsip({
  dataVote,
}: {
  dataVote?: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Job Vacancy: Table Arsip" />
        <TableStatus listArsip={dataVote} />
      </Stack>
    </>
  );
}

function TableStatus({ listArsip }: { listArsip: MODEL_JOB[] }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState(listArsip);
    const [img, setImg] = useState("");

    const TableRows = data?.map((e, i) => (
      <tr key={i}>
        <td>
          <Spoiler
            w={200}
            maxHeight={50}
            hideLabel="sembunyikan"
            showLabel="tampilkan"
          >
            {e.title}
          </Spoiler>
        </td>
        <td>
          <Center w={150}>
            {e.imageId ? (
              <Button
                color="green"
                radius={"xl"}
                leftIcon={<IconEyeCheck />}
                onClick={() => {
                  setImg(e.imageId);
                  open();
                }}
              >
                Lihat
              </Button>
            ) : (
              <Center w={150}>
                <Text fw={"bold"} fz={"xs"} fs={"italic"}>
                  Tidak ada poster
                </Text>
              </Center>
            )}
          </Center>
        </td>
        <td>
          <Spoiler
            hideLabel="sembunyikan"
            w={400}
            maxHeight={50}
            showLabel="tampilkan"
          >
            <div dangerouslySetInnerHTML={{ __html: e.content }} />
          </Spoiler>
        </td>
        <td>
          <Spoiler
            hideLabel="sembunyikan"
            w={400}
            maxHeight={50}
            showLabel="tampilkan"
          >
            <div dangerouslySetInnerHTML={{ __html: e.deskripsi }} />
          </Spoiler>
        </td>
      </tr>
    ));

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size={"xl"}
        withCloseButton={false}
      >
        {/* <ComponentAdminVote_DetailHasil
          hasil={hasil}
          kontributor={kontributor}
        /> */}
      </Modal>
      <Box>
        <Box bg={"gray.1"} p={"xs"}>
          <Title order={6} c={"gray"}>
            ARSIP
          </Title>
        </Box>
        <ScrollArea w={"100%"}>
          <Table
            withBorder
            verticalSpacing={"md"}
            horizontalSpacing={"xl"}
            p={"md"}
            striped
            highlightOnHover
          >
            <thead>
              <tr>
                <th>
                  <Center>Judul</Center>
                </th>
                <th>
                  <Center>Poster</Center>
                </th>
                <th>
                  <Center>Syarat Ketentuan</Center>
                </th>
                <th>
                  <Center>Deskripsi</Center>
                </th>
              </tr>
            </thead>
            <tbody>{TableRows}</tbody>
          </Table>
        </ScrollArea>
        <Center>
          {_.isEmpty(TableRows) ? (
            <Center h={"50vh"}>
              <Title order={6}>Tidak Ada Data</Title>
            </Center>
          ) : (
            ""
          )}
        </Center>
      </Box>
    </>
  );
}

async function onList(
  voteId: string,
  setHasil: any,
  setKontributor: any,
  setLoading: any,
  open: any
) {
  //   await AdminVote_getHasilById(voteId).then((res) => {
  //     setHasil(res);
  //     setLoading(false);
  //   });

  //   await AdminVote_getListKontributorById(voteId).then((res) => {
  //     setKontributor(res);
  //     setLoading(false);
  //   });

  open();
}
