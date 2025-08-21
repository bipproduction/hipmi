"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ComponentKatalog_ButtonHeaderRight } from "../component/button_header_right";

export default function KatalogLayout({
  children,
  profileId,
  userLoginId,
  authorId,
  userRoleId,
}: {
  children: any;
  profileId: any;
  userLoginId: string;
  authorId: string;
  userRoleId: string
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="KATALOG"
            customButtonRight={
              <ComponentKatalog_ButtonHeaderRight
                profileId={profileId}
                userLoginId={userLoginId}
                authorId={authorId as any}
                userRoleId={userRoleId}
              />
            }
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
