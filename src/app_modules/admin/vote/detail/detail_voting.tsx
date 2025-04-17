"use client";

import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_VOTING } from "@/app_modules/vote/model/interface";
import { SimpleGrid, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import AdminGlobal_ComponentBackButton from "../../_admin_global/back_button";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { AdminVoting_ComponentDetailPublish } from "../component/comp_detail_publish";
import { apiGetOneVotingById } from "../lib/api_fetch_admin_voting";
import { AdminVoting_ComponentDetailReview } from "../component/comp_detail_review";
import { AdminVoting_ComponentDetailReject } from "../component/comp_detail_reject";
import { Admin_V3_ComponentSkeletonBreakpoint } from "../../_components_v3/comp_skeleton_breakpoint";

export function AdminVote_DetailVoting() {
  const param = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_VOTING | null>(null);

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      const response = await apiGetOneVotingById({
        id: param.id,
      });

      if (response) {
        setData(response.data);
      } else {
        setData(null);
      }
    } catch (error) {
      console.log("Error get one data voting admin", error);
    }
  };

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Detail voting" />
        <AdminGlobal_ComponentBackButton />

        {data === undefined || !data && (
          <Admin_V3_ComponentSkeletonBreakpoint skeletonRequest={2}/>
           
        )}

        {data && data.Voting_Status.name === "Publish" ? (
          <AdminVoting_ComponentDetailPublish data={data} />
        ) : data && data.Voting_Status.name === "Review" ? (
          <AdminVoting_ComponentDetailReview data={data} />
        ) : data && data.Voting_Status.name === "Reject" ? (
          <AdminVoting_ComponentDetailReject data={data} />
        ) : (
          ""
        )}
      </Stack>
    </>
  );
}
