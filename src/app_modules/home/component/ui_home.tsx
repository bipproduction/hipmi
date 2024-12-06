"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import {
  Box,
  Paper,
  Stack,
  SimpleGrid,
  ActionIcon,
  Loader,
  Group,
  Image,
  Text,
  Avatar,
  Center,
} from "@mantine/core";
import {
  IconPresentation,
  IconAffiliate,
  IconPackageImport,
  IconHeartHandshake,
  IconBriefcase,
  IconUserSearch,
  IconMap2,
  IconMessages,
  IconShoppingBag,
  IconUserCircle,
} from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_USER } from "../model/interface";
import { MODEL_JOB } from "@/app_modules/job/model/interface";
import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { RouterMap } from "@/app/lib/router_hipmi/router_map";
import { Home_ComponentAvatarProfile } from "./comp_avatar_profile";
import { APIs } from "@/app/lib";

export function Home_UiView({
  dataUser,
  dataJob,
}: {
  dataUser: MODEL_USER;
  dataJob: MODEL_JOB[];
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [pageId, setPageId] = useState(0);
  const [isLoadingJob, setLoadingJob] = useState(false);

  const listPageOnBox = [
    {
      id: 1,
      name: "Event",
      icon: <IconPresentation size={50} />,
      link: RouterEvent.splash,
    },
    {
      id: 2,
      name: "Collaboration",
      icon: <IconAffiliate size={50} />,
      link: RouterColab.splash,
    },

    {
      id: 3,
      name: "Voting",
      icon: <IconPackageImport size={50} />,
      link: RouterVote.splash,
    },

    {
      id: 4,
      name: "Crowd Funding",
      icon: <IconHeartHandshake size={50} />,
      link: `/dev/crowd/splash`,
    },
  ];

  const routePageJob = {
    name: "Job Vacancy",
    icon: <IconBriefcase size={50} />,
    link: RouterJob.spalsh,
  };

  return (
    <>
      <Box>
        <Paper
          radius={"xl"}
          mb={"xs"}
          style={{
            borderRadius: "10px 10px 10px 10px",
            border: `2px solid ${AccentColor.blue}`,
          }}
        >
          <Image radius={"lg"} alt="logo" src={"/aset/home/home-hipmi-new.png"} />
        </Paper>

        <Stack my={"sm"}>
          <SimpleGrid
            cols={2}
            spacing="md"
            // breakpoints={[
            //   { maxWidth: 'md', cols: 2, spacing: 'md' },
            //   { maxWidth: 'sm', cols: 2, spacing: 'sm' },
            //   { maxWidth: 'xs', cols: 1, spacing: 'xs' },
            // ]}
          >
            {listPageOnBox.map((e, i) => (
              <Paper
                key={e.id}
                h={150}
                bg={MainColor.darkblue}
                style={{
                  borderRadius: "10px 10px 10px 10px",
                  border: `2px solid ${AccentColor.blue}`,
                }}
                onClick={() => {
                  if (dataUser.Profile === null) {
                    return ComponentGlobal_NotifikasiPeringatan(
                      "Lengkapi Profile"
                    );
                  } else {
                    if (e.link === "") {
                      return ComponentGlobal_NotifikasiPeringatan(
                        "Cooming Soon !!"
                      );
                    } else {
                      setIsLoading(true);
                      setPageId(e.id);
                      router.push(e.link, { scroll: false });
                    }
                  }
                }}
              >
                <Stack align="center" justify="center" h={"100%"}>
                  <ActionIcon
                    size={50}
                    variant="transparent"
                    c={e.link === "" ? "gray.3" : "white"}
                  >
                    {isLoading && e.id === pageId ? (
                      <Loader color={AccentColor.yellow} />
                    ) : (
                      e.icon
                    )}
                  </ActionIcon>
                  <Text c={e.link === "" ? "gray.3" : "white"} fz={"xs"}>
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
                if (dataUser.Profile === null) {
                  return ComponentGlobal_NotifikasiPeringatan(
                    "Lengkapi Profile"
                  );
                } else {
                  if (routePageJob.link === "") {
                    return ComponentGlobal_NotifikasiPeringatan(
                      "Cooming Soon !!"
                    );
                  } else {
                    setLoadingJob(true);
                    return router.push(routePageJob.link, { scroll: false });
                  }
                }
              }}
            >
              <Group>
                <ActionIcon
                  variant="transparent"
                  size={40}
                  c={routePageJob.link === "" ? "gray.3" : "white"}
                >
                  {isLoadingJob ? (
                    <Loader color={AccentColor.yellow} size={20} />
                  ) : (
                    routePageJob.icon
                  )}
                </ActionIcon>
                <Text c={routePageJob.link === "" ? "gray.3" : "white"}>
                  {routePageJob.name}
                </Text>
              </Group>

              {_.isEmpty(dataJob) ? (
                <ComponentGlobal_IsEmptyData text="-" height={10} />
              ) : (
                <SimpleGrid cols={2} spacing="md">
                  {dataJob.map((e, i) => (
                    <Stack key={e.id}>
                      <Group spacing={"xs"}>
                        <Stack h={"100%"} align="center" justify="flex-start">
                          <IconUserSearch size={20} color="white" />
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
                          <Text fz={"sm"} c={"white"} lineClamp={2}>
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
    </>
  );
}

const listHalamanFooter = [
  {
    id: 1,
    name: "Forums",
    icon: <IconMessages />,
    link: RouterForum.splash,
  },
  {
    id: 2,
    name: "MarketPlace",
    icon: <IconShoppingBag />,
    link: "",
  },
  {
    id: 3,
    name: "Business Maps",
    icon: <IconMap2 />,
    link: RouterMap.splash,
  },
];

export function Home_UiFooter({ dataUser }: { dataUser: MODEL_USER }) {
  const router = useRouter();
  const [isLoadingProfil, setIsLoadingProfile] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [pageId, setPageId] = useState(0);
  return (
    <>
      <Box
        style={{
          zIndex: 99,
          borderRadius: "20px 20px 0px 0px",
        }}
        w={"100%"}
        bottom={0}
        h={"9vh"}
      >
        <SimpleGrid cols={listHalamanFooter.length + 1}>
          {listHalamanFooter.map((e, i) => (
            <Center h={"9vh"} key={e.id}>
              <Stack align="center" spacing={0}>
                <ActionIcon
                  radius={"xl"}
                  // loading={isLoadingPage && e.id === pageId ? true : false}
                  c={e.link === "" ? "gray" : "white"}
                  variant="transparent"
                  onClick={() => {
                    if (dataUser?.Profile === null) {
                      ComponentGlobal_NotifikasiPeringatan("Lengkapi Profile");
                    } else {
                      e.link === ""
                        ? ComponentGlobal_NotifikasiPeringatan("Cooming Soon")
                        : (router.push(e.link, { scroll: false }),
                          setIsLoadingPage(true),
                          setPageId(e?.id));
                    }
                  }}
                >
                  {isLoadingPage && e.id === pageId ? (
                    <Loader color={AccentColor.yellow} size={20} />
                  ) : (
                    e.icon
                  )}
                </ActionIcon>
                <Text
                  lineClamp={1}
                  c={e.link === "" ? "gray" : "white"}
                  fz={12}
                >
                  {e.name}
                </Text>
              </Stack>
            </Center>
          ))}

          <Center h={"9vh"}>
            <Stack
              align="center"
              spacing={2}
              onClick={() => {
                setIsLoadingProfile(true);
                if (dataUser?.Profile === null) {
                  router.push(RouterProfile.create, { scroll: false });
                } else {
                  router.push(
                    RouterProfile.katalogOLD + `${dataUser?.Profile?.id}`,
                    { scroll: false }
                  );
                }
              }}
            >
              <ActionIcon variant={"transparent"}>
                {dataUser?.Profile === null ? (
                  <IconUserCircle color="white" />
                ) : isLoadingProfil ? (
                  <Loader color={AccentColor.yellow} size={20} />
                ) : (
                  <Home_ComponentAvatarProfile
                    url={APIs.GET({
                      fileId: dataUser?.Profile?.imageId as string,
                      size: "50"
                    })}
                  />
                )}
              </ActionIcon>
              <Text fz={10} c={"white"}>
                Profile
              </Text>
            </Stack>
          </Center>
        </SimpleGrid>
      </Box>
    </>
  );
}
