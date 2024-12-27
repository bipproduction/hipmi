"use client";

import { Modal, Stack, Title, Group, Button, Box } from "@mantine/core";
import { MainColor, AccentColor } from "../color/color_pallet";

export default function UIGlobal_Modal({
  opened,
  close,
  title,
  buttonKiri,
  buttonKanan,
}: {
  opened: any;
  close: any;
  title: any;
  buttonKiri: any;
  buttonKanan: any;
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
        styles={{
          content: {
            backgroundColor: MainColor.darkblue,
            border: `2px solid ${AccentColor.blue}`,
          },
        }}
      >
        <Stack>
          <Title order={6} color={MainColor.white} align="center">
            {title}
          </Title>
          <Group position="center">
            <Box>{buttonKiri}</Box>
            <Box>{buttonKanan}</Box>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
