import { LayoutUploadProspektusInvestasi } from "@/app_modules/investasi";
import React from "react";

export default async function Layout({children}: {children: React.ReactNode}) {
    return<>
    <LayoutUploadProspektusInvestasi>{children}</LayoutUploadProspektusInvestasi>
    </>
}