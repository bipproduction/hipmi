"use client";

import { RouterAdminInvestasi } from "@/app/lib/router_admin/router_admin_investasi";
import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import {
  Button,
  Center,
  Group,
  Pagination,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconDetails, IconEye, IconEyeCheck, IconInfoCircle, IconSearch } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import ComponentAdminGlobal_IsEmptyData from "../../_admin_global/is_empty_data";
import { adminInvestasi_funGetAllPublish } from "../fun/get/get_all_publish";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { MainColor } from "@/app_modules/_global/color";
import { AccentColor, AdminColor } from "@/app_modules/_global/color/color_pallet";
import { apiGetAdminInvestasiByStatus } from "../_lib/api_fetch_admin_investasi";
import { useShallowEffect } from "@mantine/hooks";
import { clientLogger } from "@/util/clientLogger";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function Admin_TablePublishInvestasi({
  dataInvestsi,
}: {
  dataInvestsi: MODEL_INVESTASI[];
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Investasi" />
        <TableView listData={dataInvestsi} />
        {/* <pre>{JSON.stringify(listPublish, null, 2)}</pre> */}
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
  const [origin, setOrigin] = useState("");

  useShallowEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, [])

  useShallowEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await apiGetAdminInvestasiByStatus({
          status: "Publish",
          page: `${activePage}`,
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

    loadInitialData();
  }, [activePage, isSearch]);
  const onSearch = async (searchTerm: string) => {
    setSearch(searchTerm);
    setActivePage(1);
  }

  const onPageClick = (page: number) => {
    setActivePage(page)
  }

  const renderTableBody = () => {
    if(!Array.isArray(data) || data.length === 0) {
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
    return data.map((e, i) => (
      <tr key={i}>
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
          <Center c={AccentColor.white} w={200}>{_.toNumber(e.progress).toFixed(2)} %</Center>
        </td>
        <td>
          <Center c={AccentColor.white} w={200}>
            {new Intl.NumberFormat("id-ID", {
              maximumFractionDigits: 10,
            }).format(+e.sisaLembar)}
          </Center>
        </td>
        <td>
          <Center c={AccentColor.white} w={200}>
            {new Intl.NumberFormat("id-ID", {
              maximumFractionDigits: 10,
            }).format(+e.totalLembar)}
          </Center>
        </td>
        <td>
          <Center w={200}>
            <Text c={AccentColor.white} lineClamp={1}>{e.Investasi_Invoice.length}</Text>
          </Center>
        </td>
        <td>
          <Center w={200}>
            <Button
              loading={isLoading && idData === e.id}
              loaderPosition="center"
              bg={"green"}
              color="green"
              radius={"xl"}
              leftIcon={<IconEyeCheck size={20} />}
              onClick={() => {
                setIdData(e.id);
                setLoading(true);
                router.push(RouterAdminInvestasi.detail_publish + `${e.id}`);
              }}
            >
              Detail
            </Button>
          </Center>
        </td>
      </tr>
    ));
  }
  

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
              placeholder={"Cari nama proyek"}
              onChange={(val) => {
                onSearch(val.currentTarget.value);
              }}
            />
          }
        />
        {/* <Group
          position="apart"
          bg={"green.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4} c={"black"}>
            Publish
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
          <CustomSkeleton height={"80vh"} width={"100%"} />
        ) : (
          <Paper bg={AdminColor.softBlue} p={"md"} shadow="lg" h={"80vh"}>
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
                      <Center c={AccentColor.white} w={200}>Progres</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white} w={200}>Sisa Saham</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white} w={200}>Total Saham</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white} w={200}>Validasi</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white} w={200}>Aksi</Center>
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTableBody()}</tbody>
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
