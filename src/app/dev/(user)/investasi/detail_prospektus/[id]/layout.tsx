// -- DELETE SOON -- //
import { LayoutDetailPropektus } from "@/app_modules/investasi";
import React from "react";

export default async function Layout({children}: {children: React.ReactNode}) {
    return<>
    <LayoutDetailPropektus>{children}</LayoutDetailPropektus>
    </>
}