"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { apiNewGetUserIdByToken } from "@/app_modules/_global/lib/api_fetch_global";
import { apiGetMasterBank } from "@/app_modules/_global/lib/api_fetch_master";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_MASTER_BANK } from "@/app_modules/investasi/_lib/interface";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import { IRealtimeData } from "@/lib/global_state";
import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { clientLogger } from "@/util/clientLogger";
import { Button, Paper, Radio, Stack, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { Donasi_funCreateInvoice } from "../../fun/create/fun_create_invoice";
import { gs_donasi_hot_menu, gs_proses_donasi } from "../../global_state";

export default function Donasi_MetodePembayaran() {
  const param = useParams<{ id: string }>();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [prosesDonasi, setProsesDonasi] = useAtom(gs_proses_donasi);
  const [pilihBank, setPilihBank] = useState("");
  const [bank, setBank] = useState<MODEL_MASTER_BANK[] | null>(null);
  const [activeHotMenu, setActiveHotMenu] = useAtom(gs_donasi_hot_menu);
  const [userLoginId, setUserLoginId] = useState<string | null>(null);

  useShallowEffect(() => {
    handleListData();
    handleGetUserId();
  }, []);

  async function handleListData() {
    try {
      const response = await apiGetMasterBank();
      if (response.success) {
        setBank(response.data);
      }
    } catch (error) {
      console.error("Error fetching bank data:", error);
    }
  }

  async function handleGetUserId() {
    try {
      const response = await apiNewGetUserIdByToken();
      if (response.success) {
        setUserLoginId(response.userId);
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  }

  async function onProses() {
    try {
      setLoading(true);
      const body = {
        donasiId: param.id,
        donasiMaster_BankId: pilihBank,
        nominal: prosesDonasi.nominal,
        authorId: userLoginId,
      };

      const res = await Donasi_funCreateInvoice(body);
      if (res.status === 200) {
        const dataNotifikasi: IRealtimeData = {
          appId: res.data?.Donasi?.id as any,
          status: res.data?.DonasiMaster_StatusInvoice?.name as any,
          userId: res.data?.Donasi?.authorId as any,
          pesan: res.data?.Donasi?.title as any,
          kategoriApp: "DONASI",
          title: "Donatur membuat invoice donasi",
        };

        const notif = await notifikasiToAdmin_funCreate({
          data: dataNotifikasi as any,
        });

        if (notif.status === 201) {
          WibuRealtime.setData({
            type: "notification",
            pushNotificationTo: "ADMIN",
          });

          setActiveHotMenu(2);
          ComponentGlobal_NotifikasiBerhasil(res.message);
          setProsesDonasi({
            ...prosesDonasi,
            nominal: "",
          });
          router.push(RouterDonasi.invoice + `${res.data?.id}`);
        }
      } else {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error proses donasi:", error);
    }
  }

  if (!bank || !userLoginId) {
    return <CustomSkeleton height={400} />;
  }

  return (
    <>
      <Stack>
        <Radio.Group
          value={pilihBank}
          onChange={setPilihBank}
          withAsterisk
          color="yellow"
        >
          {bank.map((e, i) => (
            <Paper
              key={e.id}
              style={{
                backgroundColor: AccentColor.blue,
                border: `2px solid ${AccentColor.darkblue}`,
                padding: "15px",
                cursor: "pointer",
                borderRadius: "10px",
                color: "white",
                marginBottom: "15px",
              }}
            >
              <Radio
                styles={{
                  radio: {
                    color: "yellow",
                  },
                }}
                value={e.id}
                label={
                  <Title order={6} color="white">
                    {e.namaBank}
                  </Title>
                }
              />
            </Paper>
          ))}
        </Radio.Group>

        <Button
          disabled={pilihBank === "" ? true : false}
          style={{ transition: "0.5s" }}
          loaderPosition="center"
          loading={isLoading ? true : false}
          radius={"xl"}
          onClick={() => {
            onProses();
          }}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
        >
          Pilih
        </Button>
      </Stack>
    </>
  );
}
