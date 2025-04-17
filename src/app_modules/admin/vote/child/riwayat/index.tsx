"use client";

import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import { MODEL_VOTING } from "@/app_modules/vote/model/interface";
import {
  Center,
  Modal,
  Pagination,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { AccentColor } from "@/app_modules/_global/color";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentAdminGlobal_TitlePage } from "@/app_modules/admin/_admin_global/_component";
import Admin_DetailButton from "@/app_modules/admin/_admin_global/_component/button/detail_button";
import ComponentAdminGlobal_IsEmptyData from "@/app_modules/admin/_admin_global/is_empty_data";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { RouterAdminVote } from "@/lib/router_admin/router_admin_vote";
import { clientLogger } from "@/util/clientLogger";
import _ from "lodash";
import { useState } from "react";
import ComponentAdminVote_DetailHasil from "../../component/detail_hasil";
import { AdminVote_getHasilById } from "../../fun/get/get_hasil_by_id";
import { AdminVote_getListKontributorById } from "../../fun/get/get_list_kontributor_by_id";
import { apiGetAdminVotingRiwayat } from "../../lib/api_fetch_admin_voting";
import { Admin_V3_ComponentPaginationBreakpoint } from "@/app_modules/admin/_components_v3/comp_pagination_breakpoint";

export default function AdminVote_Riwayat() {
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
      const response = await apiGetAdminVotingRiwayat({
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
              <ComponentAdminGlobal_IsEmptyData />
            </Center>
          </td>
        </tr>
      );
    }

    return data.map((e, i) => (
      <tr key={i}>
        {/* <td>
          <Center>
            <Button
              loading={
                e?.id === voteId ? (loading === true ? true : false) : false
              }
              radius={"xl"}
              color="green"
              leftIcon={<IconReportAnalytics />}
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
        </td> */}
        <td>
          <Text w={100} c={AccentColor.white}>
            {e?.Author?.username}
          </Text>
        </td>
        <td>
          <Text w={150} c={AccentColor.white} lineClamp={1}>
            {e?.title}
          </Text>
        </td>
        {/* <td>
          <Center c="white">
            <Spoiler
              hideLabel="sembunyikan"
              maw={400}
              maxHeight={50}
              showLabel="tampilkan"
            >
              {e?.deskripsi}
            </Spoiler>
          </Center>
        </td> */}
        {/* <td>
          <Stack>
            {e?.Voting_DaftarNamaVote.map((v) => (
              <Box key={v?.id}>
                <Text c={AccentColor.white}>- {v?.value}</Text>
              </Box>
            ))}
          </Stack>
        </td> */}

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

        <td>
          <Center>
            <Admin_DetailButton path={RouterAdminVote.detail({ id: e.id })} />
          </Center>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        {/* <pre>{JSON.stringify(listUser, null, 2)}</pre> */}
        <ComponentAdminGlobal_TitlePage
          name="Riwayat"
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
                      <Text c={AccentColor.white}>Username</Text>
                    </th>
                    <th>
                      <Text c={AccentColor.white}>Judul</Text>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Mulai Vote</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Selesai Vote</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Aksi</Center>
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTableBody()}</tbody>
              </Table>
            </ScrollArea>

            <Admin_V3_ComponentPaginationBreakpoint
              value={isActivePage}
              total={isNPage}
              onChange={(val) => {
                onPageClick(val);
              }}
            />
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
