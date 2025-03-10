'use client';
import React, { useState } from 'react';
import AdminGlobal_ComponentBackButton from '../../_admin_global/back_button';
import { Button, Flex, Grid, Group, Modal, Paper, Stack, Text, Textarea, Title } from '@mantine/core';
import { useParams } from 'next/navigation';
import { MODEL_COLLABORATION } from '@/app_modules/colab/model/interface';
import { useShallowEffect } from '@mantine/hooks';
import { clientLogger } from '@/util/clientLogger';
import { apiGetAdminCollaborationById } from '../lib/api_fetch_admin_collaboration';
import { AdminColor } from '@/app_modules/_global/color/color_pallet';
import CustomSkeleton from '@/app_modules/components/CustomSkeleton';
import { ComponentGlobal_NotifikasiPeringatan } from '@/app_modules/_global/notif_global';
import { IconCheck } from '@tabler/icons-react';

function DetailPublish() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_COLLABORATION | null>(null);
  const [loading, setLoading] = useState(false);
  const [openReject, setOpenReject] = useState(false);

  useShallowEffect(() => {
    loadInitialData();
  }, [])

  const loadInitialData = async () => {
    try {
      const response = await apiGetAdminCollaborationById({
        id: params.id,
      })

      if (response?.success && response?.data) {
        setData(response.data);
      }

    } catch (error) {
      clientLogger.error("Invalid data format recieved:", error);
      setData(null);
    }
  }

  async function onReject() {
    try {
      const response = await apiGetAdminCollaborationById({
        id: params.id,
      })

      if (response?.success && response?.data) {
        setOpenReject(true)
        setData(response.data);
        setLoading(false)
      }
    } catch (error) {
      ComponentGlobal_NotifikasiPeringatan("Gagal Load");
      clientLogger.error("Invalid data format recieved:", error);
      setData(null);
    }
  }

  return (
    <>
      <Stack>
        <Flex justify={"space-between"}>
          <AdminGlobal_ComponentBackButton />
          <Button radius={"xl"} bg={"red"} color='white' onClick={onReject}>
            Reject
          </Button>
        </Flex>
        {!data ? (<CustomSkeleton height={"50vh"} width={"100%"} />) : (
          <Paper bg={AdminColor.softBlue} p={"md"}>
            <Title pb={10} c={AdminColor.white} order={3}>Detail Publish</Title>
            <Stack spacing={"xs"}>
              <Grid>
                <Grid.Col span={6}>
                  <Text c={AdminColor.white} fw={"bold"}>Username:</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text c={AdminColor.white}>{data?.Author?.username}</Text>
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={6}>
                  <Text c={AdminColor.white} fw={"bold"}>Title:</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text c={AdminColor.white}>@{data?.title}</Text>
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={6}>
                  <Text c={AdminColor.white} fw={"bold"}>Industri:</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text c={AdminColor.white}>+ {data?.ProjectCollaborationMaster_Industri.name}</Text>
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={6}>
                  <Text c={AdminColor.white} fw={"bold"}>Jumlah Partisipan:</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text c={AdminColor.white}>{data?.ProjectCollaboration_Partisipasi.length}</Text>
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={6}>
                  <Text c={AdminColor.white} fw={"bold"}>Lokasi:</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text c={AdminColor.white}>{data?.lokasi}</Text>
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={6}>
                  <Text c={AdminColor.white} fw={"bold"}>Tujuan Proyek:</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text c={AdminColor.white}>{data?.purpose}</Text>
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={6}>
                  <Text c={AdminColor.white} fw={"bold"}>Keuntungan:</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text c={AdminColor.white}>{data?.benefit}</Text>
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>
        )}
      </Stack>

      {/* Reject Project */}
      <Modal
        styles={{ body: { backgroundColor: AdminColor.softBlue } }}
        opened={openReject}
        onClose={() => setOpenReject(false)}
        centered
        withCloseButton={false}
        size={"lg"}
      >
        <Paper bg={AdminColor.softBlue} p={"md"}>
          <Stack>
            <Text c={AdminColor.white}>
              Apakah anda yakin ingin mereport project{" "}
              <Text c={AdminColor.white} span inherit fw={"bold"}>
                {data?.title}
              </Text>
              ?
            </Text>{" "}
            <Textarea
              minRows={2}
              placeholder="Ketik alasan report.."
              // onChange={(val) => setReport(val.currentTarget.value)}
            />
            <Group position="right">
              <Button
                leftIcon={<IconCheck />}
                radius={"xl"}
                // onClick={() => onReport()}
              > 
                Simpan
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Modal>
    </>
  );
}

export default DetailPublish;

