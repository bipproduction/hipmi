"use client";

import { AccentColor, AdminColor, MainColor } from "@/app_modules/_global/color/color_pallet";
import { Divider, Flex, Grid, Group, Paper, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconFileText, IconUsers } from "@tabler/icons-react";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { useState } from "react";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetCountPortofolio, apiGetCountUserActive } from "../lib/api_fetch_main_dashboard";
import { NextResponse } from "next/server";
import { clientLogger } from "@/util/clientLogger";
import MainDashboardSkeleton from "../../_admin_global/_component/skeleton/main_dashboard_skeleton";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function AdminMain() {
  const [countUser, setCountUser] = useState<number | null>(null);
  const [countPortofolio, setCountPortofolio] = useState<number | null>(null);

  useShallowEffect(() => {
    onLoadDataUser();
    onLoadDataPortofolio();
  }, []);

  async function onLoadDataUser() {
    try {
      const response = await apiGetCountUserActive();
      if (response) {
        // console.log(response.data);
        // console.log(typeof response.data);
        // console.log( response);
        setCountUser(response.data);
      }

    } catch (error) {
      clientLogger.error("Error get count user data", error);
    }
  }

  async function onLoadDataPortofolio() {
    try {
      const response = await apiGetCountPortofolio();
      if (response) {
        // console.log("Response Portofolio",response);
        setCountPortofolio(response.data);
      }

    } catch (error) {
      clientLogger.error("Error get count portofolio data", error);
    }
  }

  const listBox = [
    {
      id: 1,
      name: "User",
      jumlah:
        countUser == null ? (<CustomSkeleton height={40} width={40} />
        ) : countUser ? (
          countUser
        ) : (
          "-"
        ),
      link: "",
      icon: <IconUsers size={18} color="#0066CCFF" />
    },
    {
      id: 2,
      name: "Portofolio",
      jumlah: 
      countPortofolio == null ? (<CustomSkeleton height={40} width={40} />
      ) : countPortofolio ? (
        countPortofolio
      ) : (
        "-"
      ),
      link: "",
      icon: <IconFileText size={18} color={"#B6A22EFF"} />
    },
  ];


  return (
    <>
      <Stack spacing={"sm"}>
        <ComponentAdminGlobal_HeaderTamplate name="Main Dashboard" />
        {/* <Title c={AdminColor.white}>Main Dashboard</Title>
        <Divider c={AdminColor.dividerWhite} mb={"md"} size={"xs"} /> */}

        <Grid>
          {listBox.map((e) => (
            <Grid.Col md={4} lg={4} key={e.id}>
              <Paper style={{ borderColor: "transparent" }} bg={AdminColor.softBlue} withBorder shadow="md" radius="md" p="md">
                <Stack spacing={0}>
                  <Text fw={"bold"} c={MainColor.white}>{e.name}</Text>
                  <Flex align={"center"} justify={"space-between"}>
                    <Title c={MainColor.white}>{e.jumlah}</Title>
                    <ThemeIcon radius={"xl"} size={"md"} color={AccentColor.white}>{e.icon}</ThemeIcon>
                  </Flex>
                </Stack>
              </Paper>
            </Grid.Col>
          ))}

          <Grid.Col md={4} lg={4}>
            {/* <PieChart /> */}
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
}
