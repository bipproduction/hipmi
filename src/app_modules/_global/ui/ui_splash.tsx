"use client";

import { Loader, Stack, ThemeIcon } from "@mantine/core";
import UIGlobal_LayoutDefault from "./ui_layout_default";
import { MainColor } from "../color";

export default function UIGlobal_SplashScreen({ icon }: { icon: any }) {
  return (
    <>
      <UIGlobal_LayoutDefault>
        <Stack h={"90vh"} align="center" justify="center" spacing={"xl"}>
          <ThemeIcon variant="transparent" size={300} c={MainColor.white}>
            {icon}
          </ThemeIcon>
          <Loader variant="dots" color={MainColor.white} />
        </Stack>
      </UIGlobal_LayoutDefault>
    </>
  );
}
