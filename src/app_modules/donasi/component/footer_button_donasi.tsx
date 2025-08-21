"use client";
import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { Footer, Center, Button } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_proses_donasi } from "../global_state";
import { useState } from "react";
import { MainColor } from "@/app_modules/_global/color/color_pallet";

export default function ButtonDonasi({ donasiId }: { donasiId: string }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [prosesDonasi, setProsesDonasi] = useAtom(gs_proses_donasi);

  async function onClick() {
    setProsesDonasi({
      ...prosesDonasi,
      bank: "",
      nominal: "",
      norek: "",
    });
    setLoading(true);
    router.push(RouterDonasi.masukan_donasi + `${donasiId}`);
  }

  return (
    <>
      <Footer
        height={70}
        px={"md"}
        style={{
          borderStyle: "none",
          backgroundColor: "transparent",
          width: "100%",
        }}
      >
        <Center h={70}>
          <Button
            style={{
              width: "100%",
            }}
            loaderPosition="center"
            loading={isLoading ? true : false}
            radius={"xl"}
            onClick={() => onClick()}
            bg={MainColor.yellow}
            color="yellow"
            c={"black"}
          >
            Donasi
          </Button>
        </Center>
      </Footer>
    </>
  );
}
