import { Box, Grid, Paper, Stack, Text, Title } from '@mantine/core';
import React from 'react';

function ComponentEvent_DetailDataEvent() {
  return (
    <>
      <Paper withBorder p={"lg"}>
        <Stack>
          <Title order={3}>Coba</Title>
          <Stack spacing={"xs"}>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={"bold"}>Lokasi:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text>Tuban</Text>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={"bold"}>Tipe Acara:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text>Seminar</Text>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={"bold"}>Tanggal & Waktu Mulai:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text>Minggu, 17 Januari 2025</Text>
                <Text>09:00</Text>
              </Grid.Col>
            </Grid>
            <Grid>
            <Grid.Col span={6}>
                <Text fw={"bold"}>Tanggal & Waktu Selesai:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text >Minggu, 17 Januari 2025</Text>
                <Text >15:00</Text>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={"bold"}>Deskripsi:</Text>
                <Text >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, natus.</Text>
              </Grid.Col>
            </Grid>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}

export default ComponentEvent_DetailDataEvent;
