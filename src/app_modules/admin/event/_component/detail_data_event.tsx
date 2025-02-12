import { AdminColor } from '@/app_modules/_global/color/color_pallet';
import { MODEL_EVENT } from '@/app_modules/event/_lib/interface';
import { Box, Grid, Paper, Stack, Text, Title } from '@mantine/core';
import moment from 'moment';
import React from 'react';
import "moment/locale/id";
import CustomSkeleton from '@/app_modules/components/CustomSkeleton';

function ComponentEvent_DetailDataEvent({ data }: { data: MODEL_EVENT | null }) {

  return (
    <>
      {/* {!data ? (
        <CustomSkeleton height={"40vh"} width={"100%"} />
      ) : (
        
      )
      } */}
      <Paper bg={AdminColor.softBlue} p={"lg"}>
        <Stack c={AdminColor.white}>
          {data ? <Title order={3}>{data?.title}</Title> : <CustomSkeleton height={30} width={"100%"} />}
          <Stack spacing={"xs"}>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={"bold"}>Lokasi:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                {data ? <Text>{data?.lokasi}</Text> : <CustomSkeleton height={30} width={"100%"} />}
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={"bold"}>Tipe Acara:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                {data ? <Text>{data?.EventMaster_TipeAcara?.name}</Text> : <CustomSkeleton height={30} width={"100%"} />}
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={"bold"}>Tanggal & Waktu Mulai:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                {data ? <Text>{moment(data?.tanggal).format("LLLL")}</Text> : <CustomSkeleton height={30} width={"100%"} />}
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={"bold"}>Tanggal & Waktu Selesai:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                {data ? <Text>{moment(data?.tanggalSelesai).format("LLLL")}</Text> : <CustomSkeleton height={30} width={"100%"} />}
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={"bold"}>Deskripsi:</Text>
                {data ? <Text>{data?.deskripsi}</Text> : <CustomSkeleton height={30} width={"100%"} />}
              </Grid.Col>
            </Grid>
          </Stack>
        </Stack>
      </Paper >
    </>
  );
}

export default ComponentEvent_DetailDataEvent;
