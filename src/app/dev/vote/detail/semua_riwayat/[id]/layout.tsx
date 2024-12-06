import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { LayoutVote_DetailSemuaRiwayat } from "@/app_modules/vote";
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
  
  return (
    <>
      <LayoutVote_DetailSemuaRiwayat
        votingId={votingId}
        userLoginId={userLoginId as string}
      >
        {children}
      </LayoutVote_DetailSemuaRiwayat>
    </>
  );
}
