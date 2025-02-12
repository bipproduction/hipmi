"use client";

import { pathAssetImage } from "@/lib";
import { RouterImagePreview } from "@/lib/router_hipmi/router_image_preview";
import { RouterProfile } from "@/lib/router_hipmi/router_katalog";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_LoaderAvatar } from "@/app_modules/_global/component";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import {
  Avatar,
  Box,
  Button,
  Center,
  Grid,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import { IconCircleFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function ComponentForum_ViewForumProfile({
  auhtorSelectedData,
  totalPosting,
}: {
  auhtorSelectedData: MODEL_USER;
  totalPosting: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  return (
    <>
      <Center>
        <Box
          h={100}
          style={{ borderRadius: "50%" }}
          onClick={() => {
            router.push(
              RouterImagePreview.main({
                id: auhtorSelectedData.Profile.imageId as any,
              }),
              { scroll: false }
            );
            setIsLoadingImage(true);
          }}
        >
          {isLoadingImage ? (
            <Avatar
              size={100}
              radius={"100%"}
              style={{
                borderColor: "white",
                borderStyle: "solid",
                borderWidth: "1px",
              }}
              opacity={0.7}
            >
              <ComponentGlobal_LoaderAvatar
                sizeAvatar={100}
                fileId={auhtorSelectedData.Profile.imageId as any}
              />
              <Image
                pos={"absolute"}
                height={50}
                width={50}
                alt="Photo"
                src={pathAssetImage.new_loader}
              />
            </Avatar>
          ) : (
            <ComponentGlobal_LoaderAvatar
              sizeAvatar={100}
              fileId={auhtorSelectedData.Profile.imageId as any}
            />
          )}
        </Box>
      </Center>
      <Grid>
        <Grid.Col span={"auto"}>
          <Stack spacing={0}>
            <Text lineClamp={1} fw={"bold"} color={"white"}>
              {auhtorSelectedData?.Profile?.name}
            </Text>
            <Grid gutter={"xs"}>
              <Grid.Col span={"content"}>
                <Text lineClamp={1} color={"white"} fz={"sm"}>
                  {totalPosting} Posting <IconCircleFilled size={5} />
                </Text>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text lineClamp={1} color={"white"} fz={"sm"}>
                  @{auhtorSelectedData?.username}
                  {""}
                </Text>
              </Grid.Col>
            </Grid>
          </Stack>
        </Grid.Col>
        <Grid.Col span={5}>
          <Stack align="center" justify="center" h={"100%"}>
            <Button
              style={{
                border: `1px solid ${AccentColor.yellow}`,
                backgroundColor: MainColor.yellow,
              }}
              c="black"
              loaderPosition="center"
              loading={loading ? true : false}
              radius={"xl"}
              variant="outline"
              onClick={() => {
                setLoading(true);
                router.push(
                  RouterProfile.katalogOLD + auhtorSelectedData?.Profile?.id
                );
              }}
            >
              Kunjungi Profile
            </Button>
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
}
