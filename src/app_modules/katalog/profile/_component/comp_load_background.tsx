"use client";

import { APIs } from "@/lib";
import { pathAssetImage } from "@/lib/path_asset_image";
import { RouterImagePreview } from "@/lib";
import { Center, Image, Skeleton } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MainColor } from "@/app_modules/_global/color";

export function Profile_ComponentLoadBackgroundImage({
  fileId,
  size
}: {
  fileId: string;
  size?: number
}) {
  const router = useRouter();
  const [isImage, setIsImage] = useState<boolean | null>(null);
  const [isLoading, setLoading] = useState(false);
  const url = APIs.GET({ fileId: fileId,size: size ? size.toString() : "200" });

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

  if (isImage === null) return <Skeleton h={200} w={"100%"} />;

  if (!isImage)
    return (
      <>
        <Center h={200} bg={MainColor.white} style={{ borderRadius: "10px" }}>
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
            borderColor: MainColor.white,
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
