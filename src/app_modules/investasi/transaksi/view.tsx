"use client";

import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Box, Group, Paper, Stack, Text, Title } from "@mantine/core";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  MODEL_Transaksi_Investasi,
  Model_Status_Transaksi_Investasi,
} from "../_lib/interface";

export default function TransaksiInvestasi({
  statusTransaksi,
  listTransaksi,
}: {
  statusTransaksi: Model_Status_Transaksi_Investasi[];
  listTransaksi: MODEL_Transaksi_Investasi[];
}) {
  const router = useRouter();
  const [status, setStatus] = useState(statusTransaksi);
  const [transaksi, setTransaksi] = useState(listTransaksi);

  async function onKlik(statusId: string, transaksiId: string) {
    // console.log(id)
    if (statusId === "1") {
      return router.push(RouterInvestasi_OLD.transfer + transaksiId);
    } else {
      if (statusId === "2") {
        return router.push(RouterInvestasi_OLD.transfer);
      } else {
        if (statusId === "3") {
          return router.push(RouterInvestasi_OLD.dialog_transaksi);
        } else {
          return router.push(
            RouterInvestasi_OLD.status_transaksi_gagal + transaksiId
          );
        }
      }
    }
  }

  if (_.isEmpty(transaksi)) return <ComponentGlobal_IsEmptyData text="Tidak ada transaksi" />;

  return (
    <>
      <Stack>
        {transaksi.map((e) => (
          <Box
            key={e.id}
            onClick={() =>
              router.push(RouterInvestasi_OLD.status_pesanan + `${e.id}`)
            }
          >
            <Paper
              style={{
                padding: "15px",
                backgroundColor: AccentColor.darkblue,
                border: `2px solid ${AccentColor.blue}`,
                borderRadius: "10px",
                color: "white",
              }}
            >
              <Group position="apart">
                <Title order={6}>{e.Investasi.title}</Title>
                <Title order={5}>
                  Rp.
                  {new Intl.NumberFormat("id-ID", {
                    maximumFractionDigits: 10,
                  }).format(+e.gross_amount)}
                </Title>
              </Group>
              <Group position="apart">
                <Stack spacing={0}>
                  {/* <Text fz={"xs"}>Bank {e.namaBank}</Text> */}
                  <Text fz={"xs"}>{moment(e.createdAt).format("ll")}</Text>
                </Stack>
                <Text>{e.quantity} Lembar</Text>
              </Group>
            </Paper>
          </Box>
        ))}
      </Stack>
      {/* <pre>{JSON.stringify(transaksi, null, 2)}</pre> */}
    </>
  );
}
