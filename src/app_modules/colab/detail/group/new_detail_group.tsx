"use client";

import { RouterColab } from "@/lib/router_hipmi/router_colab";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import mqtt_client from "@/util/mqtt_client";
import {
  ActionIcon,
  Box,
  Center,
  Container,
  Grid,
  Group,
  Loader,
  Paper,
  rem,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import {
  IconChevronLeft,
  IconCircle,
  IconInfoSquareRounded,
  IconSend,
} from "@tabler/icons-react";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import useInfiniteScroll, {
  ScrollDirection,
} from "react-easy-infinite-scroll-hook";
import ComponentColab_IsEmptyData from "../../component/is_empty_data";
import colab_funCreateMessageByUserId from "../../fun/create/room/fun_create_message_by_user_id";
import colab_getMessageByRoomId from "../../fun/get/room_chat/get_message_by_room_id";
import {
  MODEL_COLLABORATION_MESSAGE,
  MODEL_COLLABORATION_ROOM_CHAT,
} from "../../model/interface";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { apiGetDataGroupById } from "../../_lib/api_collaboration";
import { clientLogger } from "@/util/clientLogger";
import { apiNewGetUserIdByToken } from "@/app_modules/_global/lib/api_fetch_global";
import { apiGetUserById } from "@/app_modules/_global/lib/api_user";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import moment from "moment";
import "moment/locale/id";

export default function Colab_NewGroupChatView({
  listMsg,
  selectRoom,
}: {
  listMsg: any;
  selectRoom: MODEL_COLLABORATION_ROOM_CHAT;
}) {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [loadingBack, setLoadingBack] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [msg, setMsg] = useState("");
  const [newMessage, setNewMessage] = useState<any>();
  const [data, setData] = useState<any[]>(listMsg);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isGet, setIsGet] = useState(true);
  const [newMessageId, setIdMessage] = useState("");
  const [dataGroup, setDataGroup] =
    useState<MODEL_COLLABORATION_ROOM_CHAT | null>(null);
  const [userLoginId, setUserLoginId] = useState<string | null>();
  const [dataUserLogin, setDataUserLogin] = useState<MODEL_USER | null>(null);

  async function handleDataUserLogin() {
    try {
      const response = await apiNewGetUserIdByToken();

      if (response.success) {
        setUserLoginId(response.userId);
        const respone = await apiGetUserById({ id: response.userId });
        if (respone) {
          setDataUserLogin(respone.data);
        }
      } else {
        setUserLoginId(null);
        setDataUserLogin(null);
      }
    } catch (error) {
      clientLogger.error("Error get data user login", error);
    }
  }

  useShallowEffect(() => {
    onLoadDataGroup();
    handleDataUserLogin();
  }, []);

  async function onLoadDataGroup() {
    try {
      const respone = await apiGetDataGroupById({
        id: params.id,
        kategori: "detail",
      });

      if (respone) {
        setDataGroup(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get data group", error);
    }
  }

  const next = async (direction: ScrollDirection) => {
    try {
      setIsLoading(true);
      await new Promise((a) => setTimeout(a, 500));

      const newData = await colab_getMessageByRoomId({
        roomId: selectRoom?.id,
        page: totalPage + 1,
      });
      setTotalPage(totalPage + 1);

      // console.log(newData, "loading baru");

      if (_.isEmpty(newData)) {
        setIsGet(false);
      } else {
        const d =
          direction === "down" ? [...data, ...newData] : [...newData, ...data];
        setData(d);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const ref = useInfiniteScroll({
    next,
    rowCount: data.length,
    hasMore: { up: isGet },
    scrollThreshold: 0.5,
  });

  async function onSend() {
    await colab_funCreateMessageByUserId(msg, selectRoom.id).then(
      async (res) => {
        if (res.status === 200) {
          setIdMessage(res.data?.id as any);
          setMsg("");
          const kiriman: MODEL_COLLABORATION_MESSAGE = {
            createdAt: new Date(),
            id: newMessageId,
            isActive: true,
            message: msg,
            isFile: false,
            updatedAt: new Date(),
            userId: dataUserLogin?.id as string,
            User: {
              id: dataUserLogin?.id as string,
              Profile: {
                id: dataUserLogin?.Profile?.id as any,
                name: dataUserLogin?.Profile?.name as any,
              },
            },
          };
          mqtt_client.publish(selectRoom.id, JSON.stringify(kiriman));
        } else {
          ComponentGlobal_NotifikasiGagal(res.message);
        }
      }
    );
  }

  useShallowEffect(() => {
    mqtt_client.subscribe(selectRoom.id);
    // mqtt_client.on("message", (topic: any, message: any) => {
    //   onList(message.toString());
    // });

    mqtt_client.on("message", (topic: any, message: any) => {
      let dd = _.clone(data);
      const a = [...dd, JSON.parse(message)];
      // console.log(dd.length);
      setData(a);
    });
  }, [data]);

  async function onList(message: any) {
    const kiriman: MODEL_COLLABORATION_MESSAGE = {
      createdAt: new Date(),
      id: newMessageId,
      isActive: true,
      message: message,
      isFile: false,
      updatedAt: new Date(),
      userId: dataUserLogin?.id as string,
      User: {
        id: dataUserLogin?.id as string,
        Profile: {
          id: dataUserLogin?.Profile?.id as any,
          name: dataUserLogin?.Profile?.name as any,
        },
      },
    };

    const dataLama = _.clone(data);
    setData([...dataLama, { ...kiriman }]);
  }

  return (
    <>
      <Box
        w={"100%"}
        h={"100%"}
        style={{
          overflowY: "auto",
          overflowX: "auto",
          backgroundColor: MainColor.black,
          position: "fixed",
        }}
      >
        <Container mih={"100vh"} p={0} size={rem(500)} bg={MainColor.darkblue}>
          {/* Header */}
          <Box
            h={"8vh"}
            style={{
              zIndex: 10,
              borderBottom: `2px solid ${MainColor.soft_darkblue}`,
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
            w={"100%"}
            pos={"sticky"}
            top={0}
            bg={MainColor.darkblue}
          >
            <Stack h={"100%"} justify="center" px={"sm"}>
              <Grid grow gutter={"lg"} align="center">
                <Grid.Col span={2}>
                  <ActionIcon
                    variant="transparent"
                    radius={"xl"}
                    onClick={() => {
                      setLoadingBack(true);
                      router.back();
                    }}
                  >
                    {loadingBack ? (
                      <ComponentGlobal_Loader />
                    ) : (
                      <IconChevronLeft color={MainColor.white} />
                    )}
                  </ActionIcon>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Center>
                    <Title color={MainColor.white} order={5} lineClamp={1}>
                      {selectRoom?.name}
                    </Title>
                  </Center>
                </Grid.Col>
                <Grid.Col span={2}>
                  <Group position="right">
                    <ActionIcon
                      variant="transparent"
                      radius={"xl"}
                      onClick={() => {
                        setLoadingInfo(true);
                        router.push(RouterColab.info_grup + selectRoom.id, {
                          scroll: false,
                        });
                      }}
                    >
                      {loadingInfo ? (
                        <ComponentGlobal_Loader />
                      ) : (
                        <IconInfoSquareRounded color={MainColor.white} />
                      )}
                    </ActionIcon>
                  </Group>
                </Grid.Col>
              </Grid>
            </Stack>
          </Box>

          {/* Main View */}
          <Box
            py={"xs"}
            px={"xs"}
            pos={"static"}
            style={{ zIndex: 0 }}
            h={"82vh"}
          >
            {/* Chat View */}
            <Box h={"100%"}>
              <Stack justify="flex-end" h={"100%"}>
                <div
                  ref={ref as any}
                  style={{
                    overflowY: "auto",
                  }}
                >
                  {_.isEmpty(data) ? (
                    <ComponentColab_IsEmptyData text="Belum ada pesan" />
                  ) : isLoading || !dataUserLogin ? (
                    <Center>
                      <Loader size={20} color="yellow" />
                    </Center>
                  ) : (
                    data.map((e, i) => (
                      <Box key={i}>
                        {userLoginId === e?.User?.id ? (
                          <Group position="right" ml={"lg"}>
                            <Paper key={e?.id} bg={"blue.3"} p={5} mt={"sm"}>
                              <Stack spacing={"xs"}>
                                <Text lineClamp={1} fw={"bold"} fz={"xs"}>
                                  {e?.User?.Profile?.name}
                                </Text>
                                <Paper p={5} bg={"blue.2"}>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: e?.message,
                                    }}
                                  />
                                </Paper>

                                <Group spacing={"xs"}>
                                  <Text fz={7}>
                                    {moment(e.createdAt).format("ll")}
                                  </Text>
                                  <IconCircle size={3} />
                                  <Text fz={7}>
                                    {moment(e.createdAt).format("LT")}
                                  </Text>
                                </Group>
                              </Stack>
                            </Paper>
                          </Group>
                        ) : (
                          <Group mr={"lg"}>
                            <Paper key={e?.id} bg={"cyan.3"} p={5} mt={"sm"}>
                              <Stack spacing={"xs"}>
                                <Text lineClamp={1} fw={"bold"} fz={"xs"}>
                                  {e?.User?.Profile?.name}
                                </Text>
                                <Paper p={5} bg={"cyan.2"}>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: e?.message,
                                    }}
                                  />
                                </Paper>
                                <Group spacing={"xs"}>
                                  <Text fz={7}>
                                    {moment(e.createdAt).format("ll")}
                                  </Text>
                                  <IconCircle size={3} />
                                  <Text fz={7}>
                                    {moment(e.createdAt).format("LT")}
                                  </Text>
                                </Group>
                              </Stack>
                            </Paper>
                          </Group>
                        )}
                      </Box>
                    ))
                  )}
                </div>
              </Stack>
            </Box>
          </Box>

          {/* Footer */}
          <Box
            style={{
              position: "relative",
              bottom: 0,
              height: "10vh",
              zIndex: 10,
              // borderRadius: "20px 20px 0px 0px",
              borderTop: `2px solid ${AccentColor.blue}`,
              borderRight: `1px solid ${AccentColor.blue}`,
              borderLeft: `1px solid ${AccentColor.blue}`,
            }}
            bg={AccentColor.darkblue}
          >
            {/* <Button
            onClick={() => {
              const d: { [key: string]: any } = _.clone(data[0]);
              setData([...data, d]);
            }}
          >
            KIzRIM PESAN
          </Button> */}
            <Stack justify="center" h={"100%"} px={"sm"}>
              <Grid align="center">
                <Grid.Col span={"auto"}>
                  <Textarea
                    styles={{ input: { backgroundColor: MainColor.white } }}
                    minRows={1}
                    radius={"md"}
                    placeholder="Ketik pesan anda..."
                    value={msg}
                    onChange={(val) => setMsg(val.currentTarget.value)}
                  />
                </Grid.Col>
                <Grid.Col span={"content"}>
                  <ActionIcon
                    disabled={msg === "" ? true : false}
                    variant="filled"
                    styles={{
                      root: {
                        backgroundColor: MainColor.white,
                      },
                    }}
                    color={MainColor.darkblue}
                    radius={"xl"}
                    size={"xl"}
                    onClick={() => {
                      onSend();
                    }}
                    style={{
                      transition: "0.5s",
                    }}
                  >
                    <IconSend size={20} />
                  </ActionIcon>
                </Grid.Col>
              </Grid>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}
