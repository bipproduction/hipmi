"use client";

import { APIs, pathAssetImage } from "@/app/lib";
import { RouterImagePreview } from "@/app/lib/router_hipmi/router_image_preview";
import { Box, Center, Image, Skeleton } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ComponentMap_LoadImageMap({
  fileId,
  size,
}: {
  fileId: string;
  size?: string;
}) {
  const router = useRouter();
  const [isImage, setIsImage] = useState<boolean | null>(null);

  const url = APIs.GET({ fileId: fileId, size: size ? size : "400" });

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
      {isImage === null ? (
        <Skeleton height={200} radius={"sm"} />
      ) : isImage ? (
        <Image
          onClick={() =>
            router.push(RouterImagePreview.main({ id: fileId }), {
              scroll: false,
            })
          }
          style={{
            borderColor: "white",
            borderStyle: "solid",
            borderWidth: "0.5px",
            borderRadius: "5px",
          }}
          radius={5}
          alt="Image"
          maw={500}
          miw={300}
          height={200}
          src={url}
        />
      ) : (
        <Box
          bg={"gray"}
          style={{
            borderColor: "white",
            borderStyle: "solid",
            borderWidth: "0.5px",
            borderRadius: "5px",
            height: 200,
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
    </>
  );
}
