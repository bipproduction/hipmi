"use client";

import React, { useState } from "react";
import AdminGlobal_ComponentBackButton from "../../_admin_global/back_button";
import {
  Button,
  Flex,
  Grid,
  Group,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { MODEL_COLLABORATION } from "@/app_modules/colab/model/interface";
import { useShallowEffect } from "@mantine/hooks";
import { clientLogger } from "@/util/clientLogger";
import { apiGetAdminCollaborationById } from "../lib/api_fetch_admin_collaboration";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { IconCheck, IconFlag2Off } from "@tabler/icons-react";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import adminColab_funReportProjectById from "../fun/edit/fun_report_project_by_id";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";

function DetailReject() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_COLLABORATION | null>(null);
  const [loading, setLoading] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [report, setReport] = useState("");

  useShallowEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const response = await apiGetAdminCollaborationById({
        id: params.id,
      });

      if (response?.success && response?.data) {
        setData(response.data);
      }
    } catch (error) {
      clientLogger.error("Invalid data format recieved:", error);
      setData(null);
    }
  };

//   async function onReject() {
//     try {
//       setLoading(true);
//       const response = await adminColab_funReportProjectById({
//         colabId: params.id,
//         report: report,
//       });

//       if (response.status == 200) {
//         setLoading(false);
//         router.back();
//       }
//     } catch (error) {
//       setLoading(false);
//       ComponentGlobal_NotifikasiPeringatan("Gagal Load");
//       clientLogger.error("Invalid report collaboration", error);
//     }
//   }

  const listData = [
    {
      label: "Username",
      value: data?.Author.username,
    },
    {
      label: "Judul",
      value: data?.title,
    },
    {
      label: "Industri",
      value: data?.ProjectCollaborationMaster_Industri.name,
    },
    {
      label: "Jumlah Partisipan",
      value: data?.ProjectCollaboration_Partisipasi.length,
    },
    {
      label: "Lokasi",
      value: data?.lokasi,
    },
    {
      label: "Tujuan",
      value: data?.purpose,
    },
    {
      label: "Keuntungan",
      value: data?.benefit,
    },
    {
      label: "Catatan Report",
      value: data?.report,
    },
  ];

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name={`Detail reject`} />
        <AdminGlobal_ComponentBackButton />

        <SimpleGrid cols={2}>
          {!data ? (
            <CustomSkeleton height={"50vh"} width={"100%"} />
          ) : (
            <Admin_ComponentBoxStyle>
              <Stack spacing={"xs"}>
                {listData.map((e, i) => (
                  <Grid c={"white"} key={i}>
                    <Grid.Col span={4}>
                      <Text c={AdminColor.white} fw={"bold"}>
                        {e.label}
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={1}>:</Grid.Col>
                    <Grid.Col span={"auto"}>
                      <Text c={AdminColor.white}>{e.value}</Text>
                    </Grid.Col>
                  </Grid>
                ))}

              </Stack>
            </Admin_ComponentBoxStyle>
          )}
        </SimpleGrid>
      </Stack>
    </>
  );
}

export default DetailReject;
