"use client";
import { Stack } from "@mantine/core";
import ComponentDonasi_CeritaPenggalangMainNew from "../../component/detail_main/cerita_penggalang_new";
import { ComponentDonasi_DetailDataMainNew } from "../../component/detail_main/detail_dana_donasi_new";
import ComponentDonasi_InformasiPenggalangMainNew from "../../component/detail_main/informasi_penggalang_new";

export default function DetailMainDonasiNew() {
   return (
      <>
         <Stack spacing={40} py={"md"}>
            <ComponentDonasi_DetailDataMainNew />
            <ComponentDonasi_InformasiPenggalangMainNew />
            <ComponentDonasi_CeritaPenggalangMainNew />
         </Stack>
      </>
   );
}
