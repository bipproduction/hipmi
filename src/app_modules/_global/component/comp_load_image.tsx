"use client";

import { APIs } from "@/lib";
import { pathAssetImage } from "@/lib/path_asset_image";
import { RouterImagePreview } from "@/lib/router_hipmi/router_image_preview";
import { Center, Image, Skeleton } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

type IRadius = "xs" | "sm" | "md" | "lg" | "xl";
export function ComponentGlobal_LoadImage({
  fileId,
  maw,
  h,
  radius,
}: {
  fileId: string;
  maw?: number | string;
  h?: number;
  radius?: IRadius;
}) {
  const router = useRouter();
  const [isImage, setIsImage] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    return (
     
      <Center h={"100%"}>
        <Skeleton h={250} radius={"sm"} w={250} />
      </Center>
    );

  if (!isImage)
    return (
      <>
        <Center h={250}>
          <Image alt="No Image" maw={150} src={pathAssetImage.no_image} />
        </Center>
      </>
    );

  return (
    <>
      <Center h={"100%"}>
        <Image
          onClick={() => {
            setIsLoading(true);
            router.push(RouterImagePreview.main({ id: fileId }), {
              scroll: false,
            });
          }}
          opacity={isLoading ? 0.5 : 1}
          radius={radius ? radius : 0}
          alt="Image"
          height={h ? h : 250}
          maw={maw ? maw : 200}
          miw={200}
          src={url}
        />

        {isLoading ? (
          <Image
            alt="Loader"
            src={pathAssetImage.new_loader}
            height={50}
            width={50}
            style={{
              position: "absolute",
            }}
          />
        ) : (
          ""
        )}
      </Center>
    </>
  );
}
