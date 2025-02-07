"use client";

import { Stack, SimpleGrid, Paper, Group, Title, Text, Flex, ThemeIcon } from "@mantine/core";
import { useRouter } from "next/navigation";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { IconAlertTriangle, IconMessage2, IconUpload } from "@tabler/icons-react";
import { AccentColor, AdminColor } from "@/app_modules/_global/color/color_pallet";
import { useState } from "react";
import { clientLogger } from "@/util/clientLogger";
import { apiGetAdminCollaborationStatusCountDashboard } from "../lib/api_fetch_admin_collaboration";
import global_limit from "@/app/lib/limit";
import { useShallowEffect } from "@mantine/hooks";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function AdminColab_Dashboard() {
  const [countPublish, setCountPublish] = useState<number | null>(null);
  const [countRoom, setCountRoom] = useState<number | null>(null);
  const [countReject, setCountReject] = useState<number | null>(null);
  const router = useRouter();

 

  useShallowEffect(() => {
    handlerLoadData()
  }, []);

  async function handlerLoadData() {
    try {
      const listLoadData = [
        global_limit(() => onLoadCountPublish()),
        global_limit(() => onLoadCountRoom()),
        global_limit(() => onLoadCountReject()),
      ]
      const result = await Promise.all(listLoadData);
    } catch (error) {
      clientLogger.error("Error handler load data", error)
    }
  }
  async function onLoadCountPublish() {
    try {
      const response = await apiGetAdminCollaborationStatusCountDashboard({
        name: "Publish",
      })
      if (response) { 
        setCountPublish(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get count publish", error);
    }
  }


  async function onLoadCountRoom() {
    try {
      const response = await apiGetAdminCollaborationStatusCountDashboard(
        {
          name: "Room",
        }
      )
      if (response) {
        setCountRoom(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get count room", error);
    }
  }

  async function onLoadCountReject() {
    try {
      const response = await apiGetAdminCollaborationStatusCountDashboard({
        name: "Reject",
      })
      if (response) {
        setCountReject(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get count reject", error);
    }
  }

  const listStatus = [
    {
      id: 1,
      name: "Publish",
      jumlah: countPublish
      == null ? (
        <CustomSkeleton height={40} width={40} />
      ) : countPublish ? (
        countPublish
      ) : (
        "-"
      )
      ,
      color: "green",
      icon: <IconUpload size={18} color="#4CAF4F" />
    },
    {
      id: 2,
      name: "Group Chat",
      jumlah: countRoom
      == null ? (
        <CustomSkeleton height={40} width={40} />
      ) : countRoom ? (
        countRoom
      ) : (
        "-"
      )
      ,
      color: "orange",
      icon: <IconMessage2 size={18} color="#FF9800" />
    },
    {
      id: 3,
      name: "Reject",
      jumlah: countReject
       == null ? (
        <CustomSkeleton height={40} width={40} />
      ) : countReject ? (
        countReject
      ) : (
        "-"
        )
      ,
      color: "red",
      icon: <IconAlertTriangle size={18} color="#FF4B4C" />
    },
  ];
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Project Collaboration" />
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
function apiGetAdminCollaborationStatuCountDashboard(arg0: { name: string; }) {
  throw new Error("Function not implemented.");
}

