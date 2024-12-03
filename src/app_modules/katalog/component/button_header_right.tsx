"use client";

import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDotsVertical
} from "@tabler/icons-react";
import { ComponentKatalog_DrawerKatalog } from "./drawer_katalog";

export function ComponentKatalog_ButtonHeaderRight({
  profileId,
  userLoginId,
  authorId,
  userRoleId,
}: {
  profileId: string;
  userLoginId: string;
  authorId: string;
  userRoleId: string
}) {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      {authorId !== userLoginId ? (
        <ActionIcon disabled variant="transparent"></ActionIcon>
      ) : (
        <ActionIcon c="white" variant="transparent" onClick={() => open()}>
          <IconDotsVertical />
        </ActionIcon>
      )}

      <ComponentKatalog_DrawerKatalog
        opened={opened}
        close={() => close()}
        profileId={profileId}
        userId={userLoginId}
        userRoleId={userRoleId}
      />
    </>
  );
}
