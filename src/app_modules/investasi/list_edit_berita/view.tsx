"use client";

import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import UIGlobal_Drawer from "@/app_modules/_global/ui/ui_drawer";
import {
  AspectRatio,
  Box,
  Grid,
  Group,
  Image,
  Paper,
  Spoiler,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MODEL_INVESTASI } from "../_lib/interface";
import funDeleteBeritaInvestasi from "../fun/fun_delete_berita";
import funLoadDataInvestasi from "../fun/fun_load_data";

export default function ListEditBeritaInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_INVESTASI;
}) {
  const router = useRouter();
  const [investasi, setInvestasi] = useState(dataInvestasi);
  const [beritaId, setBeritaId] = React.useState("");
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

  async function onDelete(idBerita: string) {
    await funDeleteBeritaInvestasi(idBerita).then(async (res) => {
      if (res.status === 200) {
        const load = await funLoadDataInvestasi(investasi.id);
        ComponentGlobal_NotifikasiBerhasil(res.message);
        return setInvestasi(load as any);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  const listPage = [
    {
      id: "1",
      name: "Edit Berita",
      icon: <IconEdit />,
      // path: RouterInvestasi.edit_berita + `${v.id}`,
    },
  ];

  return (
    <>
      {_.isEmpty(investasi.BeritaInvestasi) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        investasi.BeritaInvestasi.map((v, k) => (
          <Paper
            key={k}
            style={{
              padding: "15px",
              backgroundColor: AccentColor.darkblue,
              border: `2px solid ${AccentColor.blue}`,
              borderRadius: "10px",
              color: "white",
              marginBottom: "15px",
            }}
            onClick={() =>
              router.push(RouterInvestasi_OLD.detail_berita + v.id)
            }
          >
            <Stack spacing={"xs"}>
              <Group position="apart">
                <Box>
                  <Title lineClamp={1} w={"70%"} order={6}>
                    {v.title}
                  </Title>
                  <Text lineClamp={1} fz={10}>
                    {moment(v.createdAt).local().format("lll")}
                  </Text>
                </Box>

                {/* <ActionIcon
                  variant="transparent"
                  onClick={() => {
                    setIsOpenDrawer(true);
                  }}
                >
                  <IconDots color="white" />
                </ActionIcon> */}

                {/* <Menu position="left">
                  <Menu.Target>
                    <ActionIcon variant="transparent">
                      <IconDots color="black" />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() =>
                        router.push(RouterInvestasi.edit_berita + `${v.id}`)
                      }
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        onDelete(v.id);
                      }}
                    >
                      Hapus
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu> */}
              </Group>
              <Grid pt={5}>
                <Grid.Col span={8}>
                  <Spoiler
                    fz={"xs"}
                    maxHeight={55}
                    showLabel="Selengkapnya"
                    hideLabel="Sembunyikan"
                  >
                    {v.deskripsi}
                  </Spoiler>
                </Grid.Col>
                <Grid.Col span={4}>
                  <AspectRatio ratio={16 / 9} h={50} w={100}>
                    <Paper radius={10}>
                      <Image
                        alt=""
                        src={RouterInvestasi_OLD.api_gambar + `${v.imagesId}`}
                      />
                    </Paper>
                  </AspectRatio>
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>
        ))
      )}

      <UIGlobal_Drawer
        opened={isOpenDrawer}
        close={() => setIsOpenDrawer(false)}
        component={listPage}
      />
    </>
  );
}
