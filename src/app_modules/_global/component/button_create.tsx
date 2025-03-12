"use client";

import { RouterJob } from "@/lib/router_hipmi/router_job";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ActionIcon, createStyles, Loader } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  button: {
    position: "fixed", // Menggunakan fixed untuk memastikan posisi tetap
    zIndex: 10, // Pastikan z-index tinggi
    bottom: "150px", // Jarak dari bawah
    right: "20px", // Jarak dari kanan
    transition: "0.5s",
    border: `1px solid ${AccentColor.skyblue}`,
    backgroundColor: AccentColor.softblue,
    padding: 3,
    // maxWidth: "500px", // Batasi lebar maksimum
    // margin: "0 auto", // Pusatkan layout
    borderRadius: "50%",

    // Media query untuk desktop
    [`@media (min-width: 769px)`]: {
      right: "calc(50% - 250px + 20px)", // Sesuaikan dengan lebar container (500px)
    },
  },
}));

export default function ComponentGlobal_CreateButton({
  path,
}: {
  path: string;
}) {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <ActionIcon
        className={classes.button}
        size={"xl"}
        // radius={"xl"}
        // size={"xl"}
        // style={{
        //   position: "fixed", // Menggunakan fixed untuk memastikan posisi tetap
        //   zIndex: 1000, // Pastikan z-index tinggi
        //   bottom: "20px", // Jarak dari bawah
        //   right: "20px", // Jarak dari kanan
        //   transition: "0.5s",
        //   border: `1px solid ${AccentColor.skyblue}`,
        //   backgroundColor: AccentColor.softblue,
        //   padding: 3,
        // }}
        onClick={() => {
          router.push(path);
        }}
      >
        <IconPencilPlus color={MainColor.white} />
      </ActionIcon>
    </>
  );
}
