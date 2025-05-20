import { LayoutEvent_Edit } from "@/app_modules/event";
import React from "react";

export default async function Layout({children}: {children: React.ReactNode}) {
    return <>
    <LayoutEvent_Edit>{children}</LayoutEvent_Edit>
    </>
}