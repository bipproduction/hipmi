"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { Button, Center, Group, Stack, TextInput, Title } from "@mantine/core";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import Admin_ComponentBackButton from "../../_admin_global/back_button";
import { Admin_V3_ComponentBreakpoint } from "../../_components_v3/comp_simple_grid_breakpoint";

export default function AdminAppInformation_ViewCreateBidangBisnis() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_TitlePage name="Tambah Bidang Bisnis" />
        <Admin_ComponentBackButton />

        <Admin_V3_ComponentBreakpoint>
          {/* BIDANG */}
          <Admin_ComponentBoxStyle
            style={{
              maxHeight: "15dvh",
              overflow: "auto",
            }}
          >
            <Stack p={"xs"}>
              <Title c={AdminColor.white} order={5}>
                Tambah Bidang Bisnis
              </Title>

              <TextInput
                placeholder="Masukan nama bidang bisnis"
                // value={newData}
                // onChange={(val) => {
                //   setNewData(val.currentTarget.value);
                // }}
              />
            </Stack>
          </Admin_ComponentBoxStyle>

          {/* SUB BIDANG */}
          <Admin_ComponentBoxStyle>
            <Stack p={"xs"}>
              <Title c={AdminColor.white} order={5}>
                Tambah Sub Bidang Bisnis
              </Title>
              
              <TextInput
                placeholder="Masukan nama bidang bisnis"
                // value={newData}
                // onChange={(val) => {
                //   setNewData(val.currentTarget.value);
                // }}
              />
              <Group position="right" align="flex-end">
                <Button
                  //   loading={isLoadingCreate}
                  loaderPosition="center"
                  style={{ transition: "0.5s" }}
                  //   disabled={newData == "" || !data}
                  radius={"xl"}
                  color="green"
                  onClick={() => {
                    // onCreate();
                  }}
                >
                  Simpan
                </Button>
              </Group>
            </Stack>
          </Admin_ComponentBoxStyle>
        </Admin_V3_ComponentBreakpoint>
      </Stack>
    </>
  );
}
