"use client";

import { AccentColor, MainColor } from "@/app_modules/_global/color";
import {
  UIGlobal_DrawerCustom,
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
  UIGlobal_Modal,
} from "@/app_modules/_global/ui";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Stack,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import React, { useState } from "react";
import { apiGetOneSponsorEventById } from "../../_lib/api_event";
import { useParams } from "next/navigation";
import { clientLogger } from "@/util/clientLogger";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

function LayoutEvent_DetailSponsor({
  children,
  userLoginId,
}: {
  children: React.ReactNode;
  userLoginId: string;
}) {
  const params = useParams<{ id: string }>();
  const [authorId, setAuthorId] = useState<string | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetOneSponsorEventById({
        id: params.id,
      });

      if (respone) {
        setAuthorId(respone.data.authorId);
      }
    } catch (error) {
      clientLogger.error("Error get data sponsor", error);
    }
  }

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Detail Sponsor"
            customButtonRight={
              !authorId ? (
                <CustomSkeleton circle height={30} width={30} />
              ) : authorId == userLoginId ? (
                <ActionIcon
                  variant="transparent"
                  onClick={() => setOpenDrawer(true)}
                >
                  <IconDotsVertical color="white" />
                </ActionIcon>
              ) : (
                ""
              )
            }
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
      <UIGlobal_DrawerCustom
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={
          <Stack align="center" spacing={"xs"}>
            <Flex gap={200} justify={"space-between"}>
              <Box>
                <ActionIcon variant="transparent" c={MainColor.white}>
                  <IconEdit />
                </ActionIcon>
                <Text fz={"sm"} align="center" color={MainColor.white}>
                  Edit
                </Text>
              </Box>
              <Box>
                <Center>
                  <ActionIcon
                    variant="transparent"
                    c={MainColor.white}
                    onClick={() => setOpenModal(true)}
                  >
                    <IconTrash />
                  </ActionIcon>
                </Center>
                <Text fz={"sm"} ta={"center"} color={MainColor.white}>
                  Hapus
                </Text>
              </Box>
            </Flex>
          </Stack>
        }
      />
      <UIGlobal_Modal
        title={"Anda yakin akan menghapus sponsor?"}
        opened={openModal}
        close={() => setOpenModal(false)}
        buttonKiri={
          <Button
            style={{ backgroundColor: AccentColor.blue }}
            c={AccentColor.white}
            radius={"xl"}
            onClick={() => setOpenModal(false)}
          >
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            style={{ backgroundColor: MainColor.red }}
            loading={isLoading ? true : false}
            radius={"xl"}
            c={AccentColor.white}
          >
            Hapus
          </Button>
        }
      />
    </>
  );
}

export default LayoutEvent_DetailSponsor;
