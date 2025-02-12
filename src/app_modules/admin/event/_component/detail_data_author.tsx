import { AdminColor } from '@/app_modules/_global/color/color_pallet';
import { Grid, Paper, Stack, Text, Title } from '@mantine/core';
import React from 'react';

function ComponentEvent_DetailDataAuthor() {
  return (
    <>
      <Paper bg={AdminColor.softBlue} p={"lg"}>
        <Stack c={AdminColor.white}>
          <Title order={3}>Data User</Title>
          <Stack spacing={"xs"}>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={"bold"}>Nama:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text>Nico Arya</Text>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={"bold"}>Username:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text>@NicoArya</Text>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={"bold"}>Nomor:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text>+628123456789</Text>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={"bold"}>Alamat:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text>Jl Raya Sesetan</Text>
              </Grid.Col>
            </Grid>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}

export default ComponentEvent_DetailDataAuthor;
