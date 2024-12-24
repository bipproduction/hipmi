"use client";

import { RouterAdminInvestasi } from "@/app/lib/router_admin/router_admin_investasi";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_LoadImage, ComponentGlobal_TampilanRupiah } from "@/app_modules/_global/component";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Collapse,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_INVOICE_INVESTASI } from "../../_lib/interface";
import { Prisma } from "@prisma/client";

export function Investasi_ViewTransaksiGagal({
  dataTransaksi,
  nomorAdmin,
}: {
  dataTransaksi: any;
  nomorAdmin: Prisma.NomorAdminCreateInput;
}) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_INVOICE_INVESTASI>(dataTransaksi);
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Stack spacing={"lg"} py={"md"}>
        <Stack
          spacing={"md"}
          style={{
            backgroundColor: AccentColor.blue,
            border: `2px solid ${AccentColor.darkblue}`,
            padding: "15px",
            cursor: "pointer",
            borderRadius: "10px",
            color: "white",
          }}
        >
          <Title order={5} align="center">
            Transaksi anda gagal karena bukti transfer tidak sesuai dengan data
            kami. Jika ini masalah khusus silahkan hubungi pada kontak whatsapp
            kami !
          </Title>
          <Center>
            <ActionIcon radius={"100%"} size={70} variant="light" color="white">
              <a
                href={`whatsapp://wa.me/${nomorAdmin.nomor}?text=Hallo admin ! Saya ada kendala pada transaksi Investasi`}
              >
                <IconBrandWhatsapp size={50} color="green" />
              </a>
            </ActionIcon>
          </Center>
        </Stack>

        <Paper
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
          <Title order={4} align="center" mb={"lg"}>
            Detail Transaksi
          </Title>

          <Stack px={"sm"}>
            <Box>
              <Grid>
                <Grid.Col span={6}>
                  <Text>Bank </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text>: {data?.MasterBank.namaBank}</Text>
                </Grid.Col>
              </Grid>
            </Box>

            <Box>
              <Grid>
                <Grid.Col span={6}>
                  <Text>Nama Rekening </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text>: {data?.MasterBank.namaAkun}</Text>
                </Grid.Col>
              </Grid>
            </Box>

            <Box>
              <Grid>
                <Grid.Col span={6}>
                  <Text>Nomor Rekening </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text>: {data?.MasterBank.norek}</Text>
                </Grid.Col>
              </Grid>
            </Box>

            <Box>
              <Grid>
                <Grid.Col span={6}>
                  <Text>Jumlah Transaksi </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Group spacing={2}>
                    :
                    <Text inherit span>
                      <ComponentGlobal_TampilanRupiah
                        color="white"
                        nominal={+data?.nominal}
                      />
                    </Text>
                  </Group>
                </Grid.Col>
              </Grid>
            </Box>

            <Box>
              <Grid>
                <Grid.Col span={6}>
                  <Text>Lembar Terbeli </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text>: {data?.lembarTerbeli}</Text>
                </Grid.Col>
              </Grid>
            </Box>

            <Box>
              <Grid>
                <Grid.Col span={6}>
                  <Text>Bukti Transfer </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Button
                    radius={"xl"}
                    compact
                    onClick={() => {
                      opened ? setOpened(false) : setOpened(true);
                    }}
                  >
                    {opened ? "Sembunyikan" : "Tampilkan"}
                  </Button>
                </Grid.Col>
              </Grid>
            </Box>

            <Collapse
              mt={"md"}
              in={opened}
              transitionDuration={500}
              transitionTimingFunction="linear"
            >
              <ComponentGlobal_LoadImage fileId={data.imageId} />
            </Collapse>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
