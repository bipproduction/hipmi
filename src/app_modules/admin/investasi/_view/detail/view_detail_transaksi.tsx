'use client'
import { AdminColor } from '@/app_modules/_global/color/color_pallet';
import AdminGlobal_ComponentBackButton from '@/app_modules/admin/_admin_global/back_button';
import CustomSkeleton from '@/app_modules/components/CustomSkeleton';
import { MODEL_INVOICE_INVESTASI } from '@/app_modules/investasi/_lib/interface';
import { clientLogger } from '@/util/clientLogger';
import { Badge, Box, Grid, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { apiGetAdminDetailTransaksi } from '../../_lib/api_fetch_admin_investasi';
import { AdminInvestasi_ComponentButtonKonfirmasiTransaksi } from '../../_component/new_button/button_konfirmasi_transaksi';

import { AdminInvestasi_ComponentCekBuktiTransfer } from '../../_component/new_button/button_cek_bukti_transfer';
import { AdminInvestasi_ComponentButtonBandingTransaksi } from '../../_component/new_button/button_banding_transaksi';



function DetailTransaksi() {
  const params = useParams<{ id: string }>();
  const investasiId = params.id;
  const [data, setData] = useState<MODEL_INVOICE_INVESTASI | null>(null);

  useShallowEffect(() => {
    loadInitialData();
  }, [])

  const loadInitialData = async () => {
    try {
      const response = await apiGetAdminDetailTransaksi({
        id: investasiId
      })

      if (response?.success && response?.data?.data) {
        setData(response.data.data)
      } else {
        console.error("Invalid data format recieved:", response)
        setData(null)
      }

    } catch (error) {
      clientLogger.error("Invalid data format recieved:", error)
      setData(null)
    }
  }
  return (
    <Stack px={"lg"}>
      <Group position="apart">
        <AdminGlobal_ComponentBackButton />
      </Group>

      <>
        {!data ? (<CustomSkeleton height={"50vh"} width={"100%"} />) : (
          <Paper w={"50%"} bg={AdminColor.softBlue} p={"lg"}>
            <Stack c={AdminColor.white}>
              <Title order={3}>Detail Transaksi</Title>
              <Stack spacing={"xs"}>
                <Grid>
                  <Grid.Col span={6}>
                    <Text fw={"bold"}>Nama Investor:</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text>{data?.Author?.username}</Text>
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col span={6}>
                    <Text fw={"bold"}>Nama Bank:</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text>@{data?.Author?.username}</Text>
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col span={6}>
                    <Text fw={"bold"}>Nomor:</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text>+ {data?.Author?.nomor}</Text>
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col span={6}>
                    <Text fw={"bold"}>Jumlah Investasi:</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text>{data?.nominal}</Text>
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col span={6}>
                    <Text fw={"bold"}>Lembar Terbeli:</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text>{data?.lembarTerbeli}</Text>
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col span={6}>
                    <Text fw={"bold"}>Tanggal:</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    {data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : ""}
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col span={6}>
                    <Text fw={"bold"}>Status:</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Badge
                      w={150}
                      variant='light'
                      color={
                        data?.StatusInvoice?.id === "1"
                          ? "green"
                          : data?.StatusInvoice?.id === "4"
                            ? "red"
                            : "blue"
                      }
                    >{data?.StatusInvoice?.name}</Badge>
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col span={6}>
                    <Text fw={"bold"}>Bukti Transfer:</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Box>
                      {data?.statusInvoiceId !== "3" ? (
                        <AdminInvestasi_ComponentCekBuktiTransfer imageId={data?.imageId} />
                      ) : (
                        "-"
                      )}
                    </Box>
                  </Grid.Col>
                </Grid>
                <Grid pt={"md"}>
                  <Grid.Col span={6}>
                    <Group>
                      {data?.statusInvoiceId === "1" && "-"}
                      {data?.statusInvoiceId === "2" && (
                        <AdminInvestasi_ComponentButtonKonfirmasiTransaksi
                          investasiId={data?.investasiId}
                          invoiceId={data?.id}
                          lembarTerbeli={data?.lembarTerbeli}
                        />
                      )}
                      {data?.statusInvoiceId === "3" && "-"}
                      {data?.statusInvoiceId === "4" && (
                        <AdminInvestasi_ComponentButtonBandingTransaksi
                          invoiceId={data?.id}
                          investasiId={data?.investasiId}
                          lembarTerbeli={data?.lembarTerbeli}

                        />
                      )}
                    </Group>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Stack>
          </Paper>
        )}
      </>
    </Stack>
  );
}

export default DetailTransaksi;
