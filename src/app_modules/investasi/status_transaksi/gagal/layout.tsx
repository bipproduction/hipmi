"use client";

import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import { Warna } from "@/lib/warna";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import {
  ActionIcon,
  Button,
  Center,
  CloseButton,
  Footer,
  Group,
  Header,
  Text
} from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_investas_menu } from "../../g_state";

export default function LayoutStatusTransaksiInvestasi_Gagal({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_investas_menu);

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <Header height={50}>
            <Group position="apart" align="center" h={50} px={"md"}>
              <CloseButton
                size={"md"}
                onClick={() => {
                  router.push(RouterInvestasi_OLD.main_transaksi);
                  setHotMenu(3);
                }}
              />
              <Text>Status Transaksi</Text>
              <ActionIcon variant="transparent" disabled></ActionIcon>
            </Group>
          </Header>
        }
        footer={
          <Footer height={70} sx={{ borderStyle: "none" }}>
            <Center>
              <Button
                px={"xl"}
                radius={50}
                bg={Warna.biru}
                onClick={() => {
                  router.push(RouterInvestasi_OLD.main_transaksi), setHotMenu(3);
                }}
              >
                Kembali Ke Transaksi
              </Button>
            </Center>
          </Footer>
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
