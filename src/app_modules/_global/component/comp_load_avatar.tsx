"use client";

import { Avatar, Skeleton } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import ComponentGlobal_Loader from "./loader";
import { APIs } from "@/app/lib";

export function ComponentGlobal_LoaderAvatar({
  fileId,
  imageSize,
  sizeAvatar,
}: {
  fileId: string;
  imageSize?: string;
  sizeAvatar?: number;
}) {
  const [isImage, setIsImage] = useState<boolean | null>(null);

  const url = APIs.GET({ fileId: fileId, size: imageSize ? imageSize : "400" });

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
        // <Avatar size={sizeAvatar ? sizeAvatar : 40} radius={"100%"}>
        //   <ComponentGlobal_Loader />
        // </Avatar>
        <Avatar
          size={sizeAvatar ? sizeAvatar : 40}
          radius={"100%"}
          style={{
            borderColor: "white",
            borderStyle: "solid",
            borderWidth: "1px",
          }}
        >
          <ComponentGlobal_Loader />
        </Avatar>
      ) : (
        <Avatar
          size={sizeAvatar ? sizeAvatar : 40}
          radius={"100%"}
          src={isImage ? url : "/aset/global/avatar.png"}
          style={{
            borderColor: "white",
            borderStyle: "solid",
            borderWidth: "1px",
          }}
        />
      )}
    </>
  );
}
