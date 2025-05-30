"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { MODEL_COLLABORATION_ROOM_CHAT } from "@/app_modules/colab/model/interface";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { clientLogger } from "@/util/clientLogger";
import {
  Grid,
  Group,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import Admin_ComponentBackButton from "../../_admin_global/back_button";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { apiGetAdminCollaborationGroupById } from "../lib/api_fetch_admin_collaboration";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import { IconCaretRight } from "@tabler/icons-react";
import { Admin_V3_ComponentSkeletonBreakpoint } from "../../_components_v3/comp_skeleton_breakpoint";
import { Admin_V3_ComponentBreakpoint } from "../../_components_v3/comp_simple_grid_breakpoint";
import { Admin_V3_ComponentDetail } from "../../_components_v3/comp_detail_data";

function DetailGroup() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_COLLABORATION_ROOM_CHAT | null>(null);
  const [loading, setLoading] = useState(false);

  useShallowEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const response = await apiGetAdminCollaborationGroupById({
        id: params.id,
      });

      if (response?.success && response?.data) {
        setData(response.data);
      }
    } catch (error) {
      clientLogger.error("Invalid data format recieved:", error);
      setData(null);
    }
  };

  const listData = [
    {
      label: "Admin",
      value: data?.ProjectCollaboration?.Author?.username,
    },
    {
      label: "Judul",
      value: data?.ProjectCollaboration?.title,
    },
    {
      label: "Industri",
      value:
        data?.ProjectCollaboration?.ProjectCollaborationMaster_Industri?.name,
    },
    {
      label: "Jumlah Partisipan",
      value: data?.ProjectCollaboration_AnggotaRoomChat.length,
    },
    {
      label: "Lokasi",
      value: data?.ProjectCollaboration?.lokasi,
    },
    {
      label: "Tujuan",
      value: data?.ProjectCollaboration?.purpose,
    },
    {
      label: "Keuntungan",
      value: data?.ProjectCollaboration?.benefit,
    },
  ];

  return (
    <Stack>
      <ComponentAdminGlobal_HeaderTamplate name={`Detail group`} />
      <Admin_ComponentBackButton />

      {!data ? (
        <Admin_V3_ComponentSkeletonBreakpoint skeletonRequest={2} />
      ) : (
        <Admin_V3_ComponentBreakpoint>
          <Admin_ComponentBoxStyle
            style={{
              height: 500,
            }}
          >
            <ScrollArea h={450} scrollbarSize={"md"}>
              <Stack spacing={"xs"}>
                {listData.map((e, i) => (
                  <Admin_V3_ComponentDetail key={i} item={e}/>
                ))}

                {/* <Group position="center">
                <Button
                  mt={"xl"}
                  radius={"xl"}
                  bg={"red"}
                  color="red"
                  onClick={() => {
                    setOpenReject(true);
                  }}
                  leftIcon={<IconFlag2Off size={20} color="white" />}
                >
                  Reject
                </Button>
              </Group> */}
              </Stack>
            </ScrollArea>
          </Admin_ComponentBoxStyle>

          <Admin_ComponentBoxStyle
            style={{
              height: 500,
            }}
          >
            <Stack>
              <Title align="center" order={6}>
                Anggota
              </Title>

              <ScrollArea h={400}>
                {data.ProjectCollaboration_AnggotaRoomChat.map((e, i) => (
                  <Group key={i} align="flex-start" mb={"md"}>
                    <IconCaretRight />

                    <Stack spacing={0} w={"70%"}>
                      <Grid>
                        <Grid.Col span={3} fw={"bold"}>
                          Username
                        </Grid.Col>
                        <Grid.Col span={1}>:</Grid.Col>
                        <Grid.Col span={8}>{e.User.username}</Grid.Col>
                      </Grid>

                      <Grid>
                        <Grid.Col span={3} fw={"bold"}>
                          Name
                        </Grid.Col>
                        <Grid.Col span={1}>:</Grid.Col>
                        <Grid.Col span={8}>{e.User.Profile.name}</Grid.Col>
                      </Grid>
                    </Stack>
                  </Group>
                ))}
              </ScrollArea>
            </Stack>
          </Admin_ComponentBoxStyle>
        </Admin_V3_ComponentBreakpoint>
      )}
    </Stack>
  );
}

export default DetailGroup;
