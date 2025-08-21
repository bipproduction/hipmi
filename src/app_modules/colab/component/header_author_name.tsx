"use client";

import { ComponentGlobal_AvatarAndUsername } from "@/app_modules/_global/component";
import { Group, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import moment from "moment";
import "moment/locale/id";

export default function ComponentColab_AuthorNameOnHeader({
  tglPublish,
  profile,
}: {
  tglPublish?: Date;
  profile: any;
}) {
  const router = useRouter();
  return (
    <>
      <ComponentGlobal_AvatarAndUsername
        profile={profile}
        component={
          <Group position="right">
            {tglPublish ? (
              <Text lineClamp={1}>
                {moment(tglPublish).locale("id").format("ll")}
              </Text>
            ) : (
              ""
            )}
          </Group>
        }
      />

      <Stack spacing={"xs"}>
        {/* <Grid>
          <Grid.Col
            span={"content"}
            onClick={() => {
              if (profileId) {
                router.push(RouterProfile.katalogOLD + profileId);
              } else {
                ComponentGlobal_NotifikasiPeringatan("Id tidak ditemukan");
              }
            }}
          >
            <Avatar
              size={30}
              sx={{ borderStyle: "solid", borderWidth: "0.5px" }}
              radius={"xl"}
              bg={"gray.1"}
              src={
                imagesId
                  ? RouterProfile.api_foto_profile + imagesId
                  : "/aset/global/avatar.png"
              }
            />
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Stack justify="center" h={"100%"}>
              <Text lineClamp={1} fz={"sm"} fw={"bold"}>
                {authorName ? authorName : "Nama author"}
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={"content"}>
            <Stack justify="center" h={"100%"}>
              {tglPublish ? (
                <Text >
                  {new Intl.DateTimeFormat("id-ID", {
                    dateStyle: "medium"

                  }).format(tglPublish)}
                </Text>
              ) : (
                ""
              )}
            </Stack>
          </Grid.Col>
        </Grid> */}
      </Stack>
    </>
  );
}
