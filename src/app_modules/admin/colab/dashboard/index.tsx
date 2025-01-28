"use client";

import { Stack, SimpleGrid, Paper, Group, Title, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";

export default function AdminColab_Dashboard({
  countPublish,
  countRoom,
  countReject,
}: {
  countPublish: number;
  countRoom: number;
  countReject: number;
}) {
  const router = useRouter();

  const listStatus = [
    {
      id: 1,
      name: "Publish",
      jumlah: countPublish,
      color: "green",
    },
    {
      id: 2,
      name: "Group Chat",
      jumlah: countRoom,
      color: "orange",
    },
    {
      id: 3,
      name: "Reject",
      jumlah: countReject,
      color: "red",
    },
  ];
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Project Collaboration" />
        <SimpleGrid
          cols={4}
          spacing="lg"
          breakpoints={[
            { maxWidth: "62rem", cols: 4, spacing: "lg" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          {listStatus.map((e, i) => (
            <Paper
              key={i}
              bg={`${e.color}.2`}
              shadow="md"
              radius="md"
              p="md"
              // sx={{ borderColor: e.color, borderStyle: "solid" }}
            >
              <Group position="center">
                <Stack align="center" spacing={0}>
                  <Text>{e.name}</Text>
                  <Title>{e.jumlah ? e.jumlah : 0}</Title>
                </Stack>
              </Group>
            </Paper>
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
}
