"use client";

import { Button, Group, Stack } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { useAtom } from "jotai";
import Admin_ComponentBackButton from "../../_admin_global/back_button";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { gs_admin_invetasi_menu_publish } from "../_lib/global_state";
import {
  AdminInvestasi_ViewDaftarTransaksi,
  AdminInvestasi_ViewDetailData,
} from "../_view";

export function AdminInvestasi_DetailPublish() {
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
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name={"Investasi: Publish"} />
        <Admin_ComponentBackButton />

        <Group>
          {listPage.map((e) => (
            <Button
              variant="outline"
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

        {selectPage == "1" ? <AdminInvestasi_ViewDetailData /> : null}
        {selectPage == "2" ? <AdminInvestasi_ViewDaftarTransaksi /> : null}
      </Stack>
    </>
  );
}
