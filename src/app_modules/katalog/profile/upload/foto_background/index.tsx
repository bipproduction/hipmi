"use client";

import { APIs } from "@/lib";
import {
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_ButtonUploadFileImage,
} from "@/app_modules/_global/component";
import { AspectRatio, Center, Image, Stack } from "@mantine/core";
import { useState } from "react";
import { Profile_ComponentButtonUpdateBackgroundProfile } from "../../_component";
import { MODEL_PROFILE } from "../../model/interface";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetOneProfileById } from "../../lib/api_fetch_profile";
import { useParams } from "next/navigation";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function Profile_UpdateFotoBackground() {
  const param = useParams<{ id: string }>();
  const profileId = param.id;
  const [profile, setProfile] = useState<MODEL_PROFILE | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<any | null>(null);

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      const response = await apiGetOneProfileById({ id: profileId });
      if (response && response.success) {
        setProfile(response.data);
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.log("Error get profile", error);
      setProfile(null);
    }
  };

  if (!profile)
    return <CustomSkeleton height={300} width={"100%"} radius={"md"} />;

  return (
    <>
      <Stack px={"xs"}>
        <ComponentGlobal_BoxUploadImage>
          <AspectRatio ratio={1 / 1} mt={5} maw={300} mx={"auto"}>
            <Image
              style={{ maxHeight: 250 }}
              alt="Background"
              src={
                image
                  ? image
                  : APIs.GET({
                      fileId: profile.imageBackgroundId as any,
                      size: "400",
                    })
              }
            />
          </AspectRatio>
        </ComponentGlobal_BoxUploadImage>
        <Center>
          <ComponentGlobal_ButtonUploadFileImage
            onSetFile={setFile}
            onSetImage={setImage}
          />
        </Center>

        <Profile_ComponentButtonUpdateBackgroundProfile
          file={file as any}
          profileId={profile.id}
          fileId={profile.imageBackgroundId as string}
        />
      </Stack>
    </>
  );
}
