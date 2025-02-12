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

export default function LayoutForum_Main({
  children,
  dataAuthor,
}: {
  children: React.ReactNode;
  dataAuthor: MODEL_USER;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Forum"
            iconRight={
              <ActionIcon
                radius={"xl"}
                variant="transparent"
                onClick={() => {
                  setIsLoading(true);
                  router.push(RouterForum.forumku + dataAuthor?.id);
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
                    fileId={dataAuthor.Profile.imageId as any}
                    sizeAvatar={30}
                  />
                )}
              </ActionIcon>
            }
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
