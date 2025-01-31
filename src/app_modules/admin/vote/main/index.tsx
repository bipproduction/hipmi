"use client";

import { Stack, SimpleGrid, Paper, Group, Title, Text, Flex, ThemeIcon } from "@mantine/core";
import { useRouter } from "next/navigation";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { IconAlertTriangle, IconBookmark, IconHistory, IconUpload } from "@tabler/icons-react";
import { AccentColor, AdminColor } from "@/app_modules/_global/color/color_pallet";

export default function AdminVote_Main({
  countPublish,
  countReview,
  countDraft,
  countReject,
  countRiwayat,
}: {
  countPublish?: number;
  countReview?: number;
  countDraft?: number;
  countReject?: number;
  countRiwayat?: number;
}) {
  const router = useRouter();

  const listStatus = [
    {
      id: 1,
      name: "Publish",
      jumlah: countPublish,
      color: "green",
      icon: <IconUpload size={18} color="#4CAF4F"/>
    },
    {
      id: 2,
      name: "Review",
      jumlah: countReview,
      color: "orange",
      icon: <IconBookmark size={18} color="#FF7043" />
    },
    {
      id: 3,
      name: "Reject",
      jumlah: countReject,
      color: "red",
      icon: <IconAlertTriangle size={18} color="#FF4B4C" />
    },
    {
      id: 4,
      name: "Riwayat",
      jumlah: countDraft,
      path: "",
      color: "gray",
      icon: <IconHistory size={18} color="#007CBA" />
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
              bg={AdminColor.softBlue}
              shadow="md"
              radius="md"
              p="md"
            // sx={{ borderColor: e.color, borderStyle: "solid" }}
            >

              <Stack spacing={0}>
                <Text fw={"bold"} c={AccentColor.white}>{e.name}</Text>
                <Flex align={"center"} justify={"space-between"}>
                  <Title color={AccentColor.white}>{e.jumlah ? e.jumlah : 0}</Title>
                  <ThemeIcon
                    radius={"xl"}
                    size={"md"}
                    color={AccentColor.white}
                  >
                    {e.icon}
                  </ThemeIcon>
                </Flex>
              </Stack>

            </Paper>
          ))}
        </SimpleGrid>

      </Stack>
    </>
  );
}
