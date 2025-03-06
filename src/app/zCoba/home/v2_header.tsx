"use client";

import { MainColor } from "@/app_modules/_global/color";
import { ActionIcon, Box, Group, Title } from "@mantine/core";
import { IconBell, IconChevronLeft } from "@tabler/icons-react";

export function V2_Header() {
  return (
    <>
      <Box
        h={"8vh"}
        style={{
          zIndex: 10,
          alignContent: "center",
        }}
        w={"100%"}
        pos={"sticky"}
        top={0}
        bg={MainColor.darkblue}
      >
        <Group h={"100%"} position={"apart"} px={"md"}>
          <ActionIcon
            c={MainColor.white}
            variant="transparent"
            radius={"xl"}
            onClick={() => {}}
          >
            <IconChevronLeft />
          </ActionIcon>

          <Title order={5} c={MainColor.yellow}>
            Test Tamplate
          </Title>

          <ActionIcon c={"white"} variant="transparent" onClick={() => {}}>
            <IconBell />
          </ActionIcon>
        </Group>
      </Box>
    </>
  );
}
