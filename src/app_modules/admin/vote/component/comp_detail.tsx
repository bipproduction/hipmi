"use client";

import { Comp_V3_SetInnerHTMLWithStiker } from "@/app_modules/_global/component/new/comp_V3_set_html_with_stiker";
import { MODEL_VOTING } from "@/app_modules/vote/model/interface";
import { Badge, Stack, Text } from "@mantine/core";
import moment from "moment";
import { Admin_V3_ComponentDetail } from "../../_components_v3/comp_detail_data";

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
      value: <Comp_V3_SetInnerHTMLWithStiker props={data.deskripsi} />,
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
        <Badge variant="light">
          {data.Voting_Status.name === "Publish" && cekHari < 0
            ? "Riwayat"
            : data.Voting_Status.name}
        </Badge>
      ),
    },
  ];

  return (
    <>
      <Stack>
        {listData.map((item, index) => (
          <Admin_V3_ComponentDetail item={item} key={index} />
        ))}
        <Admin_V3_ComponentDetail
          item={{
            label: <Text>Daftar Pilihan</Text>,
            value: (
              <Stack>
                {data.Voting_DaftarNamaVote.map((e, i) => (
                  <Text key={i}>- {e.value}</Text>
                ))}
              </Stack>
            ),
          }}
        />
      </Stack>
    </>
  );
}
