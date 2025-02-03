"use client";

import { Flex, Group, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { clientLogger } from "@/util/clientLogger";
import { IconAlertTriangle, IconArchive, IconBookmark, IconUpload } from "@tabler/icons-react";
import { AccentColor } from "@/app_modules/_global/color";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import global_limit from "@/app/lib/limit";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetJobArsipCount, apiGetJobStatusCountDashboard } from "../lib/api_fetch_admin_job";

export default function AdminJob_Main({
  // countPublish,
  // countReview,
  // countReject,
  // countArsip,
}: {
    // countPublish: number;
    // countReview: number;
    // countReject: number;
    // countArsip: number
  }) {
  const [countPublish, setCountPublish] = useState<number | null>(null);
  const [countReview, setCountReview] = useState<number | null>(null);
  const [countReject, setCountReject] = useState<number | null>(null);
  const [countArsip, setCountArsip] = useState<number | null>(null);
  const router = useRouter();


  useShallowEffect(() => {
    handlerLoadData();
  }, []);
  async function handlerLoadData() {
    try {
      const listLoadData = [
        global_limit(() => onLoadCountPublish()),
        global_limit(() => onLoadCountReview()),
        global_limit(() => onLoadCountReject()),
        global_limit(() => onLoadCountArsip()),
      ]
    } catch (error) {
      clientLogger.error("Error handler load data", error)
    }
  }

  async function onLoadCountPublish() {
    try {
      const response = await apiGetJobStatusCountDashboard({
        name: "Publish",
      })
      if (response) {
        setCountPublish(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get count publish", error)
    }
  }

  async function onLoadCountReview() {
    try {
      const response = await apiGetJobStatusCountDashboard({
        name: "Review",
      })

      if (response) {
        setCountReview(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get count review", error)
    }
  }

  async function onLoadCountReject() {
    try {
      const response = await apiGetJobStatusCountDashboard({
        name: "Reject",
      })

      if (response) {
        setCountReject(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get count reject", error)
    }
  }

  async function onLoadCountArsip() {
    try {
      const response = await apiGetJobArsipCount()

      if (response) {
        setCountArsip(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get count arsip", error)
    }
  }
  const listStatus = [
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
      color: "green",
      text_color: "white",
      icon: <IconUpload size={18} color="#4CAF4F" />


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
      color: "orange",
      text_color: "white",
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
      color: "red",
      text_color: "white",
      icon: <IconAlertTriangle size={18} color="#FF4B4C" />
    },
    {
      id: 4,
      name: "Arsip",
      jumlah: countArsip == null ? (
        <CustomSkeleton height={40} width={40} />
      ) : countArsip ? (
        countArsip
      ) : (
        "-"
      ),
      color: "gray",
      text_color: "white",
      icon: <IconArchive size={18} color="#007CBA" />
    },
  ];
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Job Vacancy" />
        <SimpleGrid
          cols={4}
          spacing="lg"
          breakpoints={[
            { maxWidth: "62rem", cols: 4, spacing: "lg" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          {listStatus.map((e, i) => (
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
      </Stack>
    </>
  );
}
