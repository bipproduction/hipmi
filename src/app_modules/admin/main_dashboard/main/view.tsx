"use client";

import { AccentColor, AdminColor, MainColor } from "@/app_modules/_global/color/color_pallet";
import { Divider, Flex, Grid, Group, Paper, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconFileText, IconUsers } from "@tabler/icons-react";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";

export default function AdminMain({
  countUser,
  countPorto,
}: {
  countUser: number;
  countPorto: number;
}) {
  const listBox = [
    {
      id: 1,
      name: "User",
      jumlah: countUser,
      link: "",
      icon: <IconUsers size={18} color="#0066CCFF" />
    },
    {
      id: 2,
      name: "Portofolio",
      jumlah: countPorto,
      link: "",
      icon: <IconFileText size={18} color={"#B6A22EFF"}/>
    },
  ];

  return (
    <>
      <Stack spacing={"sm"}>
        <ComponentAdminGlobal_HeaderTamplate name="Main Dashboard"/>
        {/* <Title c={AdminColor.white}>Main Dashboard</Title>
        <Divider c={AdminColor.dividerWhite} mb={"md"} size={"xs"} /> */}

        <Grid>
          {listBox.map((e) => (
            <Grid.Col md={4} lg={4} key={e.id}>
              <Paper style={{ borderColor: "transparent"}} bg={AdminColor.softBlue} withBorder shadow="md" radius="md" p="md">
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
