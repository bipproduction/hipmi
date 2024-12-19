import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { ComponentGlobal_LoadImageCustom } from "@/app_modules/_global/component";
import { Box, Grid, Group, Stack, Text } from "@mantine/core";
import { IconChecklist, IconCircleCheck } from "@tabler/icons-react";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { IDataInvestasiBursa } from "../../_lib/type_investasi";
import { Investasi_ComponentStylesCard } from "../comp_card_border_and_background";

export function Investasi_ComponentCardPortofolioPublishNew({ data }: { data: IDataInvestasiBursa; }) {
  const router = useRouter();

  return (
    <>
      <Investasi_ComponentStylesCard
        marginBottom={"15px"}
        onClickHandler={() => {
          router.push(NEW_RouterInvestasi.detail_main({ id: data?.id }), {
            scroll: false,
          });
        }}
      >
        <Grid>
          <Grid.Col span={8}>
            <Text fw={"bold"}> {_.capitalize(data?.title)}</Text>
            <Stack spacing={0}>
              <Text fz={10}>Target Dana:</Text>
              <Text>
                Rp.{" "}
                {new Intl.NumberFormat("id-ID", {
                  maximumSignificantDigits: 10,
                }).format(+data?.targetDana)}
              </Text>
            </Stack>
          </Grid.Col>

          <Grid.Col span={4}>
            <ComponentGlobal_LoadImageCustom
              height={80}
              fileId={data?.imageId}
            />
          </Grid.Col>
        </Grid>

        <Group position="center" mt={"md"}>
          {Number(data?.pencarianInvestor) -
            moment(new Date()).diff(new Date(data?.updatedAt), "days") <=
          0 ? (
            <Group position="right">
              <IconCircleCheck color="green" />
              <Text c={"green"}>Selesai</Text>
            </Group>
          ) : (
            <Group
              position="center"
              style={{ fontSize: 10, fontWeight: "bold" }}
            >
              <Group>
                {Number(data?.pencarianInvestor) -
                  moment(new Date()).diff(new Date(data?.countDown), "days") <=
                0 ? (
                  <Group>
                    <IconChecklist />
                    <Text>Selesai</Text>
                  </Group>
                ) : (
                  <Box>
                    Sisa Waktu : {}
                    {Number(data?.pencarianInvestor) -
                      moment(new Date()).diff(
                        new Date(data?.countDown),
                        "days"
                      )}{" "}
                    hari
                  </Box>
                )}
              </Group>
            </Group>
          )}
        </Group>
      </Investasi_ComponentStylesCard>
    </>
  );
}
