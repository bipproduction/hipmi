"use client";
import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { apiGetUserProfile } from "@/app_modules/user";
import { ActionIcon } from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { IconDotsVertical } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import DrawerKatalogNew from "../component/drawer_katalog_new";

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
      {/* <UIGlobal_LayoutTamplate
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
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header
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
        </UI_NewHeader>
        <UI_NewChildren>{children}</UI_NewChildren>
      </UI_NewLayoutTamplate>

      <DrawerKatalogNew
        opened={opened}
        close={() => close()}
        userRoleId={userRoleId}
        userId={userLoginId}
      />
    </>
  );
}
