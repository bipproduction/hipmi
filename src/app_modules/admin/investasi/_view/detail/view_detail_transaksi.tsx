'use client'
import { AdminColor } from '@/app_modules/_global/color/color_pallet';
import AdminGlobal_ComponentBackButton from '@/app_modules/admin/_admin_global/back_button';
import CustomSkeleton from '@/app_modules/components/CustomSkeleton';
import { MODEL_INVOICE_INVESTASI } from '@/app_modules/investasi/_lib/interface';
import { Button, Grid, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { apiGetAdminDetailTransaksi } from '../../_lib/api_fetch_admin_investasi';
import { useParams } from 'next/navigation';
import { clientLogger } from '@/util/clientLogger';
import { useShallowEffect } from '@mantine/hooks';


function DetailTransaksi() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_INVOICE_INVESTASI | null>(null);

  useShallowEffect(() => {
    loadInitialData();
  }, [])

  const loadInitialData = async () => {
    try {
      
      const response = await apiGetAdminDetailTransaksi({
        id: params.id
      })

      if (response?.success && response?.data.data) {
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

        {/* {data?.masterStatusInvestasiId === "2" ? ( */}
        <Group>
          <Button
            radius={"xl"}
            color="green"
          // onClick={() => setOpenModalPublish(true)}
          >
            Publish
          </Button>
          <Button
            radius={"xl"}
            color="red"
          // onClick={() => setOpenModalReject(true)}
          >
            Reject
          </Button>
        </Group>
        {/* // ) : (
        //   ""
        // )} */}
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
                    <Text>{data?.statusInvoiceId}</Text>
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col span={6}>
                    <Text fw={"bold"}>Bukti Transfer:</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text>{data?.Profile?.alamat}</Text>
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
