"use client";

import { Button } from "@mantine/core";
import {
  adminInvestasi_funAcceptTransaksiById,
  adminInvestasi_funGetAllTransaksiById,
} from "../../fun";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_gagal";
import { useState } from "react";

export function AdminInvestasi_ComponentButtonBandingTransaksi({
  invoiceId,
  investasiId,
  lembarTerbeli,
  onLoadData,
}: {
  invoiceId: string;
  investasiId: string;
  lembarTerbeli: string;
  onLoadData: (val: any) => void;
}) {
  const [isLoading, setLoading] = useState(false);
  async function onAccept() {
    const res = await adminInvestasi_funAcceptTransaksiById({
      invoiceId,
      investasiId,
      lembarTerbeli,
    });

    // if (res.status == 200) {
    //   try {
    //     const dataTransaksi = await adminInvestasi_funGetAllTransaksiById({
    //       investasiId,
    //       page: 1,
    //     });
    //     onLoadData(dataTransaksi);
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     ComponentAdminGlobal_NotifikasiBerhasil(res.message);
    //     setLoading(true);
    //   }
    // } else {
    //   ComponentAdminGlobal_NotifikasiGagal(res.message);
    // }
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
