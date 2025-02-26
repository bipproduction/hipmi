"use client";

import { AccentColor, AdminColor } from "@/app_modules/_global/color/color_pallet";
import { Group, Button, Loader } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminGlobal_ComponentBackButton({
  path,
}: {
  path?: string;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <Group>
        <Button
          c={AccentColor.white}
          leftIcon={
            isLoading ? (
              <Loader size={"xs"} color={"gray"} />
            ) : (
              <IconChevronLeft />
            )
          }
          style={{ backgroundColor: AdminColor.softBlue}}
          onClick={() => {
            setLoading(true);
            // setTimeout(() => , 3000);
            if (path == null) {
              router.back();
            } else {
              router.push(path);
            }
          }}
        >
          Kembali
        </Button>
      </Group>
    </>
  );
}
