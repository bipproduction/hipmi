import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { Card, Group, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IDataSahamSaya } from "../../_lib/type_investasi";

export function Investasi_ComponentCardDaftarTransaksiNew({ data }: { data: IDataSahamSaya; }) {
   const router = useRouter();

   async function onClick({ invoiceId, statusInvoiceId, }: { invoiceId: string; statusInvoiceId: string; }) {
      // Berhasil
      if (statusInvoiceId === "1") {
         return router.push(NEW_RouterInvestasi.transaksi_berhasil + invoiceId, {
            scroll: false,
         });
      }

      // Proses
      if (statusInvoiceId === "2") {
         return router.push(NEW_RouterInvestasi.proses_transaksi + invoiceId, {
            scroll: false,
         });
      }

      // Menunggu
      if (statusInvoiceId === "3") {
         return router.push(NEW_RouterInvestasi.invoice + invoiceId, {
            scroll: false,
         });
      }

      if (statusInvoiceId === "4") {
         return router.push(NEW_RouterInvestasi.transaksi_gagal + invoiceId, {
            scroll: false,
         });
      }
      ComponentGlobal_NotifikasiPeringatan("Status Belum Tersedia");
   }



   return (
      <>
         <Card
            style={{
               padding: "15px",
               backgroundColor: AccentColor.darkblue,
               border: `2px solid ${AccentColor.blue}`,
               borderRadius: "10px",
               color: "white",
            }}
            mb={"md"}
            onClick={() =>
               onClick({
                  invoiceId: data.id,
                  statusInvoiceId: data.statusInvoiceId,
               })
            }
         >
            <Group position="apart">
               <Text fw={"bold"}>{data.title}</Text>
               <Text fw={"bold"}>
                  Rp.
                  {new Intl.NumberFormat("id-ID", {
                     maximumFractionDigits: 10,
                  }).format(+data.nominal)}
               </Text>
            </Group>
            <Group position="apart">
               <Stack spacing={0}>
                  <Text fz={"xs"} c={"gray"}>
                     {new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(new Date(data.createdAt))}
                  </Text>
               </Stack>
               <Title
                  order={6}
                  c={
                     data.statusInvoiceId === "1"
                        ? "green"
                        : data.statusInvoiceId === "2"
                           ? "blue"
                           : data.statusInvoiceId === "3"
                              ? "orange"
                              : "red"
                  }
               >
                  {data.statusInvoice}
               </Title>
            </Group>
         </Card>
      </>
   );
}
