"use client";

import { RouterJob } from "@/lib/router_hipmi/router_job";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ActionIcon, Loader } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Component_NewCreateButton({ path }: { path: string }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <ActionIcon
        radius={"xl"}
        size={"xl"}
        style={{
          position: "absolute",
          zIndex: 1,
          bottom: 100,
          right: 30,
          transition: "0.5s",
          border: `1px solid ${AccentColor.skyblue}`,
          backgroundColor: AccentColor.softblue,
          padding: 3,
          maxWidth: "500px", // Batasi lebar maksimum
          margin: "0 auto", // Pusatkan layout
        }}
        onClick={() => {
          setLoading(true);
          router.push(path);
        }}
      >
        {/* PAKE LOADING */}
        {/* {isLoading ? (
          <Loader color={AccentColor.blue} size={25} />
        ) : (
          <IconPencilPlus color="white" />
        )} */}

        {/* GA PAKE LOADING */}
        <IconPencilPlus color={MainColor.white} />
      </ActionIcon>
    </>
  );
}
