"use client";
import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import ComponentPortofolio_ButtonMoreNew from "../component/button_more_new";
import { useState } from "react";
import { useShallowEffect } from "@mantine/hooks";
import { apiNewGetUserIdByToken } from "@/app_modules/_global/lib/api_fetch_global";

export default function PortofolioLayoutNew({
  children,
}: {
  children: any;
}) {
  const [userLoginId, setUserLoginId] = useState("");

  useShallowEffect(() => {
    onLoadDataUser();
  }, []);

  async function onLoadDataUser() {
    try {
      const response = await apiNewGetUserIdByToken();
      if (response.success) {
        setUserLoginId(response.userId);
      } else {
        console.error("Error get user id", response.message);
        setUserLoginId("");
      }
    } catch (error) {
      console.error("Error get user id", error);
      setUserLoginId("");
    }
  }

  return (
    <>
      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header
            title="Detail Portofolio"
            customButtonRight={
              <ComponentPortofolio_ButtonMoreNew userLoginId={userLoginId} />
            }
          />
        </UI_NewHeader>
        <UI_NewChildren>{children}</UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
