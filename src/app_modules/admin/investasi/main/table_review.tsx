"use client";
import { gs_adminInvestasi_triggerReview } from "@/lib/global_state";
import { RouterAdminInvestasi_OLD } from "@/lib/router_hipmi/router_admin";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import {
  Affix,
  Button,
  Center,
  Group,
  Pagination,
  Paper,
  rem,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconDetails, IconEyeCheck, IconRefresh, IconSearch } from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import ComponentAdminGlobal_IsEmptyData from "../../_admin_global/is_empty_data";
import ComponentAdminGlobal_TampilanRupiahDonasi from "../../_admin_global/tampilan_rupiah";
import { adminInvestasi_funGetAllReview } from "../fun/get/get_all_review";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { apiGetAdminInvestasiByStatus } from "../_lib/api_fetch_admin_investasi";
import { clientLogger } from "@/util/clientLogger";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function Admin_TableReviewInvestasi() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Investasi" />
        <TableView />
      </Stack>
    </>
  );
}

function TableView() {
  const router = useRouter();
  const [data, setData] = useState<MODEL_INVESTASI[] | null>(null);
  const [nPage, setNPage] = useState<number>(1);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [idData, setIdData] = useState("");

  // Realtime
  const [isAdminInvestasi_TriggerReview, setIsAdminInvestasi_TriggerReview] =
    useAtom(gs_adminInvestasi_triggerReview);
  const [isShowReload, setIsShowReload] = useState(false);
  const [isLoadingReload, setLoadingReload] = useState(false);

  useShallowEffect(() => {
    loadInitialData();
  }, [activePage, isSearch]);
  const loadInitialData = async () => {
    try {
      const response = await apiGetAdminInvestasiByStatus({
        status: "Review",
        page: `${activePage}`,
        search: isSearch,
      });

      if (response?.success && response?.data?.data) {
        setData(response.data.data)
        setNPage(response.data.nPage || 1)
      } else {
        console.error("Invalid data format received:", response);
        setData([]);
      }
    } catch (error) {
      clientLogger.error("Error get data table review", error);
      setData([]);
    }
  }
  const onSearch = async (searchTerm: string) => {
    setSearch(searchTerm);
    setActivePage(1);
  }

  const onPageClick = (page: number) => {
    setActivePage(page);
  }
  async function onLoadData() {
    loadInitialData();
    setLoading(false);
    setIsShowReload(false);
    setIsAdminInvestasi_TriggerReview(false);
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
      )
    }
    return data.map((e, i) => (
      <tr key={i}>
        <td>
          <Center c={AccentColor.white} w={200}>
            <Text lineClamp={1}>{e.author.username}</Text>
          </Center>
        </td>
        <td>
          <Center c={AccentColor.white} w={400}>
            <Text lineClamp={1}>{e.title}</Text>
          </Center>
        </td>
        <td>
          <Center c={AccentColor.white} w={200}>
            <Text lineClamp={1}>{e.roi} %</Text>
          </Center>
        </td>
        <td>
          <Center c={AccentColor.white} w={200}>
            <ComponentAdminGlobal_TampilanRupiahDonasi
              nominal={_.toNumber(e.targetDana)}
            />
          </Center>
        </td>
        <td>
          <Center c={AccentColor.white} w={200}>
            <ComponentAdminGlobal_TampilanRupiahDonasi
              nominal={_.toNumber(e.hargaLembar)}
            />
          </Center>
        </td>
        <td>
          <Center w={200}>
            <Button
              loading={isLoading && idData === e.id}
              loaderPosition="center"
              color="green"
              leftIcon={<IconEyeCheck size={20} />}
              radius={"xl"}
              onClick={() => {
                setIdData(e.id);
                setLoading(true);
                router.push(RouterAdminInvestasi_OLD.konfirmasi + `${e.id}`);
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
          name="Review"
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
          bg={"orange.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4} c={"black"}>
            Review
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
          <Paper p={"md"} bg={AdminColor.softBlue} shadow="lg" h={"80vh"}>
            {isShowReload && (
              <Paper bg={"red"} w={"50%"}>
                <Affix position={{ top: rem(200) }} w={"100%"}>
                  <Center>
                    <Button
                      style={{
                        transition: "0.5s",
                        border: `1px solid ${AccentColor.skyblue}`,
                      }}
                      bg={AccentColor.blue}
                      loaderPosition="center"
                      loading={isLoadingReload}
                      radius={"xl"}
                      opacity={0.8}
                      onClick={() => onLoadData()}
                      leftIcon={<IconRefresh />}
                    >
                      Update Data
                    </Button>
                  </Center>
                </Affix>
              </Paper>
            )}

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
                      <Center c={AccentColor.white} w={200}>ROI</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white} w={200}>Target Dana</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white} w={200}>Harga Perlembar</Center>
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
