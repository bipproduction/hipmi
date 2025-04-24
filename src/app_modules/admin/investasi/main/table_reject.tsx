"use client";
import {
  AccentColor,
  AdminColor,
} from "@/app_modules/_global/color/color_pallet";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import { RouterAdminInvestasi } from "@/lib/router_admin/router_admin_investasi";
import { clientLogger } from "@/util/clientLogger";
import {
  Button,
  Center,
  Pagination,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconEyeCheck, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { apiGetAdminInvestasiByStatus } from "../_lib/api_fetch_admin_investasi";
import { Admin_V3_ComponentPaginationBreakpoint } from "../../_components_v3/comp_pagination_breakpoint";

export default function Admin_TableRejectInvestasi() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Investasi" />
        <TableView />
      </Stack>
    </>
  );

  // const tableBody = investasi.map((e) =>
  //   e.MasterStatusInvestasi.id === "4" ? (
  //     <tr key={e.id}>
  //       <td>
  //         <Group position="left">
  //           <Avatar variant="outline" radius={"xl"} />
  //           <Text>{e.author.username}</Text>
  //         </Group>
  //       </td>
  //       <td>{_.capitalize(e.title)}</td>
  //       <td>{e.catatan}</td>
  //       <td>
  //         <Center>
  //           <Tooltip label="Konfirmasi" withArrow position="bottom">
  //             <ActionIcon
  //               variant="transparent"
  //               onClick={() =>
  //                 router.push(RouterAdminInvestasi_OLD.konfirmasi + `${e.id}`)
  //               }
  //             >
  //               <IconEdit color="green" />
  //             </ActionIcon>
  //           </Tooltip>
  //         </Center>
  //       </td>
  //     </tr>
  //   ) : (
  //     ""
  //   )
  // );

  // return (
  //   <>
  //     <Stack>
  //       <ActionIcon
  //         variant="outline"
  //         onClick={() => router.push(RouterAdminInvestasi_OLD.main_investasi)}
  //       >
  //         <IconChevronLeft />
  //       </ActionIcon>
  //       <Box>
  //         <ScrollArea w={"100%"}>
  //           <Badge color="red" variant="light" radius={0} size={"xl"}>
  //             Reject
  //           </Badge>
  //           <Table
  //             withBorder
  //             highlightOnHover
  //             verticalSpacing={"md"}
  //             horizontalSpacing={"md"}
  //           >
  //             <thead>
  //               <tr>
  //                 <th>Username</th>
  //                 <th>Nama Proyek Investasi</th>
  //                 <th>Catatan</th>
  //                 <th>
  //                   <Center>Aksi</Center>
  //                 </th>
  //               </tr>
  //             </thead>
  //             <tbody>{tableBody}</tbody>
  //           </Table>
  //         </ScrollArea>
  //       </Box>
  //     </Stack>
  //   </>
  // );
}

function TableView() {
  const router = useRouter();
  const [data, setData] = useState<MODEL_INVESTASI[] | null>(null);
  const [nPage, setNPage] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [idData, setIdData] = useState("");

  useShallowEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await apiGetAdminInvestasiByStatus({
          name: "Reject",
          page: `${activePage}`,
          search: isSearch,
        });

        if (response?.success && response?.data.data) {
          setData(response.data.data);
          setNPage(response.data.nPage || 1);
        } else {
          console.error("Invalid data format recieved:", response);
          setData([]);
        }
      } catch (error) {
        clientLogger.error("Error get data reject", error);
        setData([]);
      }
    };
    loadInitialData();
  }, [activePage, isSearch]);
  const onSearch = async (searchTerm: string) => {
    setSearch(searchTerm);
    setActivePage(1);
  };

  async function onPageClick(page: number) {
    setActivePage(page);
  }

  const renderTableBody = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return (
        <tr>
          <td colSpan={12}>
            <Center>
              <Text color="gray">Tidak ada data</Text>
            </Center>
          </td>
        </tr>
      );
    }
    return data.map((e, i) => (
      <tr key={i}>
        <td>
          <Center>
            <Text c={AccentColor.white} lineClamp={1}>
              {e.author.username}
            </Text>
          </Center>
        </td>
        <td>
          <Center>
            <Text c={AccentColor.white} lineClamp={1}>
              {e.title}
            </Text>
          </Center>
        </td>
        <td>
          <Center>
            <Text c={AccentColor.white} lineClamp={1}>
              {e.catatan}
            </Text>
          </Center>
        </td>

        <td>
          <Center>
            <Button
              loading={isLoading && idData === e.id}
              loaderPosition="center"
              color="green"
              leftIcon={<IconEyeCheck size={20} />}
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
  };

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

        {!data ? (
          <CustomSkeleton height={"80vh"} width="100%" />
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
                      <Center c={AccentColor.white}>Username</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Nama Proyek</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Catatan Penolakan</Center>
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
              value={activePage}
              total={nPage}
              onChange={(val) => {
                onPageClick(val);
              }}
            />
          </Paper>
        )}
      </Stack>
    </>
  );
}
