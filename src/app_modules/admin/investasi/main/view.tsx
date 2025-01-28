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

export default function Admin_Investasi({
  listInvestasi,
  countDraft,
  countReview,
  countPublish,
  countReject,
  totalInvestasiByUser,
  publishProgres,
}: {
  listInvestasi: MODEL_INVESTASI[];
  countDraft: number | any;
  countReview: number | any;
  countPublish: number | any;
  countReject: number | any;
  totalInvestasiByUser: any[];
  publishProgres: any[];
}) {
  const [investasi, setInvestasi] = useState(listInvestasi);
  const router = useRouter();

  const listBox = [
    {
      id: 1,
      name: "Publish",
      jumlah: countPublish,
      link: RouterAdminInvestasi_OLD.table_status_publish,
      color: MainColor.green,
      icon: <IconUpload size={18} color="#4CAF4F" />,
    },
    {
      id: 2,
      name: "Review",
      jumlah: countReview,
      link: RouterAdminInvestasi_OLD.table_status_review,
      color: MainColor.orange,
      icon: <IconBookmark size={18} color="#FF7043" />
    },
    {
      id: 3,
      name: "Reject",
      jumlah: countReject,
      link: RouterAdminInvestasi_OLD.table_status_reject,
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
