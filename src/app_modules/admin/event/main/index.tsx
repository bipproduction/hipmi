"use client";

import { RouterAdminEvent } from "@/lib/router_admin/router_admin_event";

import {
  apiGetEventRiwayatCount,
  apiGetEventStatusCountDashboard,
  apiGetEventTipeAcara,
} from "@/app_modules/admin/event/_lib/api_fecth_admin_event";
import global_limit from "@/lib/limit";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { clientLogger } from "@/util/clientLogger";
import {
  Flex,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import {
  IconAlertTriangle,
  IconBookmark,
  IconBriefcase,
  IconHistory,
  IconUpload,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";

export default function AdminEvent_Main() {
  const router = useRouter();
  const [countPublish, setCountPublish] = useState<number | null>(null);
  const [countReview, setCountReview] = useState<number | null>(null);
  const [countReject, setCountReject] = useState<number | null>(null);
  const [countTipeAcara, setCountTipeAcara] = useState<number | null>(null);
  const [countRiwayat, setCountRiwayat] = useState<number | null>(null);

  useShallowEffect(() => {
    handlerLoadData();
  }, []);

  async function handlerLoadData() {
    try {
      const listLoadData = [
        global_limit(() => onLoadCountPublish()),
        global_limit(() => onLoadCountReview()),
        global_limit(() => onLoadCountReject()),
        global_limit(() => onLoadCountRiwayat()),
        global_limit(() => onLoadCountTipeAcara()),
      ];
      const result = await Promise.all(listLoadData);
    } catch (error) {
      clientLogger.error("Error handler load data", error);
    }
  }

  async function onLoadCountPublish() {
    try {
      const respone = await apiGetEventStatusCountDashboard({
        name: "Publish",
      });

      if (respone) {
        setCountPublish(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get count publish", error);
    }
  }

  async function onLoadCountReview() {
    try {
      const respone = await apiGetEventStatusCountDashboard({
        name: "Review",
      });

      if (respone) {
        setCountReview(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get count review", error);
    }
  }

  async function onLoadCountReject() {
    try {
      const respone = await apiGetEventStatusCountDashboard({
        name: "Reject",
      });

      if (respone) {
        setCountReject(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get count reject", error);
    }
  }

  async function onLoadCountRiwayat() {
    try {
      const respone = await apiGetEventRiwayatCount();

      if (respone) {
        setCountRiwayat(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get count riwayat", error);
    }
  }

  async function onLoadCountTipeAcara() {
    try {
      const respone = await apiGetEventTipeAcara();

      if (respone) {
        setCountTipeAcara(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get count tipe acara", error);
    }
  }

  const listStatus = [
    {
      id: 1,
      name: "Publish",
      jumlah:
        countPublish == null ? (
          <CustomSkeleton height={40} width={40} />
        ) : countPublish ? (
          countPublish
        ) : (
          "-"
        ),
      path: RouterAdminEvent.table_publish,
      color: MainColor.green,
      icon: <IconUpload size={18} color="#4CAF4F" />,
    },
    {
      id: 2,
      name: "Review",
      jumlah:
        countReview == null ? (
          <CustomSkeleton height={40} width={40} />
        ) : countReview ? (
          countReview
        ) : (
          "-"
        ),
      path: RouterAdminEvent.table_review,
      color: MainColor.orange,
      icon: <IconBookmark size={18} color="#FF7043" />,
    },

    {
      id: 3,
      name: "Reject",
      jumlah:
        countReject == null ? (
          <CustomSkeleton height={40} width={40} />
        ) : countReject ? (
          countReject
        ) : (
          "-"
        ),
      path: RouterAdminEvent.table_reject,
      color: MainColor.red,
      icon: <IconAlertTriangle size={18} color="#FF4B4C" />,
    },
    {
      id: 4,
      name: "Riwayat Event",
      jumlah:
        countRiwayat == null ? (
          <CustomSkeleton height={40} width={40} />
        ) : countRiwayat ? (
          countRiwayat
        ) : (
          "-"
        ),
      path: RouterAdminEvent.table_publish,
      color: AccentColor.softblue,
      icon: <IconHistory size={18} color="#007CBA" />,
    },
  ];

  const listBox2 = [
    {
      id: 1,
      name: "Tipe Acara",
      jumlah:
        countTipeAcara == null ? (
          <CustomSkeleton height={40} width={40} />
        ) : countTipeAcara ? (
          countTipeAcara
        ) : (
          "-"
        ),
      path: RouterAdminEvent.table_publish,
      color: "#A888E2",
      icon: <IconBriefcase size={18} color="#A888E2" />,
    },
  ];

  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentAdminGlobal_HeaderTamplate name="Event" />

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
                <Text fw={"bold"} color={AccentColor.white}>
                  {e.name}
                </Text>
                <Flex align={"center"} justify={"space-between"}>
                  <Title c={AccentColor.white}>{e.jumlah}</Title>
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
        <SimpleGrid
          cols={4}
          spacing="lg"
          breakpoints={[
            { maxWidth: "62rem", cols: 4, spacing: "lg" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          {listBox2.map((e, i) => (
            <Paper
              key={i}
              bg={AdminColor.softBlue}
              shadow="md"
              radius="md"
              p="md"
            // sx={{ borderColor: e.color, borderStyle: "solid" }}
            >
              <Stack spacing={0}>
                <Text fw={"bold"} color={AccentColor.white}>
                  {e.name}
                </Text>
                <Flex align={"center"} justify={"space-between"}>
                  <Title c={AccentColor.white}>{e.jumlah}</Title>
                  <ThemeIcon radius={"xl"} size={"md"} bg={AccentColor.white}>
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
