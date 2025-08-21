"use client";

import { Button } from "@mantine/core";
import {
  adminInvestasi_funAcceptTransaksiById,
  adminInvestasi_funGetAllTransaksiById,
} from "../../fun";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_gagal";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminInvestasi_ComponentButtonBandingTransaksi({
  invoiceId,
  investasiId,
  lembarTerbeli,
  
}: {
  invoiceId: string;
  investasiId: string;
  lembarTerbeli: string;

}) {
  console.log("Ini invoiceid", invoiceId)
  console.log("Ini investasiid", investasiId)
  console.log("Ini lembar terbeli", lembarTerbeli)
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  async function onAccept() {
    try {
    setLoading(true);
    const res = await adminInvestasi_funAcceptTransaksiById({
      invoiceId,
      investasiId,
      lembarTerbeli,
    });
    if (res.status == 200) {
        router.back();
        ComponentAdminGlobal_NotifikasiBerhasil(res.message);
    } else {
      console.error("reject error", res.message);
      ComponentAdminGlobal_NotifikasiGagal(res.message);
    }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        radius={"xl"}
        color="orange"
        onClick={() => {
          onAccept();
        }}
      >
        Banding Diterima
      </Button>
    </>
  );
}
