"use client";

import { APIs } from "@/lib";
import { pathAssetImage } from "@/lib";
import { RouterImagePreview } from "@/lib/router_hipmi/router_image_preview";
import { AccentColor } from "@/app_modules/_global/color";
import { Avatar, Center, Image, Skeleton } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { CSSProperties, useState } from "react";

export function Profile_ComponentAvatarProfile({
  fileId,
  style,
}: {
  fileId: string;
  style?: CSSProperties;
}) {
  const router = useRouter();
  const [isImage, setIsImage] = useState<boolean | null>(null);
  const [isLoading, setLoading] = useState(false);

  const url = APIs.GET({ fileId: fileId, size: "200" });

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

  if (isImage === null) {
    return (
      <Skeleton
        style={{ borderStyle: "solid", borderColor: AccentColor.darkblue }}
        radius={"50%"}
        h={100}
        w={100}
      />
    );
  }

  if (!isImage) {
    return (
      <>
        <Avatar
          variant="outline"
          size={100}
          bg={"gray"}
          radius={"50%"}
          style={style}
        >
          <Image
            alt="Avatar"
            height={100}
            width={100}
            src={"/aset/global/avatar.png"}
          />
        </Avatar>
      </>
    );
  }

  return (
    <>
      <Center>
        <Avatar
          bg={"white"}
          style={style}
          radius={"50%"}
          size={100}
          src={url}
          opacity={isLoading ? 0.5 : 1}
          onClick={() => {
            router.push(RouterImagePreview.main({ id: fileId }), {
              scroll: false,
            });
            setLoading(true);
          }}
        />
        {isLoading && (
          <Image
            alt="Loader"
            src={pathAssetImage.new_loader}
            height={50}
            width={50}
            style={{
              position: "absolute",
            }}
          />
        )}
      </Center>
    </>
  );
}
