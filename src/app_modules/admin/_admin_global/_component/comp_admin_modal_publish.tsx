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
        style={{ fontWeight: "bold" }}
        fw={"bold"}
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
