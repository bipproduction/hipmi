"use client";

import { MODEL_VOTING } from "@/app_modules/vote/model/interface";
import { Badge, Grid, Stack, Text, Title } from "@mantine/core";
import moment from "moment";

interface Props {
  data: MODEL_VOTING;
}

export function AdminVoting_ComponentDetail({ data }: Props) {
  const cekHari = moment(data.akhirVote).diff(new Date(), "minutes");

  const listData = [
    {
      title: "Username",
      value: data.Author.username,
    },
    {
      title: "Judul",
      value: data.title,
    },
    {
      title: "Deskripsi",
      value: data.deskripsi,
    },
    {
      title: "Awal voting",
      value: moment(data.awalVote).format("DD-MM-YYYY"),
    },
    {
      title: "Akhir voting",
      value: moment(data.akhirVote).format("DD-MM-YYYY"),
    },
    {
      title: "Status",
      value: (
        <Badge variant="light">{data.Voting_Status.name === "Publish" && cekHari < 0 ? "Riwayat" : data.Voting_Status.name}</Badge>
      ),
    },
  ];

  return (
    <>
      <Stack>
        {listData.map((item, index) => (
          <Grid key={index}>
            <Grid.Col span={3}>
              <Text>{item.title}</Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text>:</Text>
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Text>{item.value}</Text>
            </Grid.Col>
          </Grid>
        ))}

        <Grid>
          <Grid.Col span={3}>
            <Text>Daftar Pilihan</Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Text>:</Text>
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Stack>
              {data.Voting_DaftarNamaVote.map((e, i) => (
                <Text key={i}>- {e.value}</Text>
              ))}
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
}
