import { LayoutDetailMainDonasiNew } from "@/app_modules/donasi";
import React from "react";

export default async function Layout({ children, params, }: { children: React.ReactNode; params: { id: string }; }) {
  // const donasiId = params.id;
  // const getData = await Donasi_getOneById(donasiId);
  // const authorId = getData?.authorId;
  // const userLoginId = await funGetUserIdByToken();

  return (
    <>
      {/* <LayoutDetailMainDonasi
        donasiId={donasiId}
        authorId={authorId as any}
        userLoginId={userLoginId as string}
      >
        {children}
      </LayoutDetailMainDonasi> */}

      <LayoutDetailMainDonasiNew>
        {children}
      </LayoutDetailMainDonasiNew>
    </>
  );
}
