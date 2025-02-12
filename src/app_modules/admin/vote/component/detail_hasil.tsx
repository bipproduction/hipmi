"use client";

import { pathAssetImage, RouterImagePreview } from "@/lib";
import { RouterProfile } from "@/lib/router_hipmi/router_katalog";
import {
  MODEL_VOTE_KONTRIBUTOR,
  MODEL_VOTING_DAFTAR_NAMA_VOTE,
} from "@/app_modules/vote/model/interface";
import {
  Paper,
  Stack,
  Center,
  Title,
  Grid,
  Card,
  Avatar,
  Badge,
  Divider,
  Text,
} from "@mantine/core";
import _ from "lodash";
import router from "next/router";

export default function ComponentAdminVote_DetailHasil({
  hasil,
  kontributor,
}: {
  hasil?: MODEL_VOTING_DAFTAR_NAMA_VOTE[];
  kontributor?: MODEL_VOTE_KONTRIBUTOR[];
}) {
  return (
    <>
      <Paper pt={"md"}>
        <Stack spacing={"xl"}>
          <Center>
            <Title order={3}>Hasil</Title>
          </Center>

          <Grid justify="center">
            {hasil?.map((e: MODEL_VOTING_DAFTAR_NAMA_VOTE, i) => (
              <Grid.Col span={3} key={i}>
                <Stack p={"md"} align="center">
                  <Paper withBorder p={"xl"}>
                    <Text fz={30}>{e.jumlah}</Text>
                  </Paper>
                  <Text lineClamp={2} fz={"sm"}>
                    {e.value}
                  </Text>
                </Stack>
              </Grid.Col>
            ))}
          </Grid>

          <Card shadow="lg" withBorder p={30}>
            <Card.Section>
              <Stack>
                <Center>
                  <Title order={5}>Daftar Kontributor</Title>
                </Center>

                {_.isEmpty(kontributor) ? (
                  <Center>
                    <Text fz={"xs"} fw={"bold"}>
                      - Tidak ada voting -
                    </Text>
                  </Center>
                ) : (
                  <Stack>
                    {kontributor?.map((e, i) => (
                      <Stack spacing={"xs"} key={i}>
                        <Grid>
                          <Grid.Col
                            span={2}
                            onClick={() =>
                              router.push(
                                RouterProfile.katalogOLD +
                                  e?.Author?.Profile?.id
                              )
                            }
                          >
                            <Avatar
                              size={30}
                              sx={{
                                borderStyle: "solid",
                                borderWidth: "0.5px",
                              }}
                              radius={"xl"}
                              bg={"gray.1"}
                              src={pathAssetImage.avatar}
                            />
                          </Grid.Col>
                          <Grid.Col span={5}>
                            <Stack justify="center" h={"100%"}>
                              <Text truncate fz={"sm"} fw={"bold"}>
                                {e ? e?.Author?.Profile?.name : "Nama author"}
                              </Text>
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
                        <Divider />
                      </Stack>
                    ))}
                  </Stack>
                )}
              </Stack>
            </Card.Section>
          </Card>

          {/* <pre>{JSON.stringify(kontributor, null, 2)}</pre> */}
        </Stack>
      </Paper>
    </>
  );
}
