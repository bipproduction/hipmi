import { ComponentAdminGlobal_TampilanRupiah, ComponentAdminGlobal_TitlePage } from "@/app_modules/admin/_admin_global/_component";
import {
  MODEL_INVOICE_INVESTASI,
  MODEL_STATUS_INVOICE_INVESTASI,
} from "@/app_modules/investasi/_lib/interface";
import {
  ActionIcon,
  Badge,
  Center,
  Group,
  Pagination,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Table,
  Title,
} from "@mantine/core";
import { IconReload } from "@tabler/icons-react";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AdminInvestasi_ComponentButtonBandingTransaksi,
  AdminInvestasi_ComponentButtonKonfirmasiTransaksi,
  AdminInvestasi_ComponentCekBuktiTransfer,
} from "../../_component";
import { adminInvestasi_funGetAllTransaksiById } from "../../fun";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";

export function AdminInvestasi_ViewDaftarTransaksi({
  dataTransaksi,
  statusTransaksi,
  investasiId,
}: {
  dataTransaksi: any;
  statusTransaksi: MODEL_STATUS_INVOICE_INVESTASI[];
  investasiId: string;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [idData, setIdData] = useState("");
  const [listStatsus, setListStatus] = useState(statusTransaksi);

  const [data, setData] = useState<MODEL_INVOICE_INVESTASI[]>(
    dataTransaksi.data
  );
  const [isNPage, setNPage] = useState(dataTransaksi.nPage);
  const [isActivePage, setActivePage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("");

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminInvestasi_funGetAllTransaksiById({
      investasiId: investasiId,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onSelected(selectStatus: any) {
    setSelectedStatus(selectStatus);
    const loadData = await adminInvestasi_funGetAllTransaksiById({
      investasiId: investasiId,
      page: isActivePage,
      selectStatus: selectStatus,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onReload() {
    const loadData = await adminInvestasi_funGetAllTransaksiById({
      investasiId: investasiId,
      page: 1,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const tableRows = data?.map((e, i) => (
    <tr key={i}>
      <td>
        <Center>{e?.Author.username}</Center>
      </td>
      <td>
        <Center>{e?.MasterBank.namaBank}</Center>
      </td>
      <td>
        <Center>
          <ComponentAdminGlobal_TampilanRupiah nominal={+e?.nominal} />
        </Center>
      </td>
      <td>
        <Center>
          {new Intl.NumberFormat("id-ID", { maximumFractionDigits: 10 }).format(
            +e?.lembarTerbeli
          )}
        </Center>
      </td>
      <td>
        <Center>
          {new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(
            e?.createdAt
          )}
        </Center>
      </td>
      <td>
        <Center>
          <Badge
            w={150}
            variant="light"
            color={
              e.statusInvoiceId === "1"
                ? "green"
                : e.statusInvoiceId === "4"
                  ? "red"
                  : "blue"
            }
          >
            {e?.StatusInvoice?.name}
          </Badge>
        </Center>
      </td>
      <td>
        <Center>
          {e?.statusInvoiceId !== "3" ? (
            <AdminInvestasi_ComponentCekBuktiTransfer imageId={e?.imageId} />
          ) : (
            "-"
          )}
        </Center>
      </td>
      <td>
        <Center>
          {e.statusInvoiceId === "1" && "-"}
          {e.statusInvoiceId === "2" && (
            <AdminInvestasi_ComponentButtonKonfirmasiTransaksi
              invoiceId={e.id}
              investasiId={investasiId}
              lembarTerbeli={e.lembarTerbeli}
              onLoadData={(val) => {
                setData(val.data);
                setNPage(val.nPage);
              }}
            />
          )}
          {e.statusInvoiceId === "3" && "-"}
          {e.statusInvoiceId === "4" && (
            <AdminInvestasi_ComponentButtonBandingTransaksi
              invoiceId={e.id}
              investasiId={investasiId}
              lembarTerbeli={e.lembarTerbeli}
              onLoadData={(val) => {
                setData(val.data);
                setNPage(val.nPage);
              }}
            />
          )}
        </Center>
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <ComponentAdminGlobal_TitlePage
          name="Transkasi"
          color={AdminColor.softBlue}
          component={<Group>
            <ActionIcon
              size={"lg"}
              radius={"xl"}
              variant="light"
              onClick={() => {
                onReload();
              }}
            >
              <IconReload />
            </ActionIcon>
            <Select
              placeholder="Pilih status"
              value={selectedStatus}
              data={
                isEmpty(listStatsus)
                  ? []
                  : listStatsus.map((e) => ({
                      value: e.id,
                      label: e.name,
                    }))
              }
              onChange={(val: any) => {
                onSelected(val);
              }}
            />
          </Group>}
        />
        {/* <Group
          position="apart"
          bg={"gray.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Transaksi</Title>
          <Group>
            <ActionIcon
              size={"lg"}
              radius={"xl"}
              variant="light"
              onClick={() => {
                onReload();
              }}
            >
              <IconReload />
            </ActionIcon>
            <Select
              placeholder="Pilih status"
              value={selectedStatus}
              data={
                isEmpty(listStatsus)
                  ? []
                  : listStatsus.map((e) => ({
                      value: e.id,
                      label: e.name,
                    }))
              }
              onChange={(val: any) => {
                onSelected(val);
              }}
            />
          </Group>
        </Group> */}

        <Paper bg={AdminColor.softBlue} p={"md"} shadow="lg" h={"80vh"}>
          <ScrollArea w={"100%"} h={"90%"}>
            <Table
              verticalSpacing={"xl"}
              horizontalSpacing={"md"}
              p={"md"}
              w={1500}
              striped
              highlightOnHover
            >
              <thead>
                <tr>
                  <th>
                    <Center c={AdminColor.white}>Nama Investor</Center>
                  </th>
                  <th>
                    <Center c={AdminColor.white}>Nama Bank</Center>
                  </th>
                  <th>
                    <Center c={AdminColor.white}>Jumlah Investasi</Center>
                  </th>
                  <th>
                    <Center c={AdminColor.white}>Lembar Terbeli</Center>
                  </th>
                  <th>
                    <Center c={AdminColor.white}>Tanggal</Center>
                  </th>
                  <th>
                    <Center c={AdminColor.white}>Status</Center>
                  </th>
                  <th>
                    <Center c={AdminColor.white}>Bukti Transfer</Center>
                  </th>
                  <th>
                    <Center c={AdminColor.white}>Aksi</Center>
                  </th>
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
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
      </Stack>
    </>
  );
}
