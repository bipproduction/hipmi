"use client";

import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global";
import { UIGlobal_LayoutDefault } from "@/app_modules/_global/ui";
import { clientLogger } from "@/util/clientLogger";
import { Skeleton, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentGlobal_CardStyles } from "../_global/component";
import { apiGetACtivationUser } from "../_global/lib/api_user";

export default function WaitingRoom_View({
  userLoginId,
}: {
  userLoginId?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  const [data, setData] = useState<boolean | null>(null);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetACtivationUser();
      if (respone) {
        setData(respone.data);
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
            {_.isNull(data) ? (
              <Stack>
                {Array.from(new Array(4)).map((e, i) => (
                  <Skeleton key={i} h={20} w={"100%"} />
                ))}
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

                {/* <Button
                color="red"
                loaderPosition="center"
                loading={loading}
                radius={"xl"}
                onClick={() => onClickLogout()}
              >
                Keluar
              </Button> */}
              </Stack>
            )}
          </ComponentGlobal_CardStyles>
        </Stack>
      </UIGlobal_LayoutDefault>
    </>
  );
}
