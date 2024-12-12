"use client";

import { Box, Center, Image, ScrollArea, Skeleton, Stack, Text } from "@mantine/core";
import AdminGlobal_ComponentBackButton from "./back_button";
import { APIs, pathAssetImage } from "@/app/lib";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";

export function Admin_ComponentPreviewImageAdmin({
  fileId,
}: {
  fileId: string;
}) {
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
      <Stack>
        <AdminGlobal_ComponentBackButton />
        <Box style={{ zIndex: 0 }} h={"90vh"} pos={"static"} px={"lg"}>
          {isImage === null ? (
            <Center>
              <Skeleton height={300} w={200} radius={"sm"} />
            </Center>
          ) : isImage ? (
            <ScrollArea h={"100%"}>
              <Center>
                <Image alt="Image" src={url} maw={500} miw={200} />
              </Center>
            </ScrollArea>
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
      </Stack>
    </>
  );
}
