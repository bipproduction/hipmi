"use client";

import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { Button, Grid, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { gs_nominal_sponsor, gs_event_bank_id } from "../../global_state";

function Event_Invoice({ userLoginId }: { userLoginId: string }) {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const sponsorId = params.id;

  const [nominal, setNominal] = useAtom(gs_nominal_sponsor);
  const [bankId, setBankId] = useAtom(gs_event_bank_id);


  return (
    <>
      <Stack spacing={"lg"} py={"md"}>
        <Stack
          spacing={0}
          style={{
            backgroundColor: AccentColor.blue,
            border: `2px solid ${AccentColor.darkblue}`,
            padding: "15px",
            cursor: "pointer",
            borderRadius: "10px",
            color: "white",
          }}
        >
          <Title order={5}>Mohon transfer ke rekening dibawah</Title>
          <Group spacing={"xs"}>
            <Text>untuk diteruskan ke</Text>
            <Text fw={"bold"}>NicoArya</Text>
          </Group>
        </Stack>

        <Paper
          style={{
            backgroundColor: AccentColor.blue,
            border: `2px solid ${AccentColor.darkblue}`,
            padding: "15px",
            cursor: "pointer",
            borderRadius: "10px",
            color: "white",
            marginBottom: "15px",
          }}
        >
          <Stack spacing={"md"}>
            <Stack spacing={0}>
              <Text>Bank BRI</Text>
              <Text>PT. Himpunan Pengusaha Badung</Text>
            </Stack>
            <Paper
              style={{
                backgroundColor: AccentColor.darkblue,
                border: `2px solid ${AccentColor.darkblue}`,
                padding: "15px",
                cursor: "pointer",
                borderRadius: "10px",
                color: "white",
              }}
            >
              <Grid>
                <Grid.Col span={8}>
                  <Group position="left" align="center" h={"100%"}>
                    <Title order={4} color={MainColor.yellow}>
                      9065456754325643
                    </Title>
                  </Group>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Group position="right">
                    <Button
                      radius={"xl"}
                      style={{ backgroundColor: MainColor.yellow }}
                      c={MainColor.darkblue}
                    >
                      Salin
                    </Button>
                  </Group>
                </Grid.Col>
              </Grid>
            </Paper>
          </Stack>
        </Paper>

        <Paper
          style={{
            backgroundColor: AccentColor.blue,
            border: `2px solid ${AccentColor.darkblue}`,
            padding: "15px",
            cursor: "pointer",
            borderRadius: "10px",
            color: "white",
            marginBottom: "15px",
          }}
        >
          <Stack spacing={"md"}>
            <Stack spacing={0}>
              <Text>Jumlah Transfer</Text>
            </Stack>
            <Paper
              style={{
                backgroundColor: AccentColor.darkblue,
                border: `2px solid ${AccentColor.darkblue}`,
                padding: "15px",
                cursor: "pointer",
                borderRadius: "10px",
                color: "white",
              }}
            >
              <Grid>
                <Grid.Col span={8}>
                  <Group position="left" align="center" h={"100%"}>
                    <Title order={4} color={MainColor.yellow}>
                      Rp. 100.000
                    </Title>
                  </Group>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Group position="right">
                    <Button
                      radius={"xl"}
                      style={{ backgroundColor: MainColor.yellow }}
                      c={MainColor.darkblue}
                    >
                      Salin
                    </Button>
                  </Group>
                </Grid.Col>
              </Grid>
            </Paper>
          </Stack>
        </Paper>

        <Paper
          style={{
            backgroundColor: AccentColor.blue,
            border: `2px solid ${AccentColor.darkblue}`,
            padding: "15px",
            cursor: "pointer",
            borderRadius: "10px",
            color: "white",
            marginBottom: "15px",
          }}
        >
          <Stack spacing={"sm"}>
            <Group position="center">
              <Button
                leftIcon={<IconCamera />}
                radius={"xl"}
                style={{ backgroundColor: MainColor.yellow }}
                c={MainColor.darkblue}
              >
                Upload
              </Button>
            </Group>
            <Text ta={"center"} fz={"xs"} fs={"italic"}>
              Upload bukti transfer anda
            </Text>
          </Stack>
        </Paper>
        <Button radius={"xl"} bg={MainColor.yellow} color="yellow" c="black">
          Saya Sudah Transfer
        </Button>
      </Stack>
    </>
  );
}

export default Event_Invoice;
