"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_LoadImage,
  ComponentGlobal_TampilanRupiah,
} from "@/app_modules/_global/component";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import {
  Box,
  Button,
  Collapse,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconBrandCashapp } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { apiGetOneSahamInvestasiById } from "../../_lib/api_fetch_new_investasi";
import { MODEL_INVOICE_INVESTASI } from "../../_lib/interface";

export function Investasi_ViewTransaksiBerhasil() {
  const [opened, setOpened] = useState(false);

  const param = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_INVOICE_INVESTASI | null>(null);

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      const response = await apiGetOneSahamInvestasiById({ id: param.id });
      if (response.success) {
        setData(response.data);
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Error get investasi", error);
      setData(null);
    }
  };

  if (!data) return <CustomSkeleton height={"50vh"} width={"100%"} />;

  return (
    <>
      <Stack spacing={"lg"} py={"md"}>
        <Stack
          align="center"
          spacing={"md"}
          style={{
            backgroundColor: AccentColor.blue,
            border: `2px solid ${AccentColor.darkblue}`,
            padding: "15px",
            cursor: "pointer",
            borderRadius: "10px",
            color: MainColor.white,
          }}
        >
          <IconBrandCashapp size={100} />
          <Title order={5} align="center">
            Terimakasih telah percaya pada kami untuk mengelola dana anda! Info
            mengenai update Investasi ini bisa di lihat di kolom berita.
          </Title>
        </Stack>

        <Paper
          style={{
            backgroundColor: AccentColor.blue,
            border: `2px solid ${AccentColor.darkblue}`,
            padding: "15px",
            cursor: "pointer",
            borderRadius: "10px",
            color: MainColor.white,
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
