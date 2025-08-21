"use client";

import { AccentColor, MainColor } from "@/app_modules/_global/color/color_pallet";
import {
  Avatar,
  Card,
  Center,
  Grid,
  Stack,
  Text,
  Title
} from "@mantine/core";
import { MODEL_VOTING_DAFTAR_NAMA_VOTE } from "../../model/interface";

export default function ComponentVote_HasilVoting({
  data,
}: {
  data?: MODEL_VOTING_DAFTAR_NAMA_VOTE[];
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
        <Card.Section>
          <Stack>
            <Center>
              <Title order={5}>Hasil Voting</Title>
            </Center>

            <Grid justify="center">
              {data?.map((e) => (
                <Grid.Col key={e.id} span={data?.length >= 4 ? 6 : 4}>
                  <Stack align="center">
                    <Avatar
                      radius={100}
                      size={70}
                      variant="outline"
                      color="yellow"
                    >
                      <Text>{e.jumlah}</Text>
                    </Avatar>
                    <Text fz={"xs"} align="center">
                      {e.value}
                    </Text>
                  </Stack>
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        </Card.Section>
      </Card>
    </>
  );
}
