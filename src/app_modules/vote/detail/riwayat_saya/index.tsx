"use client";

import { Stack } from "@mantine/core";
import ComponentVote_DaftarKontributorVoter from "../../component/detail/detail_daftar_kontributor";
import ComponentVote_DetailDataSetelahPublish from "../../component/detail/detail_data_setelah_publish";
import ComponentVote_HasilVoting from "../../component/detail/detail_hasil_voting";
import { MODEL_VOTING } from "../../model/interface";
import { clientLogger } from "@/util/clientLogger";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  apiGetOneVotingById,
  apiGetHasilVotingById,
} from "../../_lib/api_voting";
import { Voting_ComponentSkeletonDetail } from "../../component/skeleton_view";

export default function Vote_DetailRiwayatSaya() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_VOTING | null>(null);
  const [hasil, setHasil] = useState<any[] | null>(null);

  useShallowEffect(() => {
    onLoadData();
    onLoadHasil();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetOneVotingById({
        id: params.id,
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get data detail", error);
    }
  }

  async function onLoadHasil() {
    try {
      const respone = await apiGetHasilVotingById({
        id: params.id,
      });

      if (respone) {
        setHasil(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get data hasil voting", error);
    }
  }

  if (_.isNull(data) || _.isNull(hasil)) {
    return <Voting_ComponentSkeletonDetail />;
  }

  return (
    <>
      <Stack pb={"md"}>
        <ComponentVote_DetailDataSetelahPublish
          data={data}
          authorName={true}
        />
        <ComponentVote_HasilVoting data={hasil} />
        {/* <ComponentVote_DaftarKontributorVoter
          listKontributor={listKontributor}
        /> */}
      </Stack>
    </>
  );
}
