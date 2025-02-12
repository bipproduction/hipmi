"use client";

import { useState } from "react";
import { MODEL_Transaksi_Investasi } from "../_lib/interface";
import { Button, Group, Paper, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";

export default function StatusPesananInvetsatsi({
  dataTransaksi,
}: {
  dataTransaksi: MODEL_Transaksi_Investasi;
}) {
  const router = useRouter();
  const [transaksi, setTransaksi] = useState(dataTransaksi);
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <Stack pb={"lg"}>
        <Paper
          style={{
            padding: "15px",
            backgroundColor: AccentColor.darkblue,
            border: `2px solid ${AccentColor.blue}`,
            borderRadius: "10px",
            color: "white",
          }}
        >
          <Stack>
            <Stack spacing={0}>
              <Text fw={"bold"}>Pemilik Investasi</Text>
              <Text>{transaksi.Investasi.author.username}</Text>
            </Stack>
            <Stack spacing={0}>
              <Text fw={"bold"}>Nomor Telephone</Text>
              <Text>{transaksi.Investasi.author.nomor}</Text>
            </Stack>
            <Stack spacing={0}>
              <Text fw={"bold"}>Nama Proyek Investasi </Text>
              <Text>{transaksi.Investasi.title}</Text>
            </Stack>
          </Stack>
        </Paper>

        <Paper
          style={{
            padding: "15px",
            backgroundColor: AccentColor.darkblue,
            border: `2px solid ${AccentColor.blue}`,
            borderRadius: "10px",
            color: "white",
            marginBottom: "15px",
          }}
        >
          <Stack>
            <Stack spacing={0}>
              <Text fw={"bold"}>Transaksi ID</Text>
              <Text>{transaksi.transaction_id}</Text>
            </Stack>
            <Stack spacing={0}>
              <Text fw={"bold"}>Lembar Terbeli</Text>
              <Text>
                {new Intl.NumberFormat("id-ID").format(+transaksi.quantity)}{" "}
                lembar
              </Text>
            </Stack>
            <Stack spacing={0}>
              <Text fw={"bold"}>Total Transfer</Text>
              <Text>
                Rp.{" "}
                {new Intl.NumberFormat("id-ID", {
                  maximumFractionDigits: 10,
                }).format(+transaksi.gross_amount)}
              </Text>
            </Stack>
            <Stack spacing={0}>
              <Text fw={"bold"}>Tipe Pembayaran</Text>
              <Text>{transaksi.payment_type.replace("_", " ")}</Text>
            </Stack>
            <Stack spacing={0}>
              <Text fw={"bold"}>Nama Bank</Text>
              <Text>{transaksi.namaBank}</Text>
            </Stack>
            <Stack spacing={0}>
              <Text fw={"bold"}>Status Pembayaran</Text>
              <Text>{transaksi.status_message}</Text>
            </Stack>
          </Stack>
        </Paper>
        <Button
          loaderPosition="center"
          loading={isLoading}
          radius={"xl"}
          onClick={() => {
            setLoading(true);
            router.push(RouterInvestasi_OLD.main_transaksi);
          }}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
        >
          Kembali ke List Transaksi
        </Button>
      </Stack>
    </>
  );
}
