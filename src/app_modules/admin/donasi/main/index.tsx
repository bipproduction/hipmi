"use client";

import { RouterAdminDonasi_OLD } from "@/app/lib/router_hipmi/router_admin";
import {
  Stack,
  Title,
  Divider,
  SimpleGrid,
  Paper,
  Center,
  Text,
  Box,
  Group,
  ActionIcon,
  Flex,
  ThemeIcon,
} from "@mantine/core";
import { IconAlertTriangle, IconBookmark, IconCategory, IconChevronsRight, IconUpload } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { useState } from "react";
import { clientLogger } from "@/util/clientLogger";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import global_limit from "@/app/lib/limit";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetDonasiKategoriCountDashboard, apiGetDonasiStatusCountDashboard } from "../lib/api_fetch_admin_donasi";

export default function AdminDonasi_Main({
  // countPublish,
  // countReview,

  // countReject,
}: {
    // countPublish: number;
    // countReview: number;

    // countReject: number;
  }) {

  const [countPublish, setCountPublish] = useState<number | null>(null);
  const [countReview, setCountReview] = useState<number | null>(null);
  const [countReject, setCountReject] = useState<number | null>(null);
  const [countKategori, setCountKategori] = useState<number | null>(null);
  
  useShallowEffect(() => {
    handlerLoadData();
  }, []);
  async function handlerLoadData() {
    try {
      const listLoadData = [
        global_limit(() => onLoadCountPublish()),
        global_limit(() => onLoadCountReview()),
        global_limit(() => onLoadCountReject()),
        global_limit(() => onLoadCountKategori()),
      ];
      const result = await Promise.all(listLoadData);
    } catch (error) {
      clientLogger.error("Error handler load data", error);
    }
  }
  async function onLoadCountPublish() {
    try {
      const response = await apiGetDonasiStatusCountDashboard({
        name: "Publish",
      })

      if (response) {
        setCountPublish(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get count publish", error);
    }
  }
  async function onLoadCountReview() {
    try {
      const response = await apiGetDonasiStatusCountDashboard({
        name: "Review",
      })
      if (response) {
        setCountReview(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get count review", error);
    }
  }
  async function onLoadCountReject() {
    try {
      const response = await apiGetDonasiStatusCountDashboard({
        name: "Reject",
      })
      if (response) {
        setCountReject(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get count reject", error);
    }
  }
  async function onLoadCountKategori() {
    try {
      const response = await apiGetDonasiKategoriCountDashboard({
        name: "Kategori"
      })
      if (response) {
        setCountKategori(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get count kategori", error);
    }
  }


  const router = useRouter();
  const listBox = [
    {
      id: 1,
      name: "Publish",
      jumlah: countPublish == null ? (
        <CustomSkeleton height={40} width={40} />
      ) : countPublish ? (
        countPublish
      ) : (
        "-"
      ),
      color: MainColor.green,
      icon: <IconUpload size={18} color="#4CAF4F" />,
    },
    {
      id: 2,
      name: "Review",
      jumlah: countReview == null ? (
        <CustomSkeleton height={40} width={40} />
      ) : countReview ? (
        countReview
      ) : (
        "-"
      ),
      color: MainColor.orange,
      icon: <IconBookmark size={18} color="#FF7043" />
    },
    {
      id: 3,
      name: "Reject",
      jumlah: countReject == null ? (
        <CustomSkeleton height={40} width={40} />
      ) : countReject ? (
        countReject
      ) : (
        "-"
      ),
      color: MainColor.red,
      icon: <IconAlertTriangle size={18} color="#FF4B4C" />
    },
    {
      id: 4,
      name: "Kategori",
      jumlah: countKategori == null ? (
        <CustomSkeleton height={40} width={40} />
      ) : countKategori ? (
        countKategori
      ) : (
        "-"
      ),
      color: AccentColor.softblue,
      icon: <IconCategory size={18} color="#007CBA" />

    }
  ];
  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentAdminGlobal_HeaderTamplate name="Donasi" />

        <SimpleGrid
          cols={listBox.length}
          spacing="lg"
          breakpoints={[
            { maxWidth: "62rem", cols: 4, spacing: "lg" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          {listBox.map((e, i) => (
            <Paper
              key={i}
              bg={AdminColor.softBlue}
              shadow="md"
              radius="md"
              p="md"
            // sx={{ borderColor: e.color, borderStyle: "solid" }}
            >
              <Stack spacing={0}>
                <Text c={AccentColor.white} fw={"bold"}>{e.name}</Text>
                <Flex align={"center"} justify={"space-between"}>
                  <Title c={AccentColor.white} fw={"bold"}>{e.jumlah ? e.jumlah : 0}</Title>
                  <ThemeIcon color={AccentColor.white} radius={"xl"} size={"md"}>
                    {e.icon}
                  </ThemeIcon>
                </Flex>
              </Stack>

            </Paper>
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
}
