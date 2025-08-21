// import { ComponentAdminGlobal_TampilanRupiah, ComponentAdminGlobal_TitlePage } from "@/app_modules/admin/_admin_global/_component";
// import {
//   MODEL_INVOICE_INVESTASI,
//   MODEL_STATUS_INVOICE_INVESTASI,
// } from "@/app_modules/investasi/_lib/interface";
// import {
//   ActionIcon,
//   Badge,
//   Center,
//   Group,
//   Pagination,
//   Paper,
//   ScrollArea,
//   Select,
//   Stack,
//   Table,
//   Text,
//   Title,
// } from "@mantine/core";
// import { IconReload } from "@tabler/icons-react";
// import { isEmpty } from "lodash";
// import { useParams, useRouter } from "next/navigation";
// import { useState } from "react";
// import {
//   AdminInvestasi_ComponentButtonBandingTransaksi,
//   AdminInvestasi_ComponentButtonKonfirmasiTransaksi,
//   AdminInvestasi_ComponentCekBuktiTransfer,
// } from "../../_component";
// import { adminInvestasi_funGetAllTransaksiById } from "../../fun";
// import { AdminColor } from "@/app_modules/_global/color/color_pallet";
// import { useShallowEffect } from "@mantine/hooks";
// import { apiGetAdminAllTransaksiById, apiGetAdminStatusTransaksi } from "../../_lib/api_fetch_admin_investasi";
// import { clientLogger } from "@/util/clientLogger";
// import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
// import { apiGetMasterStatusTransaksi } from "@/app_modules/_global/lib/api_fetch_master";

// export function AdminInvestasi_ViewDaftarTransaksi() {
//   const params = useParams<{ id: string }>();
//   const investasiId = params.id;
//   const router = useRouter();
//   const [isLoading, setLoading] = useState(false);
//   const [idData, setIdData] = useState("");
//   const [listStatus, setListStatus] = useState<MODEL_STATUS_INVOICE_INVESTASI[] | null>(null);

//   const [data, setData] = useState<MODEL_INVOICE_INVESTASI[] | null>(null);
//   const [isNPage, setNPage] = useState<number>(1);
//   const [isActivePage, setActivePage] = useState(1);
//   const [selectedStatus, setSelectedStatus] = useState("");

//   useShallowEffect(() => {
//     loadInitialData();
//   }, [isActivePage, selectedStatus])

//   useShallowEffect(() => {
//     loadStatus();
//   }, [])

//   const loadInitialData = async () => {
//     try {
//       const response = await apiGetAdminAllTransaksiById({
//         id: investasiId,
//         page: `${isNPage}`,
//         status: selectedStatus,
//       })

//       if (response?.success && response?.data?.data) {
//         setData(response.data.data);
//         setNPage(response.nPage || 1);
//         setListStatus(response.data.data);
//       } else {
//         console.error("Invalid data format received:", response);
//         setData([]);
//       }
//     } catch (error) {
//       clientLogger.error("Error get data daftar tramnsaksi", error);
//       setData([]);
//     }
//   }

//   const loadStatus = async () => {
//     try {
//       const response = await apiGetMasterStatusTransaksi()

//       if (response?.success && response?.data) {
//         setListStatus(response.data);
//         console.log("status", response.data)
//       } else {
//         console.error("Invalid data format received:", response);
//         setListStatus(null);
//       }
//     } catch (error) {
//       clientLogger.error("Error get status transaksi", error);
//       setListStatus(null);
//     }
//   }

//   const onPageClick = async (page: number) => {
//    const loadData = await apiGetAdminAllTransaksiById({
//      id: investasiId,
//      page: `${isNPage}`
//     })
//     setActivePage(page);
//     setData(loadData.data as any);
//     setNPage(loadData.nPage);

//   }

//   async function onSelected(selectStatus: any) {
//     setSelectedStatus(selectStatus);
//     // const loadData = await apiGetAdminStatusTransaksi();
//     // setData(loadData.data as any);
//     // setNPage(loadData.nPage);
//   }

//   async function onReload() {
//     const loadData = await apiGetAdminAllTransaksiById({
//       id: investasiId,
//       page: '1'
//     });
//     setData(loadData.data as any);
//     setNPage(loadData.nPage);
//   }

//   const renderTableBody = () => {
//     if (!Array.isArray(data) || data.length === 0) {
//       return (
//         <tr>
//           <td colSpan={12}>
//             <Center>
//               <Text color="gray">Tidak ada data</Text>
//             </Center>
//           </td>
//         </tr>
//       );
//     }
//     return data?.map((e, i) => (
//       <tr key={i}>
//         <td>
//           <Center c={AdminColor.white}>{e?.Author?.username}</Center>
//         </td>
//         <td>
//           <Center c={AdminColor.white}>{e?.MasterBank?.namaBank}</Center>
//         </td>
//         <td>
//           <Center c={AdminColor.white}>
//             <ComponentAdminGlobal_TampilanRupiah nominal={+e?.nominal} />
//           </Center>
//         </td>
//         <td>
//           <Center c={AdminColor.white}>
//             {new Intl.NumberFormat("id-ID", { maximumFractionDigits: 10 }).format(
//               +e?.lembarTerbeli
//             )}
//           </Center>
//         </td>
//         <td>
//           <Center c={AdminColor.white}>
//             {new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(new Date(e?.createdAt))}
//           </Center>
//         </td>
//         <td>
//           <Center>
//             <Badge
//               w={150}
//               variant="light"
//               color={
//                 e.statusInvoiceId === "1"
//                   ? "green"
//                   : e.statusInvoiceId === "4"
//                     ? "red"
//                     : "blue"
//               }
//             >
//               {e?.StatusInvoice?.name}
//             </Badge>
//           </Center>
//         </td>
//         <td>
//           <Center>
//             {e?.statusInvoiceId !== "3" ? (
//               <AdminInvestasi_ComponentCekBuktiTransfer imageId={e?.imageId} />
//             ) : (
//               "-"
//             )}
//           </Center>
//         </td>
//         <td>
//           <Center>
//             {e.statusInvoiceId === "1" && "-"}
//             {e.statusInvoiceId === "2" && (
//               <AdminInvestasi_ComponentButtonKonfirmasiTransaksi
//                 invoiceId={e.id}
//                 investasiId={investasiId}
//                 lembarTerbeli={e.lembarTerbeli}
//                 onLoadData={(val) => {
//                   setData(val.data);
//                   setNPage(val.nPage);
//                 }}
//               />
//             )}
//             {e.statusInvoiceId === "3" && "-"}
//             {e.statusInvoiceId === "4" && (
//               <AdminInvestasi_ComponentButtonBandingTransaksi

//                 invoiceId={e.id}
//                 investasiId={investasiId}
//                 lembarTerbeli={e.lembarTerbeli}
//                 onLoadData={(val) => {
//                   setData(val.data);
//                   setNPage(val.nPage);
//                 }}
//               />
//             )}
//           </Center>
//         </td>
//       </tr>
//     ));
//   }

//   return (
//     <>
//       <Stack spacing={"xs"} h={"100%"}>
//         <ComponentAdminGlobal_TitlePage
//           name="Transkasi"
//           color={AdminColor.softBlue}
//           component={<Group>
//             <ActionIcon
//               size={"lg"}
//               radius={"xl"}
//               variant="light"
//               onClick={() => {
//                 onReload();
//               }}
//             >
//               <IconReload />
//             </ActionIcon>
//             <Select
//               placeholder="Pilih status"
//               value={selectedStatus}
//               data={listStatus?.map(status => ({
//                 value: status.id,
//                 label: status.name,

//               })) || []}
//               onChange={(val: any) => {
//                 console.log(val)
//                 onSelected(val);
//               }}
//             />
//           </Group>}
//         />
//         {/* <Group
//           position="apart"
//           bg={"gray.4"}
//           p={"xs"}
//           style={{ borderRadius: "6px" }}
//         >
//           <Title order={4}>Transaksi</Title>
//           <Group>
//             <ActionIcon
//               size={"lg"}
//               radius={"xl"}
//               variant="light"
//               onClick={() => {
//                 onReload();
//               }}
//             >
//               <IconReload />
//             </ActionIcon>
//             <Select
//               placeholder="Pilih status"
//               value={selectedStatus}
//               data={
//                 isEmpty(listStatsus)
//                   ? []
//                   : listStatsus.map((e) => ({
//                       value: e.id,
//                       label: e.name,
//                     }))
//               }
//               onChange={(val: any) => {
//                 onSelected(val);
//               }}
//             />
//           </Group>
//         </Group> */}

//         {!data ? (<CustomSkeleton height={"80vh"} width={"100%"} />) : (
//           <Paper bg={AdminColor.softBlue} p={"md"} shadow="lg" h={"80vh"}>
//             <ScrollArea w={"100%"} h={"90%"}>
//               <Table
//                 verticalSpacing={"xl"}
//                 horizontalSpacing={"md"}
//                 p={"md"}
//                 w={1500}
//               >
//                 <thead>
//                   <tr>
//                     <th>
//                       <Center c={AdminColor.white}>Nama Investor</Center>
//                     </th>
//                     <th>
//                       <Center c={AdminColor.white}>Nama Bank</Center>
//                     </th>
//                     <th>
//                       <Center c={AdminColor.white}>Jumlah Investasi</Center>
//                     </th>
//                     <th>
//                       <Center c={AdminColor.white}>Lembar Terbeli</Center>
//                     </th>
//                     <th>
//                       <Center c={AdminColor.white}>Tanggal</Center>
//                     </th>
//                     <th>
//                       <Center c={AdminColor.white}>Status</Center>
//                     </th>
//                     <th>
//                       <Center c={AdminColor.white}>Bukti Transfer</Center>
//                     </th>
//                     <th>
//                       <Center c={AdminColor.white}>Aksi</Center>
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>{renderTableBody()}</tbody>
//               </Table>
//             </ScrollArea>

//             <Center mt={"xl"}>
//               <Pagination
//                 value={isActivePage}
//                 total={isNPage}
//                 onChange={(val) => {
//                   onPageClick(val);
//                 }}
//               />
//             </Center>
//           </Paper>
//         )}
//       </Stack>
//     </>
//   );
// }

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { apiGetMasterStatusTransaksi } from "@/app_modules/_global/lib/api_fetch_master";
import { globalStatusTransaksi } from "@/app_modules/_global/lib/master_list_app";
import {
  ComponentAdminGlobal_TampilanRupiah,
  ComponentAdminGlobal_TitlePage,
} from "@/app_modules/admin/_admin_global/_component";
import { Admin_V3_ComponentPaginationBreakpoint } from "@/app_modules/admin/_components_v3/comp_pagination_breakpoint";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import {
  MODEL_INVOICE_INVESTASI,
  MODEL_STATUS_INVOICE_INVESTASI,
} from "@/app_modules/investasi/_lib/interface";
import { RouterAdminInvestasi } from "@/lib/router_admin/router_admin_investasi";
import { clientLogger } from "@/util/clientLogger";
import {
  ActionIcon,
  Badge,
  Button,
  Center,
  Group,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Table,
  Text
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconEyeCheck, IconReload } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AdminInvestasi_ComponentCekBuktiTransfer } from "../../_component/new_button/button_cek_bukti_transfer";
import { apiGetAdminAllTransaksiById } from "../../_lib/api_fetch_admin_investasi";

export function AdminInvestasi_ViewDaftarTransaksi() {
  const params = useParams<{ id: string }>();
  const investasiId = params.id;
  const [listStatus, setListStatus] = useState<
    MODEL_STATUS_INVOICE_INVESTASI[] | null
  >(null);

  const [data, setData] = useState<MODEL_INVOICE_INVESTASI[] | null>(null);
  const [isNPage, setNPage] = useState<number>(1);
  const [isActivePage, setActivePage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [idData, setIdData] = useState("");
  const router = useRouter();

  useShallowEffect(() => {
    handleLoadData();
  }, [isActivePage, selectedStatus]);

  useShallowEffect(() => {
    handleLoadStatus();
  }, []);

  const handleLoadData = async () => {
    try {
      const cek = globalStatusTransaksi.find((e) => e.id === selectedStatus);
      const response = await apiGetAdminAllTransaksiById({
        id: investasiId,
        page: `${isActivePage}`,
        status: cek?.name,
      });

      if (response?.success && response?.data?.data) {
        setData(response.data.data);
        setNPage(response.data.nPage || 1);
      } else {
        console.error("Invalid data format received:", response);
        setData([]);
      }
    } catch (error) {
      clientLogger.error("Error get data daftar tramnsaksi", error);
      setData([]);
    }
  };

  const handleLoadStatus = async () => {
    try {
      const response = await apiGetMasterStatusTransaksi();

      if (response?.success && response?.data) {
        setListStatus(response.data);
      } else {
        console.error("Invalid data format received:", response);
        setListStatus(null);
      }
    } catch (error) {
      clientLogger.error("Error get status transaksi", error);
      setListStatus(null);
    }
  };

  const onPageClick = async (page: number) => {
    setActivePage(page);
  };

  async function onSelected(selectStatus: any) {
    setSelectedStatus(selectStatus);
  }

  async function onReload() {
    setSelectedStatus("");
    handleLoadData();
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
    return data?.map((e, i) => (
      <tr key={i}>
        <td>
          <Center c={AdminColor.white}>{e?.Author?.username}</Center>
        </td>
        <td>
          <Center c={AdminColor.white}>
            <ComponentAdminGlobal_TampilanRupiah nominal={+e?.nominal} />
          </Center>
        </td>
        <td>
          <Center c={AdminColor.white}>
            {new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(
              new Date(e?.createdAt)
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
            {/* {e.statusInvoiceId === "1" && "-"}
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
            )} */}
            <Button
              loading={isLoading && idData == e.id}
              loaderPosition="center"
              color="green"
              leftIcon={<IconEyeCheck size={20} />}
              radius={"xl"}
              onClick={() => {
                setIdData(e.id);
                setLoading(true);
                router.push(RouterAdminInvestasi.detail_transaksi + e.id);
              }}
            >
              Detail
            </Button>
          </Center>
        </td>
      </tr>
    ));
  };

  if (!data && !listStatus) return <CustomSkeleton height={"80vh"} />;

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <ComponentAdminGlobal_TitlePage
          name="Transkasi"
          color={AdminColor.softBlue}
          component={
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
                  listStatus?.map((e, i) => ({
                    value: e.id,
                    label: e.name,
                  })) || []
                }
                onChange={(val: any) => {
                  onSelected(val);
                }}
              />
            </Group>
          }
        />

        {!data ? (
          <CustomSkeleton height={"80vh"} width={"100%"} />
        ) : (
          <Paper bg={AdminColor.softBlue} p={"md"} shadow="lg" h={"80vh"}>
            <ScrollArea w={"100%"} h={"90%"}>
              <Table
                verticalSpacing={"xl"}
                horizontalSpacing={"md"}
                p={"md"}
                w={1100}
              >
                <thead>
                  <tr>
                    <th>
                      <Center c={AdminColor.white}>Nama Investor</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Jumlah Investasi</Center>
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
    </>
  );
}
