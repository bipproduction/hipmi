"use client";

import {
  Modal,
  Stack,
  Title,
  Group,
  Button,
  Box,
  ActionIcon,
} from "@mantine/core";
import { MainColor, AccentColor } from "../color/color_pallet";
import React from "react";
import { IconX } from "@tabler/icons-react";

export default function UIGlobal_Modal({
  opened,
  close,
  title,
  buttonKiri,
  buttonKanan,
  children,
  closeButton,
  closeOnClickOutside,
}: {
  opened: any;
  close: any;
  title: any;
  buttonKiri?: any;
  buttonKanan?: any;
  children?: React.ReactNode;
  closeButton?: boolean;
  closeOnClickOutside?: boolean;
}) {
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close();
        }}
        centered
        withCloseButton={false}
        closeOnClickOutside={closeOnClickOutside}
        styles={{
          content: {
            backgroundColor: MainColor.darkblue,
            border: `2px solid ${AccentColor.blue}`,
          },
        }}
      >
        <Stack spacing={"lg"}>
          <Group position="apart">
            <Title order={6} color={MainColor.white} align="center">
              {title}
            </Title>
            {closeButton ? (
              <ActionIcon onClick={close} variant="transparent">
                <IconX color="white" size={25} />
              </ActionIcon>
            ) : null}
          </Group>
          {children ? (
            children
          ) : (
            <Group position="center">
              <Box>{buttonKiri}</Box>
              <Box>{buttonKanan}</Box>
            </Group>
          )}
        </Stack>
      </Modal>
    </>
  );
}
