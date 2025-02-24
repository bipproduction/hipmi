"use client";

import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import { MODEL_VOTING } from "@/app_modules/vote/model/interface";
import {
  Box,
  Button,
  Center,
  Group,
  Modal,
  Pagination,
  Paper,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import {
  IconCircleCheckFilled,
  IconEyeCheck,
  IconSearch,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentAdminVote_DetailHasil from "../../component/detail_hasil";
import { AdminVote_getHasilById } from "../../fun/get/get_hasil_by_id";
import { AdminVote_getListKontributorById } from "../../fun/get/get_list_kontributor_by_id";
import { adminVote_funGetListPublish } from "../../fun/get/status/get_list_publish";
import { ComponentAdminGlobal_TitlePage } from "@/app_modules/admin/_admin_global/_component";
import { MainColor } from "@/app_modules/_global/color";
import {
  AccentColor,
  AdminColor,
} from "@/app_modules/_global/color/color_pallet";
import { clientLogger } from "@/util/clientLogger";
import { apiGetAdminVotingByStatus } from "../../lib/api_fetch_admin_voting";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import _ from "lodash";
import ComponentAdminGlobal_IsEmptyData from "@/app_modules/admin/_admin_global/is_empty_data";

export default function AdminVote_TablePublish() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Voting" />
        <TableStatus />
      </Stack>
    </>
  );
}

function TableStatus() {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [hasil, setHasil] = useState<any[]>();
  const [kontributor, setKontributor] = useState<any[]>();
  const [voteId, setVoteId] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<MODEL_VOTING[] | null>(null);
  const [isNPage, setNPage] = useState(1);
  const [isActivePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  useShallowEffect(() => {
    handleLoadData();
  }, [isActivePage, isSearch]);

  const handleLoadData = async () => {
    try {
      const response = await apiGetAdminVotingByStatus({
        name: "Publish",
        page: `${isActivePage}`,
        search: isSearch,
      });

      if (response?.success && response?.data?.data) {
        setData(response.data.data);
        setNPage(response.data.nPage || 1);
      } else {
        console.error("Invalid data format received:", response);
        setData([]);
      }
    } catch (error) {
      clientLogger.error("Error get data table publish", error);
      setData([]);
    }
  };

  async function onSearch(s: string) {
    setSearch(s);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
  }

  const renderTableBody = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return (
        <tr>
          <td colSpan={12}>
            <Center>
              <Text color={"gray"}>Tidak ada data</Text>
            </Center>
          </td>
        </tr>
      );
    }

    return data?.map((e, i) => (
      <tr key={i}>
        <td>
          <Center>
            <Button
              loading={
                e?.id === voteId ? (loading === true ? true : false) : false
              }
              radius={"xl"}
              color="green"
              leftIcon={<IconCircleCheckFilled />}
              onClick={async () => {
                setVoteId(e?.id);
                setLoading(true);
                await new Promise((r) => setTimeout(r, 500));
                onList(e?.id, setHasil, setKontributor, setLoading, open);
              }}
            >
              Lihat Hasil
            </Button>
          </Center>
        </td>
        <td>
          <Center c={AccentColor.white}>{e?.Author?.username}</Center>
        </td>
        <td>
          <Center c={AccentColor.white}>{e?.title}</Center>
        </td>
        <td>
          <Center c={"white"}>
            <Spoiler
              hideLabel="sembunyikan"
              maw={400}
              maxHeight={50}
              showLabel="tampilkan"
            >
              {e?.deskripsi}
            </Spoiler>
          </Center>
        </td>
        <th>
          <Stack>
            {e?.Voting_DaftarNamaVote.map((v) => (
              <Box key={v?.id}>
                <Text c={AccentColor.white}>- {v?.value}</Text>
              </Box>
            ))}
          </Stack>
        </th>
        <td>
          <Center c={AccentColor.white}>
            {new Intl.DateTimeFormat("id-ID", {
              dateStyle: "long",
            }).format(new Date(e?.awalVote))}
          </Center>
        </td>
        <td>
          <Center c={AccentColor.white}>
            {new Intl.DateTimeFormat("id-ID", {
              dateStyle: "long",
            }).format(new Date(e?.akhirVote))}
          </Center>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <ComponentAdminGlobal_TitlePage
          name="Publish"
          color={AdminColor.softBlue}
          component={
            <TextInput
              icon={<IconSearch size={20} />}
              radius={"xl"}
              placeholder="Masukan judul"
              onChange={(val) => {
                onSearch(val.currentTarget.value);
              }}
            />
          }
        />

        {!data ? (
          <CustomSkeleton height={"80vh"} width="100%" />
        ) : _.isEmpty(data) ? (
          <ComponentAdminGlobal_IsEmptyData />
        ) : (
          <Paper p={"md"} bg={AdminColor.softBlue} shadow="lg" h={"80vh"}>
            <ScrollArea w={"100%"} h={"90%"}>
              <Table
                verticalSpacing={"md"}
                horizontalSpacing={"md"}
                p={"md"}
                w={1500}
              >
                <thead>
                  <tr>
                    <th>
                      <Center c={AccentColor.white}>Aksi</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Username</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Judul</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Deskripsi</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Pilihan</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Mulai Vote</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Selesai Vote</Center>
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTableBody()}</tbody>
              </Table>
            </ScrollArea>

            <Center mt={"xl"}>
              <Pagination
                value={isActivePage}
                total={isNPage}
                onChange={(val) => {
                  onPageClick(val);
                }}
              />
            </Center>
          </Paper>
        )}
      </Stack>

      <Modal
        opened={opened}
        onClose={close}
        size={"xl"}
        withCloseButton={false}
      >
        <ComponentAdminVote_DetailHasil
          hasil={hasil}
          kontributor={kontributor}
        />
      </Modal>
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
  await AdminVote_getHasilById(voteId).then((res) => {
    setHasil(res);
    setLoading(false);
  });

  await AdminVote_getListKontributorById(voteId).then((res) => {
    setKontributor(res);
    setLoading(false);
  });

  open();
}
