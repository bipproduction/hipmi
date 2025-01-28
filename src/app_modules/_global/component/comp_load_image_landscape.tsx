"use client";

import { APIs } from "@/app/lib";
import { pathAssetImage } from "@/app/lib/path_asset_image";
import { RouterImagePreview } from "@/app/lib";
import { Center, Image } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MainColor } from "../color";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export function ComponentGlobal_LoadImageLandscape({
  fileId,
}: {
  fileId: string;
}) {
  const router = useRouter();
  const [isImage, setIsImage] = useState<boolean | null>(null);
  const [isLoading, setLoading] = useState(false);
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

  if (isImage === null) return <CustomSkeleton h={200} w={"100%"} />;

  if (!isImage)
    return (
      <>
        <Center h={200} bg={MainColor.white} style={{ borderRadius: "5px", borderColor: MainColor.white }}>
          <Image
            alt="No Image"
            maw={150}
            m={"auto"}
            p={"xs"}
            src={pathAssetImage.no_image}
          />
        </Center>
      </>
    );

  return (
    <>
      <Center>
        <Image

          onClick={() => {
            setLoading(true);
            router.push(RouterImagePreview.main({ id: fileId }), {
              scroll: false,
            });
          }}
          style={{
            borderColor: "white",
            borderStyle: "solid",
            borderWidth: "1px",
            borderRadius: "5px",
          }}
          radius={"4px"}
          height={200}
          alt="Image"
          opacity={isLoading ? 0.5 : 1}
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
