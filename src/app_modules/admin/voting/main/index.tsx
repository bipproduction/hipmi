"use client";

import { Stack, SimpleGrid, Paper, Group, Title, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import ComponentAdminGlobal_HeaderTamplate from "../../component/header_tamplate";

export default function AdminVote_Main({
  countPublish,
  countReview,
  countDraft,
  countReject,
  countTipeAcara,
  countRiwayat,
}: {
  countPublish?: number;
  countReview?: number;
  countDraft?: number;
  countReject?: number;
  countTipeAcara?: number;
  countRiwayat?: number;
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
      name: "Review",
      jumlah: countReview,
      color: "orange",
    },
    {
      id: 3,
      name: "Draft",
      jumlah: countDraft,
      path: "",
      color: "yellow",
    },
    {
      id: 4,
      name: "Reject",
      jumlah: countReject,
      color: "red",
    },
  ];

  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentAdminGlobal_HeaderTamplate name="Voting" />

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
        <SimpleGrid
          cols={4}
          spacing="lg"
          breakpoints={[
            { maxWidth: "62rem", cols: 4, spacing: "lg" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        ></SimpleGrid>
      </Stack>
    </>
  );
}