"use client"

import { RouterDonasi } from "@/lib/router_hipmi/router_donasi"
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate"
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate"
import React from "react"

export default function LayoutDetailDonasiSaya({children}: {children: React.ReactNode}){
    return<>
    <UIGlobal_LayoutTamplate
    header={<UIGlobal_LayoutHeaderTamplate title="Detail Donasi Saya" routerLeft={RouterDonasi.main_donasi_saya} />}
    >
        {children}
    </UIGlobal_LayoutTamplate>
    </>
}