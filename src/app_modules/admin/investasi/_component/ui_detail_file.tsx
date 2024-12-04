import { APIs } from "@/app/lib";
import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import { MODEL_INVESTASI_DOKUMEN } from "@/app_modules/investasi/_lib/interface";
import {
  SimpleGrid,
  Paper,
  Stack,
  Title,
  Grid,
  Group,
  Button,
  Text,
} from "@mantine/core";
import { IconFileTypePdf } from "@tabler/icons-react";
import _ from "lodash";
import Link from "next/link";

export function ComponentAdminInvestasi_UIDetailFile({
  title,
  dataProspektus,
  listDokumen,
  prospektusFileId,
}: {
  title: string;
  dataProspektus: any;
  listDokumen: any[];
  prospektusFileId: string;
}) {
  return (
    <>
      <SimpleGrid
        cols={1}
        spacing="lg"
        breakpoints={[
          { maxWidth: "62rem", cols: 1, spacing: "md" },
          { maxWidth: "48rem", cols: 1, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        <Paper withBorder p={"lg"}>
          <Stack>
            <Title order={3}>File & Dokumen</Title>

            <Stack spacing={50}>
              {/* File */}
              <Grid align="center">
                <Grid.Col span={4}>
                  <Text fw={"bold"}>File:</Text>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Group>
                    <IconFileTypePdf />
                    <Text>Prospek {title}</Text>
                    <Link
                      target="_blank"
                      href={APIs.GET({ fileId: prospektusFileId })}
                    >
                      <Button radius={50}>Lihat</Button>
                    </Link>
                  </Group>
                </Grid.Col>
              </Grid>

              {/* Dokumen */}
              <Grid>
                <Grid.Col span={4}>
                  <Text fw={"bold"}>Dokumen:</Text>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Stack>
                    {_.isEmpty(listDokumen) ? (
                      <Text>-</Text>
                    ) : (
                      listDokumen.map((e: MODEL_INVESTASI_DOKUMEN) => (
                        <Paper key={e.id}>
                          <Group>
                            <IconFileTypePdf />
                            <Text>{e.title}</Text>
                            <Link
                              target="_blank"
                              href={APIs.GET({ fileId: e.fileId })}
                            >
                              <Button radius={50}>Lihat</Button>
                            </Link>
                          </Group>
                        </Paper>
                      ))
                    )}
                  </Stack>
                </Grid.Col>
              </Grid>
            </Stack>
          </Stack>
        </Paper>
      </SimpleGrid>
    </>
  );
}
