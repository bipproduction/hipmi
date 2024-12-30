"use client";
import { AccentColor, MainColor } from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { Badge, Center, Group, Stack, Text, Title } from "@mantine/core";
import { MODEL_VOTING } from "../../model/interface";

export default function ComponentVote_DetailDataSetelahPublish({
  data,
  authorName,
}: {
  data?: MODEL_VOTING;
  authorName?: boolean;
}) {
  return (
    <>
      <ComponentGlobal_CardStyles marginBottom={"0px"}>
        <Stack>
          {authorName ? (
            <ComponentGlobal_AvatarAndUsername
              profile={data?.Author.Profile as any}
            />
          ) : (
            ""
          )}
          <Stack spacing={"lg"}>
            <Center>
              <Title order={4} align="center">
                {data?.title}
              </Title>
            </Center>
            <Text>{data?.deskripsi}</Text>

            <Stack spacing={0} pb={authorName ? 0 : "xs"}>
              <Stack align="center" spacing={"xs"}>
                <Text fz={10} fw={"bold"}>
                  Batas Voting
                </Text>
                <Badge
                  styles={{
                    root: {
                      backgroundColor: AccentColor.blue,
                      border: `1px solid ${AccentColor.skyblue}`,
                      color: MainColor.white,
                      width: "80%",
                    },
                  }}
                >
                  <Group>
                    <Text>
                      {data?.awalVote.toLocaleDateString(["id-ID"], {
                        dateStyle: "medium",
                      })}
                    </Text>
                    <Text>-</Text>
                    <Text>
                      {data?.akhirVote.toLocaleDateString(["id-ID"], {
                        dateStyle: "medium",
                      })}
                    </Text>
                  </Group>
                </Badge>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
