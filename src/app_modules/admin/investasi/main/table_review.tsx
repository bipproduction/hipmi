"use client";
import { gs_adminInvestasi_triggerReview } from "@/app/lib/global_state";
import { RouterAdminInvestasi_OLD } from "@/app/lib/router_hipmi/router_admin";
import { AccentColor } from "@/app_modules/_global/color";
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
import { IconRefresh, IconSearch } from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import ComponentAdminGlobal_IsEmptyData from "../../_admin_global/is_empty_data";
import ComponentAdminGlobal_TampilanRupiahDonasi from "../../_admin_global/tampilan_rupiah";
import { adminInvestasi_funGetAllReview } from "../fun/get/get_all_review";

export default function Admin_TableReviewInvestasi({
  dataInvestsi,
}: {
  dataInvestsi: any[];
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Investasi" />
        <TableView listData={dataInvestsi} />
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

  // Realtime
  const [isAdminInvestasi_TriggerReview, setIsAdminInvestasi_TriggerReview] =
    useAtom(gs_adminInvestasi_triggerReview);
  const [isShowReload, setIsShowReload] = useState(false);
  const [isLoadingReload, setLoadingReload] = useState(false);

  useShallowEffect(() => {
    if (isAdminInvestasi_TriggerReview) {
      setIsShowReload(false);
      setIsAdminInvestasi_TriggerReview(false)
    }
  }, [isAdminInvestasi_TriggerReview]);

  async function onLoadData() {
    const loadData = await adminInvestasi_funGetAllReview({ page: 1 });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
    setLoadingReload(false);
    setIsShowReload(false);
    setIsAdminInvestasi_TriggerReview(false);
  }

  async function onSearch(s: string) {
    setSearch(s);
    setActivePage(1);
    const loadData = await adminInvestasi_funGetAllReview({
      page: 1,
      search: s,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminInvestasi_funGetAllReview({
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
          <Text lineClamp={1}>{e.author.username}</Text>
        </Center>
      </td>
      <td>
        <Center w={400}>
          <Text lineClamp={1}>{e.title}</Text>
        </Center>
      </td>
      <td>
        <Center w={200}>
          <Text lineClamp={1}>{e.roi} %</Text>
        </Center>
      </td>
      <td>
        <Center w={200}>
          <ComponentAdminGlobal_TampilanRupiahDonasi
            nominal={_.toNumber(e.targetDana)}
          />
        </Center>
      </td>
      <td>
        <Center w={200}>
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
            color="orange"
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

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <Group
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
        </Group>

        {_.isEmpty(data) ? (
          <ComponentAdminGlobal_IsEmptyData />
        ) : (
          <Paper p={"md"} withBorder shadow="lg" h={"80vh"}>
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
                striped
                highlightOnHover
              >
                <thead>
                  <tr>
                    <th>
                      <Center w={200}>Username</Center>
                    </th>
                    <th>
                      <Center w={400}>Nama Proyek</Center>
                    </th>
                    <th>
                      <Center w={200}>ROI</Center>
                    </th>
                    <th>
                      <Center w={200}>Target Dana</Center>
                    </th>
                    <th>
                      <Center w={200}>Harga Perlembar</Center>
                    </th>

                    <th>
                      <Center w={200}>Aksi</Center>
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
