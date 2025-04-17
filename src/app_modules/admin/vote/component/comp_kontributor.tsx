import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import {
  MODEL_VOTE_KONTRIBUTOR,
  MODEL_VOTING_DAFTAR_NAMA_VOTE,
} from "@/app_modules/vote/model/interface";
import {
  Badge,
  Box,
  Center,
  Divider,
  Grid,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import { apiGetAdminKontibutorVotingById } from "../lib/api_fetch_admin_voting";
import { Admin_V3_ComponentBreakpoint } from "../../_components_v3/comp_simple_grid_breakpoint";
import { MainColor } from "@/app_modules/_global/color";

interface Props {
  dataHasil: MODEL_VOTING_DAFTAR_NAMA_VOTE[];
}
export function AdminVoting_ComponentKontributorList({ dataHasil }: Props) {
  const param = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_VOTE_KONTRIBUTOR[] | null>(null);

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  async function handleLoadData() {
    try {
      const response = await apiGetAdminKontibutorVotingById({ id: param.id });

      if (response && response.success) {
        setData(response.data);
      } else {
        setData(null);
      }
    } catch (error) {
      console.log("Error get list data kontributor voting admin", error);
    }
  }

  return (
    <>
      <Admin_ComponentBoxStyle style={{ height: 700 }}>
        <Stack>
          <Title align="center" order={5}>
            Hasil Kontributor
          </Title>

          <Admin_V3_ComponentBreakpoint
            cols={dataHasil.length}
            sm={2}
            md={2}
            lg={2}
          >
            {dataHasil?.map((e: MODEL_VOTING_DAFTAR_NAMA_VOTE, i) => (
              <Stack key={i} p={"md"} align="center">
                <Paper withBorder p={"xl"}>
                  <Text fz={30}>{e.jumlah}</Text>
                </Paper>
                <Text lineClamp={2} fz={"sm"}>
                  {e.value}
                </Text>
              </Stack>
            ))}
          </Admin_V3_ComponentBreakpoint>

          {!data ? (
            <CustomSkeleton height={100} />
          ) : _.isEmpty(data) ? (
            <Center>
              <Text fz={"xs"} fw={"bold"}>
                - Tidak ada voting -
              </Text>
            </Center>
          ) : (
            <Box h={450}>
              <ScrollArea h={430} w={"100%"}>
                <Stack p={"sm"}>
                  {data?.map((e, i) => (
                    <Stack
                      spacing={"xs"}
                      key={i}
                      bg={MainColor.soft_darkblue}
                      p={"sm"}
                    >
                      <Grid>
                        <Grid.Col span={5}>
                          <Stack justify="center" h={"100%"} align="center">
                            <Box w={100}>
                              <Text
                                truncate
                                fz={"sm"}
                                fw={"bold"}
                              >
                                {e ? e?.Author?.username : "Nama kontributor"}
                              </Text>
                            </Box>
                          </Stack>
                        </Grid.Col>

                        <Grid.Col span={5}>
                          <Center>
                            <Badge>
                              <Text
                                truncate
                                fz={
                                  e.Voting_DaftarNamaVote.value.length > 10
                                    ? 8
                                    : 10
                                }
                              >
                                {e.Voting_DaftarNamaVote.value}
                              </Text>
                            </Badge>
                          </Center>
                        </Grid.Col>
                      </Grid>
                      {/* <Divider /> */}
                    </Stack>
                  ))}
                </Stack>
              </ScrollArea>
            </Box>
          )}
        </Stack>
      </Admin_ComponentBoxStyle>
    </>
  );
}
