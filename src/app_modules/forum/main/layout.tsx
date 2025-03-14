"use client";

import { ComponentGlobal_LoaderAvatar } from "@/app_modules/_global/component";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import { apiGetUserById } from "@/app_modules/_global/lib/api_user";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import { RouterForum } from "@/lib/router_hipmi/router_forum";
import { clientLogger } from "@/util/clientLogger";
import { ActionIcon, Avatar, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LayoutForum_Main({
  userLoginId,
  children,
}: {
  userLoginId: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_USER | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      const response = await apiGetUserById({
        id: userLoginId,
      });

      if (response) {
        setData(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get user", error);
    }
  };

  return (
    <>
      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header
            title="Forum"
            iconRight={
              !data ? (
                <CustomSkeleton height={30} width={30} circle />
              ) : (
                <ActionIcon
                  radius={"xl"}
                  variant="transparent"
                  onClick={() => {
                    setIsLoading(true);
                    router.push(RouterForum.forumku + data?.id);
                  }}
                >
                  {isLoading ? (
                    <Avatar
                      size={30}
                      radius={"100%"}
                      style={{
                        borderColor: "white",
                        borderStyle: "solid",
                        borderWidth: "1px",
                      }}
                    >
                      <ComponentGlobal_Loader variant="dots" />
                    </Avatar>
                  ) : (
                    <ComponentGlobal_LoaderAvatar
                      fileId={data.Profile.imageId as any}
                      sizeAvatar={30}
                    />
                  )}
                </ActionIcon>
              )
            }
          />
        </UI_NewHeader>
       
        <UI_NewChildren>{children}</UI_NewChildren>
      </UI_NewLayoutTamplate>

      {/* <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Forum"
            iconRight={
              !data ? (
                <CustomSkeleton height={30} width={30} circle />
              ) : (
                <ActionIcon
                  radius={"xl"}
                  variant="transparent"
                  onClick={() => {
                    setIsLoading(true);
                    router.push(RouterForum.forumku + data?.id);
                  }}
                >
                  {isLoading ? (
                    <Avatar
                      size={30}
                      radius={"100%"}
                      style={{
                        borderColor: "white",
                        borderStyle: "solid",
                        borderWidth: "1px",
                      }}
                    >
                      <ComponentGlobal_Loader variant="dots" />
                    </Avatar>
                  ) : (
                    <ComponentGlobal_LoaderAvatar
                      fileId={data.Profile.imageId as any}
                      sizeAvatar={30}
                    />
                  )}
                </ActionIcon>
              )
            }
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate> */}
    </>
  );
}
