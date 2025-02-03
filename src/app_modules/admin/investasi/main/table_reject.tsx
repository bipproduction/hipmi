"use client";
import { RouterAdminInvestasi_OLD } from "@/app/lib/router_hipmi/router_admin";
import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import {
  Badge,
  ActionIcon,
  Box,
  ScrollArea,
  Table,
  Tooltip,
  Stack,
  Center,
  Avatar,
  Group,
  Text,
  Button,
  Pagination,
  Paper,
  TextInput,
  Title,
} from "@mantine/core";
import { IconChevronLeft, IconDetails, IconEdit, IconEyeCheck, IconSearch } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import ComponentAdminGlobal_IsEmptyData from "../../_admin_global/is_empty_data";
import { adminInvestasi_funGetAllReview } from "../fun/get/get_all_review";
import { adminInvestasi_funGetAllReject } from "../fun/get/get_all_reject";
import { RouterAdminInvestasi } from "@/app/lib/router_admin/router_admin_investasi";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { MainColor } from "@/app_modules/_global/color";
import { AccentColor, AdminColor } from "@/app_modules/_global/color/color_pallet";

export default function Admin_TableRejectInvestasi({
  dataInvestsi,
}: {
  dataInvestsi: any[];
}) {
  const [investasi, setInvestasi] = useState(dataInvestsi);
  const router = useRouter();

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Investasi" />
        <TableView listData={dataInvestsi} />
      </Stack>
    </>
  );

  const tableBody = investasi.map((e) =>
    e.MasterStatusInvestasi.id === "4" ? (
      <tr key={e.id}>
        <td>
          <Group position="left">
            <Avatar variant="outline" radius={"xl"} />
            <Text>{e.author.username}</Text>
          </Group>
        </td>
        <td>{_.capitalize(e.title)}</td>
        <td>{e.catatan}</td>
        <td>
          <Center>
            <Tooltip label="Konfirmasi" withArrow position="bottom">
              <ActionIcon
                variant="transparent"
                onClick={() =>
                  router.push(RouterAdminInvestasi_OLD.konfirmasi + `${e.id}`)
                }
              >
                <IconEdit color="green" />
              </ActionIcon>
            </Tooltip>
          </Center>
        </td>
      </tr>
    ) : (
      ""
    )
  );

  return (
    <>
      <Stack>
        <ActionIcon
          variant="outline"
          onClick={() => router.push(RouterAdminInvestasi_OLD.main_investasi)}
        >
          <IconChevronLeft />
        </ActionIcon>
        <Box>
          <ScrollArea w={"100%"}>
            <Badge color="red" variant="light" radius={0} size={"xl"}>
              Reject
            </Badge>
            <Table
              withBorder
              highlightOnHover
              verticalSpacing={"md"}
              horizontalSpacing={"md"}
            >
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Nama Proyek Investasi</th>
                  <th>Catatan</th>
                  <th>
                    <Center>Aksi</Center>
                  </th>
                </tr>
              </thead>
              <tbody>{tableBody}</tbody>
            </Table>
          </ScrollArea>
        </Box>
      </Stack>
    </>
  );
}

function TableView({ listData }: { listData: any }) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_INVESTASI[]>(listData.data);
  const [nPage, setNPage] = useState(listData.nPage);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [idData, setIdData] = useState("");

  async function onSearch(s: string) {
    setSearch(s);
    setActivePage(1);
    const loadData = await adminInvestasi_funGetAllReject({
      page: 1,
      search: s,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminInvestasi_funGetAllReject({
      search: isSearch,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const tableBody = data.map((e) => (
    <tr key={e.id}>
      <td>
        <Center w={200}>
          <Text c={AccentColor.white} lineClamp={1}>{e.author.username}</Text>
        </Center>
      </td>
      <td>
        <Center w={400}>
          <Text c={AccentColor.white} lineClamp={1}>{e.title}</Text>
        </Center>
      </td>
      <td>
        <Center w={400}>
          <Text c={AccentColor.white} lineClamp={1}>{e.catatan}</Text>
        </Center>
      </td>

      <td>
        <Center w={200}>
          <Button
            loading={isLoading && idData === e.id}
            loaderPosition="center"
            color="green"
            leftIcon={<IconEyeCheck size={20}/>}
            radius={"xl"}
            onClick={() => {
              setIdData(e.id);
              setLoading(true);
              router.push(RouterAdminInvestasi.detail_reject + `${e.id}`);
            }}
          >
            Detail
          </Button>
        </Center>
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <ComponentAdminGlobal_TitlePage
          name="Reject"
          color={AdminColor.softBlue}
          component={
            <TextInput
            icon={<IconSearch size={20} />}
            radius={"xl"}
            placeholder="Cari nama proyek"
            onChange={(val) => {
              onSearch(val.currentTarget.value);
            }}
          />
          }
        />
        {/* <Group
          position="apart"
          bg={"red.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4} c={"black"}>
            Reject
          </Title>
          <TextInput
            icon={<IconSearch size={20} />}
            radius={"xl"}
            placeholder="Cari nama proyek"
            onChange={(val) => {
              onSearch(val.currentTarget.value);
            }}
          />
        </Group> */}

        {_.isEmpty(data) ? (
          <ComponentAdminGlobal_IsEmptyData />
        ) : (
          <Paper p={"md"} bg={AdminColor.softBlue} shadow="lg" h={"80vh"}>
            <ScrollArea w={"100%"} h={"90%"} offsetScrollbars>
              <Table
                verticalSpacing={"md"}
                horizontalSpacing={"md"}
                p={"md"}
                w={"100%"}
                h={"100%"}
               
              >
                <thead>
                  <tr>
                    <th>
                      <Center c={AccentColor.white} w={200}>Username</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white} w={400}>Nama Proyek</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white} w={400}>Catatan Penolakan</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white} w={200}>Aksi</Center>
                    </th>
                  </tr>
                </thead>
                <tbody>{tableBody}</tbody>
              </Table>
            </ScrollArea>
            <Center mt={"xl"}>
              <Pagination
                value={activePage}
                total={nPage}
                onChange={(val) => {
                  onPageClick(val);
                }}
              />
            </Center>
          </Paper>
        )}
      </Stack>
    </>
  );
}
