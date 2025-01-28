"use client";

import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import { Button, Group, Stack, Tabs } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { useState } from "react";
import AdminGlobal_ComponentBackButton from "../../_admin_global/back_button";
import {
  AdminInvestasi_ViewDaftarInvestor,
  AdminInvestasi_ViewDaftarTransaksi,
  AdminInvestasi_ViewDetailData,
} from "../_view";
import { useAtom } from "jotai";
import { gs_admin_invetasi_menu_publish } from "../_lib/global_state";

export function AdminInvestasi_DetailPublish({
  data,
  dataTransaksi,
  statusTransaksi,
  investasiId,
}: {
  data: MODEL_INVESTASI;
  dataTransaksi: any[];
  statusTransaksi: any[];
  investasiId: string;
}) {
  const [selectPage, setSelectPage] = useAtom(gs_admin_invetasi_menu_publish);
  const listPage = [
    {
      id: "1",
      name: "Detail Data",
      icon: <IconCircleCheck />,
    },
    {
      id: "2",
      name: "Daftar Transaksi",
      icon: <IconCircleCheck />,
    },
    // {
    //   id: "3",
    //   name: "Daftar Investor",
    //   icon: <IconCircleCheck />,
    // },
  ];

  return (
    <>
      <Stack >
        <AdminGlobal_ComponentBackButton />

        <Group>
          {listPage.map((e) => (
            <Button variant="outline"
              key={e.id}
              color={selectPage == e.id ? "green" : "gray"}
              radius={"xl"}
              onClick={() => setSelectPage(e.id)}
              style={{
                transition: "all 0.3s",
              }}
            >
              {e.name}
            </Button>
          ))}
        </Group>

        {selectPage == "1" ? (
          <AdminInvestasi_ViewDetailData data={data} />
        ) : null}
        {selectPage == "2" ? (
          <AdminInvestasi_ViewDaftarTransaksi
            dataTransaksi={dataTransaksi}
            statusTransaksi={statusTransaksi}
            investasiId={investasiId}
          />
        ) : null}
      </Stack>
    </>
  );
}
