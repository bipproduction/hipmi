"use client";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import {
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { apiGetUserProfile } from "@/app_modules/user";
import { ActionIcon, Skeleton } from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { IconDotsVertical } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import DrawerKatalogNew from "../component/drawer_katalog_new";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function LayoutKatalogNew({
  children,
  userLoginId,
}: {
  children: any;
  userLoginId: string;
}) {
  const param = useParams<{ id: string }>();
  const [authorId, setAuthorId] = useState("");
  const [userRoleId, setUserRoleId] = useState("");
  const [opened, { open, close }] = useDisclosure();
  const [loading, setLoading] = useState(true);

  async function getProfile() {
    try {
      setLoading(true);
      const response = await apiGetUserProfile(`?profile=${param.id}`);

      if (response) {
        setAuthorId(response.data.id);
        setUserRoleId(response.data.masterUserRoleId);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useShallowEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="KATALOG"
            customButtonRight={
              loading ? (
                <ActionIcon disabled variant="transparent">
                  <CustomSkeleton h={20} w={20} radius={"100%"} />
                </ActionIcon>
              ) : authorId == userLoginId ? (
                <ActionIcon
                  c="white"
                  variant="transparent"
                  onClick={() => open()}
                >
                  <IconDotsVertical />
                </ActionIcon>
              ) : (
                <ActionIcon disabled variant="transparent"></ActionIcon>
              )
            }
          />
        }
      >
        {children}
        <DrawerKatalogNew
          opened={opened}
          close={() => close()}
          userRoleId={userRoleId}
          userId={userLoginId}
        />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
