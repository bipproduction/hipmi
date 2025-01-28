"use client";
import {
  Badge,
  Card,
  Center,
  Group,
  Stack,
  Text,
  Title
} from "@mantine/core";
import { IconCircle } from "@tabler/icons-react";
import { MODEL_VOTING } from "../../model/interface";
import { AccentColor, MainColor } from "@/app_modules/_global/color/color_pallet";

export default function ComponentVote_DetailDataSebelumPublish
({
  data,
}: {
  data?: MODEL_VOTING;
}) {
  return (
    <>
      <Card
        p={30}
        style={{
          backgroundColor: AccentColor.darkblue,
          borderRadius: "10px",
          border: `2px solid ${AccentColor.blue}`,
          color: MainColor.white,
        }}
      >
        <Card.Section px={"xs"}>
          <Stack spacing={"lg"}>
            <Center>
              <Title align="center" order={4}>
                {data?.title}
              </Title>
            </Center>
            <Text>{data?.deskripsi}</Text>

            <Stack spacing={0} align="center">
              <Center>
                <Text fz={10} fw={"bold"}>
                  Batas Voting
                </Text>
              </Center>
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
        </Card.Section>
        <Card.Section py={40}>
          <Text fz={10} fw={"bold"}>
            Pilihan :
          </Text>
          <Stack spacing={"xs"}>
            {data?.Voting_DaftarNamaVote.map((e) => (
              <Group key={e.id}>
                <Text>
                  <IconCircle size={10} />
                </Text>
                <Text truncate>{e.value}</Text>
              </Group>
            ))}
          </Stack>
        </Card.Section>
      </Card>
    </>
  );
}
