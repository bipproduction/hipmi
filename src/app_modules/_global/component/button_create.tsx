"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ActionIcon, Loader } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ComponentGlobal_CreateButton({
  path,
}: {
  path: string;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <ActionIcon
        // bg={"blue"}
        // variant="light"
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
        <IconPencilPlus color="white" />
      </ActionIcon>
    </>
  );
}
