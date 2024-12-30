import { IRealtimeData } from "@/app/lib/global_state";
import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { notifikasiToAdmin_funCreate } from "@/app_modules/notifikasi/fun";
import { clientLogger } from "@/util/clientLogger";
import { Button, Paper, Radio, Stack, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { investasi_funCreateInvoice } from "../../_fun/create/fun_create_invoice";
import { MODEL_MASTER_BANK } from "../../_lib/interface";

export function Investasi_ViewMetodePembayaran({
  listBank,
  investasiId,
}: {
  listBank: MODEL_MASTER_BANK[];
  investasiId: string;
}) {
  const router = useRouter();
  const [bank, setBank] = useState(listBank);
  const [pilihBank, setPilihBank] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [total, setTotal] = useLocalStorage({
    key: "total_investasi",
    defaultValue: 0,
  });
  const [jumlah, setJumlah] = useLocalStorage({
    key: "jumlah_investasi",
    defaultValue: 0,
  });

  async function onProses() {
    try {
      const res = await investasi_funCreateInvoice({
        data: {
          total: total,
          pilihBank: pilihBank,
          investasiId: investasiId,
          jumlah: jumlah,
        },
      });

      if (res.status != 201) {
        ComponentGlobal_NotifikasiPeringatan(res.message);
        return;
      }

      const dataNotifikasi: IRealtimeData = {
        appId: investasiId,
        status: "Menunggu",
        userId: res.data?.authorId as string,
        pesan: "Menunggu transfer",
        kategoriApp: "INVESTASI",
        title: "Transaksi baru",
      };

      const notif = await notifikasiToAdmin_funCreate({
        data: dataNotifikasi as any,
      });

      if (notif.status === 201) {
        WibuRealtime.setData({
          type: "notification",
          pushNotificationTo: "ADMIN",
          dataMessage: dataNotifikasi,
        });

        ComponentGlobal_NotifikasiBerhasil(res.message);
        setLoading(true);
        router.push(NEW_RouterInvestasi.invoice + res.data?.id, {
          scroll: false,
        });
      }
    } catch (error) {
      clientLogger.error("Error create invoice:", error);
    }
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
