"use client";

import { APIs } from "@/app/lib";
import { pathAssetImage } from "@/app/lib/path_asset_image";
import { Center, Image, Skeleton } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ComponentGlobal_LoadImageCustom({
  fileId,
  height,
}: {
  fileId: string;
  height: number;
}) {
  const [isImage, setIsImage] = useState<boolean | null>(null);
  const url = APIs.GET({ fileId: fileId, size: "500" });

  useShallowEffect(() => {
    onLoadImage();
  }, []);

  async function onLoadImage() {
    try {
      const res = await fetch(url);
      if (res.ok) {
        return setIsImage(true);
      }
      setIsImage(false);
    } catch (error) {
      console.log(error);
    }
  }

  if (isImage === null)
    return <Skeleton h={height ? height : 100} w={"100%"} />;

  return (
    <>
      {isImage ? (
        <Image alt="No Image" height={height} src={url} radius={"sm"} />
      ) : (
        <Center
          bg={"white"}
          p={"sm"}
          h={height ? height : 80}
          style={{ borderRadius: "5px" }}
        >
          <Image
            alt="No Image"
            height={50}
            width={50}
            src={pathAssetImage.no_image}
          />
        </Center>
      )}
    </>
  );
}
