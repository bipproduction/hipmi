"use client";
import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { RouterEvent } from "@/lib/router_hipmi/router_event";
import { clientLogger } from "@/util/clientLogger";
import {
  Button,
  Divider,
  Grid,
  SimpleGrid,
  Stack
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { apiGetOneSponsorEventById } from "../../_lib/api_event";
import { IEventSponsor } from "../../_lib/interface";

function DetailSponsor_Event({ userLoginId }: { userLoginId: string }) {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<IEventSponsor | null>(null);
  const [isLoadingTransfer, setIsLoadingTransfer] = useState(false);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetOneSponsorEventById({
        id: params.id,
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get data sponsor", error);
    }
  }

  if (!data) {
    return (
      <>
        <CustomSkeleton height={200} width={"100%"} />
      </>
    );
  }

  return (
    <>
      <Stack spacing={"lg"}>
        {/* <Stack
          spacing={0}
          style={{
            padding: "15px",
            border: `2px solid ${AccentColor.blue}`,
            backgroundColor: AccentColor.darkblue,
            borderRadius: "10px",
            color: "white",
          }}
          align='center'
        >
          <Text>Nominal Sponsor:</Text>
          <Title order={4} c={MainColor.yellow}>
            Rp. 100.000
          </Title>
        </Stack> */}

        {/* <ComponentGlobal_CardStyles>
          <Stack>
            <Image
              src={
                "https://job-portal.niramasutama.com/images/Banner-INACO.png"
              }
              alt=""
            />
            <Flex justify={"space-between"}>
              <Box>
                <Title order={4}>INACO</Title>
              </Box>
              <Box>
                <Title order={4}>Sosial Media:</Title>
                <Flex align={"center"} gap={"sm"}>
                  <TfiFacebook size={10} />
                  <Text fz={"sm"}>InacoJellyku</Text>
                </Flex>
                <Flex align={"center"} gap={"sm"}>
                  <IconBrandWhatsapp size={10} />
                  <Text fz={"sm"}>+6289647038426</Text>
                </Flex>
              </Box>
            </Flex>
          </Stack>
        </ComponentGlobal_CardStyles> */}

        <ComponentGlobal_CardStyles>
          <Stack>
            <ComponentGlobal_AvatarAndUsername
              profile={data?.Author?.Profile as any}
            />

            <Divider />

            <Grid>
              <Grid.Col span={4} fw={"bold"}>
                Nama Sponsor
              </Grid.Col>
              <Grid.Col span={1}>:</Grid.Col>
              <Grid.Col span={7}>{data.name}</Grid.Col>
            </Grid>

            <Grid>
              <Grid.Col span={4} fw={"bold"}>
                Nominal
              </Grid.Col>
              <Grid.Col span={1}>:</Grid.Col>
              <Grid.Col span={7}> Rp. {data.isTransfer ? 0 : "-"} </Grid.Col>
            </Grid>

            {userLoginId == data.authorId && (
              <SimpleGrid cols={2} mt={"xl"}>
                <Button
                  loaderPosition="center"
                  loading={isLoadingTransfer}
                  radius={"xl"}
                  onClick={() => {
                    try {
                      setIsLoadingTransfer(true);
                      router.push(
                        RouterEvent.nominal_sponsor({ id: params.id })
                      );
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Selesaikan Transaksi
                </Button>
                <Button radius={"xl"}>Tampilkan Logo</Button>
              </SimpleGrid>
            )}
          </Stack>
        </ComponentGlobal_CardStyles>
      </Stack>
    </>
  );
}

export default DetailSponsor_Event;
