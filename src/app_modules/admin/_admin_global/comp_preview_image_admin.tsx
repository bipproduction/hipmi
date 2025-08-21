"use client";

import { Box, Center, Image, ScrollArea, Skeleton, Stack, Text } from "@mantine/core";
import Admin_ComponentBackButton from "./back_button";
import { APIs, pathAssetImage } from "@/lib";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export function Admin_ComponentPreviewImageAdmin({
  fileId,
  size,
}: {
  fileId: string;
  size?: string;
}) {
  const [isImage, setIsImage] = useState<boolean | null>(null);

  const url = APIs.GET({ fileId: fileId, size: size || "1000" });

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
      <Stack>
        <Admin_ComponentBackButton />
        <Box style={{ zIndex: 0 }} h={"80vh"} pos={"static"} px={"lg"}>
          {isImage === null ? (
            <Center>
              <CustomSkeleton height={500} w={300} radius={"sm"} />
            </Center>
          ) : isImage ? (
            <Center>
              <Image alt="Image" src={url} maw={300} />
            </Center>
          ) : (
            // <ScrollArea h={"100%"}>
            //   <Center>
            //   </Center>
            // </ScrollArea>
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
      </Stack>
    </>
  );
}
