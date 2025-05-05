import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { LayoutColab_MainDetail } from "@/app_modules/colab";
import colab_getOneCollaborationById from "@/app_modules/colab/fun/get/get_one_by_id";
import React from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const colabId = params.id;
  const userLoginId = await funGetUserIdByToken();

  const dataColab = await colab_getOneCollaborationById(colabId);
  const authorId = dataColab?.Author?.id;

  return (
    <>
      <LayoutColab_MainDetail
        colabId={colabId}
        isAuthor={authorId === userLoginId ? true : false}
      >
        {children}
      </LayoutColab_MainDetail>
    </>
  );
}
