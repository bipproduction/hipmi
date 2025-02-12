import { AdminColor } from '@/app_modules/_global/color/color_pallet';
import CustomSkeleton from '@/app_modules/components/CustomSkeleton';
import { MODEL_EVENT } from '@/app_modules/event/_lib/interface';
import { Grid, Paper, Stack, Text, Title } from '@mantine/core';
import React from 'react';

function ComponentEvent_DetailDataAuthor({ data }: { data: MODEL_EVENT | null }) {
  return (
    <>
      {/* {!data ? (
        <CustomSkeleton height={"40vh"} width={"100%"} />
      ) : (
       
      )} */}
      <Paper bg={AdminColor.softBlue} p={"lg"}>
        <Stack c={AdminColor.white}>
          <Title order={3}>Data User</Title>
          <Stack spacing={"xs"}>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={"bold"}>Nama:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                {data ?
                  <Text>{data?.Author?.Profile?.name}</Text>
                  :
                  <CustomSkeleton height={30} width={"100%"} />
                }
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={"bold"}>Username:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                {data ?
                  <Text>{data?.Author?.username}</Text>
                  :
                  <CustomSkeleton height={30} width={"100%"} />
                }
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={"bold"}>Nomor:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                {data ?
                  <Text>{data?.Author?.nomor}</Text>
                  :
                  <CustomSkeleton height={30} width={"100%"} />
                }
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={"bold"}>Alamat:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                {data ?
                  <Text>{data?.Author?.Profile?.alamat}</Text>
                  :
                  <CustomSkeleton height={30} width={"100%"} />
                }
              </Grid.Col>
            </Grid>
          </Stack>
        </Stack>
      </Paper >
    </>
  );
}

export default ComponentEvent_DetailDataAuthor;
