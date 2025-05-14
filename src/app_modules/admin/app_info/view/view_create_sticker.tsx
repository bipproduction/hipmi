"use client";

import {
  Box,
  Button,
  Chip,
  Group,
  Image,
  Paper,
  Stack,
  TextInput,
} from "@mantine/core";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import { Admin_V3_ComponentBreakpoint } from "../../_components_v3/comp_simple_grid_breakpoint";
import { pathAssetImage } from "@/lib";
import Admin_ComponentBackButton from "../../_admin_global/back_button";
import { IconCheck, IconUpload } from "@tabler/icons-react";
import {
  AdminColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { baseStylesTextInput } from "@/app_modules/_global/lib/base_style_text_input";
import { useState } from "react";
import Component_V3_Label_TextInput from "@/app_modules/_global/component/new/comp_V3_label_text_input";

export default function AdminAppInformation_ViewCreateSticker() {
  const [value, setValue] = useState(["senang"]);

  const listEmotion = [
    { value: "senang", label: "Senang" },
    { value: "sedih", label: "Sedih" },
    { value: "marah", label: "Marah" },
    { value: "takut", label: "Takut" },
    { value: "terkejut", label: "Terkejut" },
    { value: "cinta", label: "Cinta" },
    { value: "malas", label: "Malas" },
    { value: "bangga", label: "Bangga" },
    { value: "penasaran", label: "Penasaran" },
    { value: "malu", label: "Malu" },
    { value: "iri", label: "Iri" },
    { value: "kesal", label: "Kesal" },
    { value: "kaget", label: "Kaget" },
    { value: "bingung", label: "Bingung" },
    { value: "lega", label: "Lega" },
  ];

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_TitlePage name="Tambah Stiker" />
        <Admin_ComponentBackButton />

        <Admin_V3_ComponentBreakpoint lg={2} md={2} sm={1}>
          <Admin_ComponentBoxStyle>
            <Stack>
              <Stack align="center">
                <Paper bg={MainColor.white} p="sm" radius="lg">
                  <Image
                    alt="Preview Stiker"
                    src={pathAssetImage.dummy_image}
                    w="100%"
                    style={{ maxWidth: 300, objectFit: "contain" }}
                    radius="md"
                  />
                </Paper>

                <Button radius="xl" leftIcon={<IconUpload size={20} />}>
                  Upload Stiker
                </Button>
              </Stack>

              <Stack>
                <TextInput
                  required
                  placeholder="Masukkan nama stiker"
                  label="Nama Stiker"
                  styles={{
                    ...baseStylesTextInput,
                    required: { color: MainColor.red },
                  }}
                />

                <Stack>
                  <Component_V3_Label_TextInput text="Pilih emosi stiker" />
                  <Group style={{ display: "flex", flexWrap: "wrap" }}>
                    <Chip.Group multiple value={value} onChange={setValue}>
                      {listEmotion.map((e, i) => {
                        return (
                          <Chip key={i} value={e.value}>
                            {e.label}
                          </Chip>
                        );
                      })}
                    </Chip.Group>
                  </Group>
                </Stack>

                <Box
                  mt={"xl"}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button radius="xl" leftIcon={<IconCheck size={20} />}>
                    Simpan
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Admin_ComponentBoxStyle>
        </Admin_V3_ComponentBreakpoint>
      </Stack>
    </>
  );
}
