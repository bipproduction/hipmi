"use client";

import { Badge, Center, Stack } from "@mantine/core";
import ComponentVote_DetailDataSetelahPublish from "../../component/detail/detail_data_setelah_publish";
import ComponentVote_HasilVoting from "../../component/detail/detail_hasil_voting";
import { MODEL_VOTING } from "../../model/interface";
import { apiGetOneVotingById } from "../../_lib/api_voting";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useShallowEffect } from "@mantine/hooks";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function Vote_DetailPublish() {
  const { id } = useParams();
  const [data, setData] = useState<MODEL_VOTING | null>();

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const response = await apiGetOneVotingById({ id: id as string });
      if (response) {
        setData(response.data);
      } else {
        setData(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!data) return <CustomSkeleton height={400} />;

  return (
    <>
      <Stack py={"md"}>
        <Center>
          <Badge color={data?.isArsip ? "gray" : "green"}>
            {data?.isArsip ? "Arsip" : "Publish"}
          </Badge>
        </Center>
        <ComponentVote_DetailDataSetelahPublish data={data as any} />
        <ComponentVote_HasilVoting data={data?.Voting_DaftarNamaVote} />
      </Stack>
    </>
  );
}
