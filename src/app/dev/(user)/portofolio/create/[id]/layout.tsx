import { CreatePortofolioLayout } from "@/app_modules/katalog/portofolio";
import React from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <>
      <CreatePortofolioLayout profileId={params.id}>
        {children}
      </CreatePortofolioLayout>
    </>
  );
}
