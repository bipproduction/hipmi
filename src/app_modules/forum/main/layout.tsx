"use client";

import { RouterForum } from "@/lib/router_hipmi/router_forum";
import { ComponentGlobal_LoaderAvatar } from "@/app_modules/_global/component";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import { ActionIcon, Avatar } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetUserById } from "@/app_modules/_global/lib/api_user";
import { clientLogger } from "@/util/clientLogger";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

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
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Forum"
            iconRight={
              !data ? (
                <CustomSkeleton height={30} width={30} circle/>
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
      </UIGlobal_LayoutTamplate>
    </>
  );
}
