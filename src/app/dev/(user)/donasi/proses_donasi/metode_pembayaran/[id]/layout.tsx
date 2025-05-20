import { LayoutDonasi_MetodePembayaran } from "@/app_modules/donasi";
import React from "react";

export default async function Layout({children}: {children: React.ReactNode}) {
    return<>
    <LayoutDonasi_MetodePembayaran>{children}</LayoutDonasi_MetodePembayaran>
    </>
}