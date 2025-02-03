"use client";

import { Flex, Group, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { IconFlag, IconMessageReport, IconUpload } from "@tabler/icons-react";
import { AccentColor } from "@/app_modules/_global/color";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { useShallowEffect } from "@mantine/hooks";
import { clientLogger } from "@/util/clientLogger";
import global_limit from "@/app/lib/limit";
import { apiGetAdminForumPublishCountDasboard } from "../lib/api_fetch_admin_forum";
import { useState } from "react";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function AdminForum_Main() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Forum" />
        <ForumMain
        // countPublish={countPublish}
        // countLaporanPosting={countLaporanPosting}
        // countLaporanKomentar={countLaporanKomentar}
        />
      </Stack>
    </>
  );
}

function ForumMain() {
  const [countPublish, setCountPublish] = useState<number | null>(null);
  const [countLaporanPosting, setCountLaporanPosting] = useState<number | null>(null);
  const [countLaporanKomentar, setCountLaporanKomentar] = useState<number | null>(null);


  useShallowEffect(() => {
    handlerLoadData();
  }, [])

  async function handlerLoadData() {
    try {
      const listLoadData = [
        global_limit(() => onLoadCountPublish()),
        global_limit(() => onLoadCountReportPosting()),
        global_limit(() => onLoadCountReportKomentar()),
      ]
      const result = await Promise.all(listLoadData);
    } catch (error) {
      clientLogger.error("Error handler load data", error);
    }
  }

  async function onLoadCountPublish() {
    try {
      const response = await apiGetAdminForumPublishCountDasboard()
      if (response) {
        setCountPublish(response.data)
      }
    } catch (error) {
      clientLogger.error("Error get count publish", error);
    }
  }

  async function onLoadCountReportPosting() {
    try {
      const response = await apiGetAdminForumPublishCountDasboard()
      if (response) {
        setCountLaporanPosting(response.data)
      }
    } catch (error) {
      clientLogger.error("Error get count publish", error);
    }
  }

  async function onLoadCountReportKomentar() {
    try {
      const response = await apiGetAdminForumPublishCountDasboard()
      if (response) {
        setCountLaporanKomentar(response.data)
      }
    } catch (error) {
      clientLogger.error("Error get count publish", error);
    }
  }

  const listBox = [
    {
      id: 1,
      name: "Publish",
      jumlah: countPublish == null ? (
        <CustomSkeleton width={40} height={40} />
      ) : countPublish ? (
        countPublish
      ) : (
        "-"
      ),
      color: "green",
      icon: <IconUpload size={18} color="#4CAF4F" />
    },
    {
      id: 2,
      name: "Report Posting",
      jumlah: countLaporanPosting == null ? (
        <CustomSkeleton width={40} height={40} />
      ) : countLaporanPosting ? (
        countLaporanPosting
      ) : (
        "-"
      ),
      color: "orange",
      icon: <IconFlag size={18} color="#FF9800" />
    },
    {
      id: 3,
      name: "Report Komentar",
      jumlah: countLaporanKomentar == null ? (
        <CustomSkeleton width={40} height={40} />
      ) : countLaporanKomentar ? (
        countLaporanKomentar
      ) : (
        "-"
      ),
      color: "red",
      icon: <IconMessageReport size={18} color="#F44336" />
    },
  ];
  return (
    <>
      <SimpleGrid
        cols={4}
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
              <Text fw={"bold"} c={AccentColor.white}>{e.name}</Text>
              <Flex align={"center"} justify={"space-between"}>
                <Title color={AccentColor.white}>{e.jumlah ? e.jumlah : 0}</Title>
                <ThemeIcon
                  radius={"xl"}
                  size={"md"}
                  color={AccentColor.white}
                >
                  {e.icon}
                </ThemeIcon>
              </Flex>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
    </>
  );
}
