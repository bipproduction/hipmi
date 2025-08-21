import { MainColor, AccentColor } from '@/app_modules/_global/color';
import { AdminColor } from '@/app_modules/_global/color/color_pallet';
import { Flex, Grid, Paper, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import React from 'react';
import CustomSkeletonAdmin from './customSkeletonAdmin';
import ComponentAdminGlobal_HeaderTamplate from '../../header_tamplate';
import { IconFileText, IconUsers } from '@tabler/icons-react';

function MainDashboardSkeleton() {
   const listBox = [
      {
        id: 1,
        name: "User",
        jumlah: "",
        link: "",
        icon: <IconUsers size={18} color="#0066CCFF" />
      },
      {
        id: 2,
        name: "Portofolio",
        jumlah: "countPortofolio",
        link: "",
        icon: <IconFileText size={18} color={"#B6A22EFF"} />
      },
    ];
  return (
    <>
      <Stack spacing={"sm"}>
        <ComponentAdminGlobal_HeaderTamplate name="Main Dashboard" />
        <Grid>
            {listBox.map((e) => (
              <Grid.Col md={4} lg={4} key={e.id}>
                <Paper style={{ borderColor: "transparent" }} bg={AdminColor.softBlue} withBorder shadow="md" radius="md" p="md">
                  <Stack spacing={0}>
                    <Text fw={"bold"} c={MainColor.white}>{e.name}</Text>
                    <Flex align={"center"} justify={"space-between"}>
                      <CustomSkeletonAdmin w={40} h={50} />
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
export default MainDashboardSkeleton;
