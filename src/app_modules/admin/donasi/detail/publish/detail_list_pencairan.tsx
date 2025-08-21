import { AccentColor } from "@/app_modules/_global/color";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentAdminGlobal_TitlePage } from "@/app_modules/admin/_admin_global/_component";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import { MODEL_DONASI_PENCAIRAN_DANA } from "@/app_modules/donasi/model/interface";
import { RouterAdminDonasi } from "@/lib/router_admin/router_admin_donasi";
import {
  Box,
  Button,
  Center,
  Paper,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { apiGetAdminDonasiPencairan } from "../../lib/api_fetch_admin_donasi";
import { Admin_V3_ComponentPaginationBreakpoint } from "@/app_modules/admin/_components_v3/comp_pagination_breakpoint";

function TampilanListPencairan() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<MODEL_DONASI_PENCAIRAN_DANA[] | null>(null);
  const [nPage, setNPage] = useState<number>(1);
  const [activePage, setActivePage] = useState<number>(1);
  const [loading, setLoading] = useState("");

  useShallowEffect(() => {
    onLoadData();
  }, [activePage]);

  async function onLoadData() {
    try {
      const response = await apiGetAdminDonasiPencairan({
        id: params.id,
        page: `${activePage}`,
      });

      if (response?.success && response?.data) {
        // console.log("response", response.data);
        setData(response.data.data);
        setNPage(response.data.nPage);
      } else {
        setData([]);
        setNPage(1);
      }
    } catch (error) {
      console.error("Error get pencairan donasi:", error);
      setData([]);
      setNPage(1);
    }
  }

  const onPageClick = (page: number) => {
    setActivePage(page);
  };

  const rowTable = () => {
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

    return data.map((e) => (
      <tr key={e.id}>
        <td>
          <Center c={AdminColor.white} w={150}>
            <TampilanRupiahDonasi nominal={e.nominalCair} />
          </Center>
        </td>
        <td>
          <Center c={AdminColor.white} w={150}>
            {moment(e.createdAt).format("ll")}
          </Center>
        </td>
        <td>
          <Box w={200}>
            <Spoiler
              c={AdminColor.white}
              hideLabel="Sembunyikan"
              maxHeight={70}
              showLabel="Lihat"
            >
              {e.title}
            </Spoiler>
          </Box>
        </td>
        <td>
          <Box w={400}>
            <Spoiler
              c={AdminColor.white}
              hideLabel="Sembunyikan"
              maxHeight={70}
              showLabel="Lihat"
            >
              {e.deskripsi}
            </Spoiler>
          </Box>
        </td>
        <td>
          <Center>
            <Button
              loaderPosition="center"
              loading={loading === e.id}
              radius={"xl"}
              bg={"green"}
              color="green"
              onClick={() => {
                setLoading(e.id);
                router.push(
                  RouterAdminDonasi.transfer_invoice_reimbursement + e.imageId
                );
              }}
            >
              Cek
            </Button>
          </Center>
        </td>
      </tr>
    ));
  };

  if (!data) return <CustomSkeleton height={400} />;

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <ComponentAdminGlobal_TitlePage
          name="Rincian Pencairan Dana"
          color={AdminColor.softBlue}
          // component={
          //   <Group>
          //     <ActionIcon
          //       size={"lg"}
          //       radius={"xl"}
          //       variant="light"
          //       onClick={() => {
          //         // onRelaod();
          //       }}
          //     >
          //       <IconReload />
          //     </ActionIcon>
          //     {/* <Select
          //     placeholder="Pilih status"
          //     value={isSelect}
          //     data={listMasterStatus.map((e) => ({
          //       value: e.id,
          //       label: e.name,
          //     }))}
          //     onChange={(val) => {
          //       onSelect(val);
          //     }}
          //   /> */}
          //   </Group>
          // }
        />

        <Paper p={"md"} bg={AdminColor.softBlue} shadow="lg" h={"80vh"}>
          <ScrollArea w={"100%"} h={"90%"}>
            <Table verticalSpacing={"xl"} horizontalSpacing={"md"} p={"md"}>
              <thead>
                <tr>
                  <th>
                    <Center c={AccentColor.white}>Nominal</Center>
                  </th>
                  <th>
                    <Center c={AccentColor.white}>Tanggal</Center>
                  </th>
                  <th>
                    <Text c={AccentColor.white}>Judul</Text>
                  </th>
                  <th style={{ color: AccentColor.white }}>Deskripsi</th>
                  <th>
                    <Center c={AccentColor.white}>Bukti Transfer</Center>
                  </th>
                </tr>
              </thead>
              <tbody>{rowTable()}</tbody>
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
      </Stack>
    </>
  );
}

export default TampilanListPencairan;
