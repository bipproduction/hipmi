import { LayoutDonasi_ProsesTransaksi } from "@/app_modules/donasi";
import React from "react";

export default async function Layout({children}:{children: React.ReactNode}) {
    return<>
    <LayoutDonasi_ProsesTransaksi>{children}</LayoutDonasi_ProsesTransaksi>
    </>
}