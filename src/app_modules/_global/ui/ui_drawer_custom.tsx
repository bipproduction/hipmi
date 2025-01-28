"use client";

import { AccentColor } from "@/app_modules/_global/color";
import {
  ActionIcon,
  Box,
  Drawer,
  Group,
  SimpleGrid,
  Stack,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import React from "react";

interface MODEL_DRAWER {
  id: string;
  name: string;
  icon: string;
  path: string;
}
export default function UIGlobal_DrawerCustom({
  opened,
  close,
  component,
}: {
  opened: boolean;
  close: () => void;
   component: React.ReactNode;
}) {
  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => close()}
        position={"bottom"}
        size={"auto"}
        withCloseButton={false}
        styles={{
          content: {
            padding: 0,
            position: "absolute",
            margin: "auto",
            backgroundColor: "transparent",
            left: 0,
            right: 0,
            width: 500,
          },
          body: {
            backgroundColor: AccentColor.darkblue,
            borderTop: `2px solid ${AccentColor.blue}`,
            borderRight: `1px solid ${AccentColor.blue}`,
            borderLeft: `1px solid ${AccentColor.blue}`,
            borderRadius: "20px 20px 0px 0px",
            color: "white",
            paddingBottom: "5%",
          },
        }}
      >
        <Stack spacing={"xs"}>
          <Group position="right">
            <ActionIcon onClick={close} variant="transparent">
              <IconX color="white" />
            </ActionIcon>
          </Group>
          <Box w={"100%"} >
            {component}
          </Box>
        </Stack>
      </Drawer>
    </>
  );
}
