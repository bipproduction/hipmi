"use client";

import {
  AccentColor,
  AdminColor,
} from "@/app_modules/_global/color/color_pallet";
import { Button, Group, Stack } from "@mantine/core";
import { useAtom } from "jotai";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { gs_app_information_menu } from "../lib";
import {
  AdminAppInformation_ViewInfoBank,
  AdminAppInformation_ViewKategoriPortofolio,
} from "../view";

export default function AdminAppInformation_UiMain() {
  const [selectPage, setSelectPage] = useAtom(gs_app_information_menu);
  const listPage = [
    // {
    //   id: "1",
    //   name: "Whatsapp",
    // },
    {
      id: "2",
      name: "Informasi Bank",
    },
    {
      id: "3",
      name: "Bidang Bisnis",
    },
  ];

  return (
    <>
      <Stack h={"100%"}>
        <ComponentAdminGlobal_HeaderTamplate name="App Information" />

        <Group>
          {listPage.map((e, i) => (
            <Button
              key={i}
              radius={"xl"}
              c={selectPage === e.id ? AdminColor.white : "gray"}
              bg={selectPage === e.id ? AccentColor.blue : AccentColor.darkblue}
              onClick={() => {
                setSelectPage(e.id);
              }}
              style={{
                transition: "all 0.5s",
              }}
            >
              {e.name}
            </Button>
          ))}
        </Group>

        {/* {selectPage === "1" && (
          <AdminAppInformation_ViewInformasiWhatApps />
        )} */}

        {selectPage === "2" && <AdminAppInformation_ViewInfoBank />}
        {selectPage === "3" && <AdminAppInformation_ViewKategoriPortofolio />}
      </Stack>
    </>
  );
}
