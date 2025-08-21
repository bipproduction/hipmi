"use client";

import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import {
    AccentColor,
    MainColor,
} from "@/app_modules/_global/color/color_pallet";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { AspectRatio, Box, Image, Paper } from "@mantine/core";

export function LayoutDonasi_BuktiTransfer({ imageId }: { imageId: string }) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Bukti Transfer" />}
      >
        <ViewBuktiTransfer imageId={imageId} />
      </UIGlobal_LayoutTamplate>
    </>
  );
}

function ViewBuktiTransfer({ imageId }: { imageId: string }) {
  return (
    <>
      <Paper
        style={{
          backgroundColor: MainColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          padding: "15px",
          borderRadius: "10px",
        }}
      >
        <AspectRatio ratio={1 / 1} mah={400}>
          <Box>
            <Image
              p={"md"}
              width={250}
              alt="Foto"
              src={RouterDonasi.api_gambar_pencairan + `${imageId}`}
            />
          </Box>
        </AspectRatio>
      </Paper>
    </>
  );
}
