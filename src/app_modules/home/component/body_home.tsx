import { RouterProfile } from "@/lib/router_hipmi/router_katalog";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { clientLogger } from "@/util/clientLogger";
import {
  ActionIcon,
  Box,
  Grid,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconUserSearch } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiGetDataHome } from "../fun/get/api_home";
import { listMenuHomeBody, menuHomeJob } from "./list_menu_home";

export default function BodyHome({ dataUser }: { dataUser: any | null }) {
  const router = useRouter();
  const [dataJob, setDataJob] = useState<any[] | null>(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [loading, setLoading] = useState(true);

  useShallowEffect(() => {
    getHomeJob();
  }, []);

  async function getHomeJob() {
    try {
      setLoadingJob(true);
      const response = await apiGetDataHome({
        path: "?cat=job",
      });

      if (response) {
        setDataJob(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get data job", error);
    } finally {
      setLoadingJob(false);
    }
  }

  return (
    <Box>
      <Image
        height={140}
        fit={"cover"}
        alt="logo"
        src={"/aset/home/home-hipmi-new.png"}
        onLoad={() => setLoading(false)}
        styles={{
          imageWrapper: {
            border: `2px solid ${AccentColor.blue}`,
            borderRadius: "10px 10px 10px 10px",
          },
          image: {
            borderRadius: "8px 8px 8px 8px",
          },
        }}
      />

      <Stack my={"sm"}>
        <SimpleGrid cols={2} spacing="md">
          {listMenuHomeBody.map((e, i) => (
            <Paper
              key={e.id}
              h={150}
              bg={MainColor.darkblue}
              style={{
                borderRadius: "10px 10px 10px 10px",
                border: `2px solid ${AccentColor.blue}`,
              }}
              onClick={() => {
                if (!dataUser) {
                  return null;
                } else if (dataUser.profile === undefined) {
                  router.push(RouterProfile.create, { scroll: false });
                } else if (e.link == "") {
                  ComponentGlobal_NotifikasiPeringatan("Cooming Soon");
                } else {
                  router.push(e.link, { scroll: false });
                }
              }}
            >
              <Stack align="center" justify="center" h={"100%"}>
                <ActionIcon
                  size={50}
                  variant="transparent"
                  c={e.link == "" ? "gray.3" : MainColor.white}
                >
                  {e.icon}
                </ActionIcon>
                <Text c={e.link == "" ? "gray.3" : MainColor.white} fz={"xs"}>
                  {e.name}
                </Text>
              </Stack>
            </Paper>
          ))}
        </SimpleGrid>

        {/* Job View */}
        <Paper
          p={"md"}
          w={"100%"}
          bg={MainColor.darkblue}
          style={{
            borderRadius: "10px 10px 10px 10px",
            border: `2px solid ${AccentColor.blue}`,
          }}
        >
          <Stack
            onClick={() => {
              if (!dataUser) {
                return null;
              } else if (dataUser.profile === undefined) {
                router.push(RouterProfile.create, { scroll: false });
              } else if (menuHomeJob.link == "") {
                ComponentGlobal_NotifikasiPeringatan("Cooming Soon ");
              } else {
                router.push(menuHomeJob.link, { scroll: false });
              }
            }}
          >
            <Group>
              <ActionIcon
                variant="transparent"
                size={40}
                c={menuHomeJob.link == "" ? "gray.3" : MainColor.white}
              >
                {menuHomeJob.icon}
              </ActionIcon>
              <Text c={menuHomeJob.link == "" ? "gray.3" : MainColor.white}>
                {menuHomeJob.name}
              </Text>
            </Group>
            {loadingJob ? (
              Array(1)
                .fill(null)
                .map((_, i) => (
                  <Box key={i} mb={"md"}>
                    <Grid>
                      <Grid.Col span={6}>
                        <CustomSkeleton
                          height={10}
                          mt={0}
                          radius="xl"
                          width={"75%"}
                        />
                        <CustomSkeleton height={10} mt={10} radius="xl" />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <CustomSkeleton
                          height={10}
                          mt={0}
                          radius="xl"
                          width={"75%"}
                        />
                        <CustomSkeleton height={10} mt={10} radius="xl" />
                      </Grid.Col>
                    </Grid>
                  </Box>
                ))
            ) : _.isEmpty(dataJob) ? (
              <ComponentGlobal_IsEmptyData text="Tidak ada data" height={10} />
            ) : (
              <SimpleGrid cols={2} spacing="md">
                {dataJob?.map((e, i) => (
                  <Stack key={e.id}>
                    <Group spacing={"xs"}>
                      <Stack h={"100%"} align="center" justify="flex-start">
                        <IconUserSearch size={20} color={MainColor.white} />
                      </Stack>
                      <Stack spacing={0} w={"60%"}>
                        <Text
                          lineClamp={1}
                          fz={"sm"}
                          c={MainColor.yellow}
                          fw={"bold"}
                        >
                          {e?.Author.username}
                        </Text>
                        <Text fz={"sm"} c={MainColor.white} lineClamp={2}>
                          {e?.title}
                        </Text>
                      </Stack>
                    </Group>
                  </Stack>
                ))}
              </SimpleGrid>
            )}
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
