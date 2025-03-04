"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { Group, Button } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function ComponentAdminDonasi_TombolKembali() {
  const router = useRouter();
  return (
    <>
      <Group>
        <Button
          bg={AdminColor.softBlue}
          c={AdminColor.white}
          leftIcon={<IconChevronLeft />}
          variant="white"
          onClick={() => router.back()}
        >
          Kembali
        </Button>
      </Group>
    </>
  );
}
