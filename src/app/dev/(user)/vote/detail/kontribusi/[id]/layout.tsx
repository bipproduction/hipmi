import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { LayoutVote_DetailKontribusi } from "@/app_modules/vote";
import { voting_funGetOneVotingbyId } from "@/app_modules/vote/fun/get/fun_get_one_by_id";
import React from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const votingId = params.id;
  const userLoginId = await funGetUserIdByToken();
  const dataVoting = await voting_funGetOneVotingbyId(votingId);

  return (
    <>
      <LayoutVote_DetailKontribusi
        votingId={votingId}
        userLoginId={userLoginId as string}
        dataVoting={dataVoting}
      >
        {children}
      </LayoutVote_DetailKontribusi>
    </>
  );
}
