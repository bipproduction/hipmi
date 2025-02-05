"use client";

import { RouterAdminInvestasi_OLD } from "@/app/lib/router_hipmi/router_admin";
import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  Group,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Table,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconAlertTriangle,
  IconArrowBadgeRight,
  IconArrowBigRightLine,
  IconArrowsMaximize,
  IconBookmark,
  IconCaretRight,
  IconChevronsDownRight,
  IconChevronsRight,
  IconEdit,
  IconUpload,
  IconZoomCheck,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Admin_TablePublishInvestasi from "./table_publish";
import Admin_TableReviewInvestasi from "./table_review";
import Admin_TableRejectInvestasi from "./table_reject";
import moment from "moment";
import _ from "lodash";
import TableTotalInvestasi from "./table_total_investasi";
import TablePublikasiProgresInvestasi from "./table_publikasi_progres";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { clientLogger } from "@/util/clientLogger";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import global_limit from "@/app/lib/limit";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetAdminInvestasiCountDashboard } from "../_lib/api_fetch_admin_investasi";


export default function Admin_Investasi({
  listInvestasi,
  totalInvestasiByUser,
  publishProgres,
}: {
  listInvestasi: MODEL_INVESTASI[];
  totalInvestasiByUser: any[];
  publishProgres: any[];
}) {
  const [investasi, setInvestasi] = useState(listInvestasi);
  const router = useRouter();
  const [countPublish, setCountPublish] = useState<number | null>(null);
  const [countReview, setCountReview] = useState<number | null>(null);
  const [countReject, setCountReject] = useState<number | null>(null);

  useShallowEffect(() => {
    handlerLoadData();
  }, [])
  async function handlerLoadData() {
    try {
      const listLoadData = [
        global_limit(() => onLoadCountPublish()),
        global_limit(() => onLoadCountReview()),
        global_limit(() => onLoadCountReject()),
      ];

      
      const result = await Promise.all(listLoadData);
    } catch (error) {
      clientLogger.error("Error handler load data", error);
    }
  }

  async function onLoadCountPublish() {
    try {

      const response = await apiGetAdminInvestasiCountDashboard({
        name: "Publish",
      });

      console.log("Response Publish", response);

      if (response) {
        setCountPublish(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get count publish", error);
    }
  }
  async function onLoadCountReview() {
    try {
      const response = await apiGetAdminInvestasiCountDashboard({
        name: "Review",
      });

      if (response) {
        setCountReview(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get count review", error);
    }
  }
  async function onLoadCountReject() {
    try {
      const response = await apiGetAdminInvestasiCountDashboard({
        name: "Reject",
      });

      if (response) {
        setCountReject(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get count reject", error);
    }
  }

  const listBox = [
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
      path: RouterAdminInvestasi_OLD.table_status_publish,
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
      path: RouterAdminInvestasi_OLD.table_status_review,
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
      path: RouterAdminInvestasi_OLD.table_status_reject,
      color: MainColor.red,
      icon: <IconAlertTriangle size={18} color="#FF4B4C" />

    },
  ];

  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentAdminGlobal_HeaderTamplate name="Investasi" />

        <SimpleGrid
          cols={3}
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
                <Text fw={"bold"} color={AccentColor.white}>{e.name}</Text>
                <Flex align={"center"} justify={"space-between"}>
                  <Title c={AccentColor.white}>{e.jumlah}</Title>
                  <ThemeIcon radius={"xl"} size={"md"} color={AccentColor.white}>
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
