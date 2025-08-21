"use client";

import { ComponentDonasi_InformasiPencairanDana } from "@/app_modules/donasi/component/card_view/box_informasi_pencarian_dana";
import { ComponentDonasi_BoxPencariranDana } from "@/app_modules/donasi/component/card_view/box_pencairan_dana";
import {
  MODEL_DONASI,
  MODEL_DONASI_PENCAIRAN_DANA,
} from "@/app_modules/donasi/model/interface";
import { Stack } from "@mantine/core";
import { useState } from "react";

export default function PencairanDanaDonasi(
  {
    // donasiId,
    // totalAkumulasi,
    // listPencairan,
  }: {
    // donasiId: string;
    // totalAkumulasi: MODEL_DONASI;
    // listPencairan: MODEL_DONASI_PENCAIRAN_DANA[];
  }
) {
  // const [akumulasi, setAkumulasi] = useState(totalAkumulasi);
  // const [listPD, setListPD] = useState(listPencairan);
  return (
    <>
      <Stack>
        <ComponentDonasi_BoxPencariranDana />
        <ComponentDonasi_InformasiPencairanDana />
      </Stack>
    </>
  );
}
