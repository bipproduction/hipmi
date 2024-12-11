"use client";

import { APIs } from "@/app/lib";
import { pathAssetImage } from "@/app/lib/path_asset_image";
import {
    ActionIcon,
    Box,
    Center,
    Container,
    Image,
    rem,
    Skeleton
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MainColor } from "../color";
import UIGlobal_LayoutHeaderTamplate from "./ui_header_tamplate";
import { UIHeader } from "./ui_layout_tamplate";

export function UIGlobal_NotUserImagePreview({ fileId }: { fileId: string }) {
  const router = useRouter();
  const [isImage, setIsImage] = useState<boolean | null>(null);

  const url = APIs.GET({ fileId: fileId, size: "500" });

  useShallowEffect(() => {
    onLoadImage();
  }, []);

  async function onLoadImage() {
    const res = await fetch(url);
    try {
      if (res.ok) {
        return setIsImage(true);
      }
      setIsImage(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Box
        w={"100%"}
        h={"100%"}
        style={{
          overflowY: "auto",
          overflowX: "auto",
          backgroundColor: MainColor.black,
          position: "fixed",
        }}
      >
        <Container mih={"100vh"} p={0} size={rem(500)} bg={MainColor.darkblue}>
          <UIHeader
            header={
              <UIGlobal_LayoutHeaderTamplate
                title="Preview Image"
                hideButtonLeft
                customButtonRight={
                  <ActionIcon
                    onClick={() => router.back()}
                    variant="transparent"
                  >
                    <IconX color={MainColor.yellow} />
                  </ActionIcon>
                }
              />
            }
          />

          <Box style={{ zIndex: 0 }} h={"92vh"} pos={"static"} px={"lg"}>
            {isImage === null ? (
              <Skeleton height={200} radius={"sm"} />
            ) : isImage ? (
              <Center>
                <Image alt="Image" src={url} maw={400} miw={200} />
              </Center>
            ) : (
              <Box
                bg={"gray"}
                style={{
                  borderColor: "white",
                  borderStyle: "solid",
                  borderWidth: "0.5px",
                  borderRadius: "5px",
                  height: 300,
                }}
              >
                <Center h={"100%"}>
                  <Image
                    alt="Image"
                    height={100}
                    width={100}
                    src={pathAssetImage.no_image}
                  />
                </Center>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
