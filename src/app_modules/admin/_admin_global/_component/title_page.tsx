"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { Group, Title, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";

export function ComponentAdminGlobal_TitlePage({
  name,
  color,
  component,
}: {
  name: string;
  color?: string;
  component?: React.ReactNode;
}) {
  return (
    <>
      <Group
        position="apart"
        bg={color ? color : AdminColor.softBlue}
        p={"xs"}
        style={{ borderRadius: "6px" }}
      >
        <Title c={"white"} order={4}>{name}</Title>
        {component ? component : ""}
      </Group>
    </>
  );
}
