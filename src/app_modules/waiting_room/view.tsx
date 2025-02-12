"use client";

import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global";
import { UIGlobal_LayoutDefault } from "@/app_modules/_global/ui";
import { clientLogger } from "@/util/clientLogger";
import { Button, Skeleton, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentGlobal_CardStyles } from "../_global/component";
import { apiGetACtivationUser } from "../_global/lib/api_user";
import { gs_access_user } from "@/lib/global_state";
import { useAtom } from "jotai";
import { MainColor } from "../_global/color";
import CustomSkeleton from "../components/CustomSkeleton";

export default function WaitingRoom_View({
  userLoginId,
}: {
  userLoginId?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLoadingHome, setIsLoadingHome] = useState(false);

  async function onClickLogout() {
    setLoading(true);
    const res = await fetch(`/api/auth/logout?id=${userLoginId}`, {
      method: "GET",
    });

    const result = await res.json();
    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(result.message);
      router.push("/", { scroll: false });
    }
  }

  const [isAccess, setIsAccess] = useState<boolean | null>(null);
  const [isAccessUser, setIsAccessUser] = useAtom(gs_access_user);

  useShallowEffect(() => {
    if (isAccessUser) {
      setIsAccess(true);
      setIsAccessUser(false);
    }
  }, [isAccessUser]);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetACtivationUser();
      if (respone) {
        setIsAccess(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get cookies user", error);
    }
  }

  return (
    <>
      <UIGlobal_LayoutDefault>
        <Stack justify="cneter" h={"90vh"} mt={"xl"}>
          <ComponentGlobal_CardStyles>
            {_.isNull(isAccess) ? (
              <Stack align="center">
                <CustomSkeleton height={20} width={"100%"} />
                <CustomSkeleton height={20} width={"70%"} />
                <CustomSkeleton height={20} width={"100%"} />
                <CustomSkeleton height={20} width={"70%"} />
              </Stack>
            ) : (
              <Stack align="center">
                <Stack align="center" spacing={5} fs={"italic"}>
                  <Text fw={"bold"} c={"white"} align="center">
                    Permohonan akses Anda sedang dalam proses verifikasi oleh
                    admin.
                  </Text>
                  <Text fw={"bold"} c={"white"} align="center">
                    Harap tunggu, Anda akan menerima pemberitahuan melalui
                    Whatsapp setelah disetujui.
                  </Text>
                </Stack>
                {isAccess && (
                  <Button
                    color="yellow"
                    bg={MainColor.yellow}
                    c={MainColor.darkblue}
                    loaderPosition="center"
                    loading={isLoadingHome}
                    radius={"xl"}
                    onClick={() => {
                      try {
                        setIsLoadingHome(true);
                        router.replace("/", { scroll: false });
                      } catch (error) {
                        clientLogger.error("Error button to home", error);
                      } finally {
                        setIsLoadingHome(false);
                      }
                    }}
                  >
                    Home
                  </Button>
                )}
              </Stack>
            )}
          </ComponentGlobal_CardStyles>
        </Stack>
      </UIGlobal_LayoutDefault>
    </>
  );
}
