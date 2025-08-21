import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";
import { Warna } from "@/lib/warna";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoadImageCustom,
} from "@/app_modules/_global/component";
import { Box, Grid, Group, Progress, Stack, Text } from "@mantine/core";
import { IconCircleCheck, IconXboxX } from "@tabler/icons-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { IDataInvestasiBursa } from "../../_lib/type_investasi";

export function Investasi_ComponentCardBerandaNew({
  data,
}: {
  data: IDataInvestasiBursa;
}) {
  const router = useRouter();

  return (
    <>
      <ComponentGlobal_CardStyles
        onClickHandler={() => {
          router.push(NEW_RouterInvestasi.detail_main({ id: data.id }), {
            scroll: false,
          });
        }}
      >
        <Stack>
          <Grid>
            <Grid.Col span={6}>
              <ComponentGlobal_LoadImageCustom
                height={100}
                fileId={data.imageId}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack>
                <Text
                  c={MainColor.white}
                  fw={"bold"}
                  align="center"
                  lineClamp={2}
                >
                  {data?.title}
                </Text>

                <Progress
                  label={
                    data?.progress === "0"
                      ? +data?.progress + " %"
                      : (+data?.progress).toFixed(2) + " %"
                  }
                  value={+data?.progress}
                  color={MainColor.yellow}
                  size="xl"
                  radius="xl"
                  style={{ backgroundColor: MainColor.white }}
                  styles={{
                    root: {
                      position: "relative",
                    },
                    label: {
                      color: MainColor.black,
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                      paddingLeft: "30px",
                    },
                  }}
                />

                <Group position="right">
                  {data?.progress === "100" ? (
                    <Group position="right" spacing={"xs"}>
                      <IconCircleCheck color="green" />
                      <Text
                        truncate
                        variant="text"
                        c={Warna.hijau_tua}
                        sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                        ta="center"
                        fz="md"
                        fw={700}
                      >
                        Selesai
                      </Text>
                    </Group>
                  ) : (
                    <Box>
                      {+data?.pencarianInvestor -
                        moment(new Date()).diff(
                          new Date(data?.countDown),
                          "days"
                        ) <=
                      0 ? (
                        <Group position="right" spacing={5}>
                          <IconXboxX color="red" size={20} />
                          <Text
                            truncate
                            variant="text"
                            c={Warna.merah}
                            sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                            ta="center"
                            fw={"bold"}
                            fz="sm"
                          >
                            Waktu Habis
                          </Text>
                        </Group>
                      ) : (
                        <Group position="right" spacing={"xs"}>
                          <Text c={MainColor.white} truncate>
                            Sisa waktu:
                          </Text>
                          <Text c={MainColor.white} truncate>
                            {Number(data?.pencarianInvestor) -
                              moment(new Date()).diff(
                                new Date(data?.countDown),
                                "days"
                              )}
                          </Text>
                          <Text c={MainColor.white} truncate>
                            Hari
                          </Text>
                        </Group>
                      )}
                    </Box>
                  )}
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
