import { Warna } from "@/lib/warna";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import {
  Center,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetAdminContact } from "@/app_modules/_global/lib/api_fetch_master";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export function Investasi_ViewProsesTransaksi() {
  const [nomorAdmin, setNomorAdmin] = useState<string | undefined>(undefined);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const data = await apiGetAdminContact();
      if (data.success) {
        setNomorAdmin(data.data.nomor);
      } else {
        console.error("Error get admin contact", data.message);
        setNomorAdmin(undefined);
      }
    } catch (error) {
      console.error("Error get admin contact", error);
      setNomorAdmin(undefined);
    }
  }

  if (!nomorAdmin) return <CustomSkeleton height={300} />;
  return (
    <>
      <Stack>
        <Paper
          style={{
            backgroundColor: AccentColor.blue,
            border: `2px solid ${AccentColor.darkblue}`,
            padding: "15px",
            cursor: "pointer",
            borderRadius: "10px",
            color: MainColor.white,
          }}
        >
          <Stack spacing={"md"}>
            <Paper
              style={{
                backgroundColor: MainColor.darkblue,
                border: `2px solid ${AccentColor.darkblue}`,
                padding: "15px",
                cursor: "pointer",
                borderRadius: "10px",
                color: MainColor.white,
              }}
            >
              <Stack align="center" justify="center">
                <Title order={6}>Admin sedang memproses transaksimu</Title>
                <Paper radius={1000} w={100} h={100}>
                  <Center
                    style={{
                      backgroundColor: MainColor.white,
                      borderRadius: "100%",
                    }}
                    h={"100%"}
                  >
                    <Loader size={"lg"} color="yellow" variant="dots" />
                  </Center>
                </Paper>
                <Title order={6}>Mohon menunggu !</Title>
              </Stack>
            </Paper>
          </Stack>
        </Paper>
        <Paper
          style={{
            backgroundColor: AccentColor.blue,
            border: `2px solid ${AccentColor.darkblue}`,
            padding: "15px",
            cursor: "pointer",
            borderRadius: "10px",
            color: "white",
          }}
        >
          <Paper
            style={{
              backgroundColor: AccentColor.darkblue,
              border: `2px solid ${AccentColor.darkblue}`,
              padding: "15px",
              cursor: "pointer",
              borderRadius: "10px",
              color: MainColor.white,
            }}
          >
            <Group position="center">
              <Stack spacing={0}>
                <Text fz={"xs"} fs={"italic"}>
                  Hubungi admin jika tidak kunjung di proses!
                </Text>
                <Text fz={"xs"} fs={"italic"}>
                  Klik pada logo Whatsapp ini.
                </Text>
              </Stack>
              <Link
                color="white"
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
                target="_blank"
                href={`https://wa.me/+${nomorAdmin}?text=Hallo Admin , Saya ada kendala dalam proses transfer investasi !`}
              >
                <IconBrandWhatsapp size={40} color={MainColor.green} />
              </Link>
            </Group>
          </Paper>
        </Paper>
      </Stack>
    </>
  );
}
