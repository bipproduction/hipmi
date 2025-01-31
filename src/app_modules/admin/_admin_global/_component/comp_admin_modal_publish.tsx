import { AdminColor } from '@/app_modules/_global/color/color_pallet';
import { Group, Modal, Stack } from '@mantine/core';
import React from 'react';

function Admin_ComponentModalPublish({ onClose, opened, title, buttonKiri, buttonKanan, }: {
  onClose: () => void;
  opened: any;
  title: string;
  buttonKiri: React.ReactNode;
  buttonKanan: React.ReactNode;
}) {
  return (
    <>
      <Modal
        styles={{ content: { backgroundColor: AdminColor.softBlue, }, header: { backgroundColor: AdminColor.softBlue }, title: { color: AdminColor.white } }}
        centered
        opened={opened}
        onClose={onClose}
        title={title}
        size={"sm"}
        withCloseButton={false}
      >
        <Stack>
          <Group position="center">
            {buttonKiri}
            {buttonKanan}
          </Group>
        </Stack>
      </Modal>
    </>
  );
}

export default Admin_ComponentModalPublish;
