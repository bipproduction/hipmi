"use client";

import { AccentColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { clientLogger } from "@/util/clientLogger";
import { Badge, Center, Stack, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import moment from "moment";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  apiGetHasilVotingById,
  apiGetOneVotingById,
} from "../../_lib/api_voting";
import ComponentVote_HasilVoting from "../../component/detail/detail_hasil_voting";
import { Voting_ComponentSkeletonDetail } from "../../component/skeleton_view";
import { MODEL_VOTING } from "../../model/interface";
import ComponentVote_DetailDataSetelahPublish from "../../component/detail/detail_data_setelah_publish";

export default function Vote_DetailKontribusi() {
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

  if (_.isNull(data) && _.isNull(hasil)) {
    return (
      <>
        <Voting_ComponentSkeletonDetail />
      </>
    );
  }

  return (
    <>
      <Stack pb={"md"}>
        <ComponentVote_DetailDataSetelahPublish
          data={data as any}
          authorName={true}
        />
        <ComponentVote_HasilVoting data={hasil as any} />
      </Stack>
    </>
  );
}
