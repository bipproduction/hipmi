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
  Flex,
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
import { useRouter } from "next/navigation";
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
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { ScrollOnly } from "next-scroll-loader";

export default function Colab_DetailGrupDiskusi({
  userLoginId,
  listMsg,
  selectRoom,
  dataUserLogin,
  roomId,
}: {
  userLoginId: string;
  listMsg: any;
  selectRoom: MODEL_COLLABORATION_ROOM_CHAT;
  dataUserLogin: MODEL_USER;
  roomId: string;
}) {
  const [msg, setMsg] = useState("");
  const [newMessage, setNewMessage] = useState<any>();
  const [data, setData] = useState<any[]>(listMsg);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isGet, setIsGet] = useState(true);
  const [newMessageId, setIdMessage] = useState("");

  const [activePage, setActivePage] = useState(1);

  // async function onSend() {
  //   await colab_funCreateMessageByUserId(msg, selectRoom.id).then(
  //     async (res) => {
  //       if (res.status === 200) {
  //         setIdMessage(res.data?.id as any);
  //         setMsg("");
  //         const kiriman: MODEL_COLLABORATION_MESSAGE = {
  //           createdAt: new Date(),
  //           id: newMessageId,
  //           isActive: true,
  //           message: msg,
  //           isFile: false,
  //           updatedAt: new Date(),
  //           userId: dataUserLogin.id,
  //           User: {
  //             id: dataUserLogin.id,
  //             Profile: {
  //               id: dataUserLogin.Profile?.id as any,
  //               name: dataUserLogin.Profile?.name as any,
  //             },
  //           },
  //         };
  //         mqtt_client.publish(selectRoom.id, JSON.stringify(kiriman));
  //       } else {
  //         ComponentGlobal_NotifikasiGagal(res.message);
  //       }
  //     }
  //   );
  // }

  // useShallowEffect(() => {
  //   mqtt_client.subscribe(selectRoom.id);
  //   // mqtt_client.on("message", (topic: any, message: any) => {
  //   //   onList(message.toString());
  //   // });

  //   mqtt_client.on("message", (topic: any, message: any) => {
  //     let dd = _.clone(data);
  //     const a = [...dd, JSON.parse(message)];
  //     // console.log(dd.length);
  //     setData(a);
  //   });
  // }, [data]);

  // async function onList(message: any) {
  //   const kiriman: MODEL_COLLABORATION_MESSAGE = {
  //     createdAt: new Date(),
  //     id: newMessageId,
  //     isActive: true,
  //     message: message,
  //     isFile: false,
  //     updatedAt: new Date(),
  //     userId: dataUserLogin.id,
  //     User: {
  //       id: dataUserLogin.id,
  //       Profile: {
  //         id: dataUserLogin.Profile?.id as any,
  //         name: dataUserLogin.Profile?.name as any,
  //       },
  //     },
  //   };

  //   const dataLama = _.clone(data);
  //   setData([...dataLama, { ...kiriman }]);

  // }

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
          <HeaderGrup selectRoom={selectRoom} />

          {/* Main View */}
          <Box
            py={"xs"}
            px={"xs"}
            pos={"static"}
            style={{ zIndex: 0 }}
            h={"82vh"}
          >
            {/* Chat View */}
            {_.isEmpty(data) ? (
              <ComponentGlobal_IsEmptyData />
            ) : (
              // --- Main component --- //
              <Box bg={"red"}>
                <ScrollOnly
                  height="80vh"
                  renderLoading={() => (
                    <Center mt={"lg"}>
                      <Loader color={"yellow"} />
                    </Center>
                  )}
                  data={data}
                  setData={setData}
                  moreData={async () => {
                    let loadData = await colab_getMessageByRoomId({
                      roomId: roomId,
                      page: 1,
                    });
                    setActivePage((val) => val + 1);

                    return loadData;
                  }}
                >
                  {(item) => (
                    <Flex >{item.message}</Flex>
                    // <Flex bg={"cyan"} align={"flex-end"}>
                    //   {userLoginId === item?.User?.id ? (
                    //     <Group position="right">
                    //       <Paper
                    //         key={item?.id}
                    //         bg={"blue.2"}
                    //         p={"sm"}
                    //         mt={"sm"}
                    //       >
                    //         <Stack spacing={0}>
                    //           <Text lineClamp={1} fw={"bold"} fz={"xs"}>
                    //             {item?.User?.Profile?.name}
                    //           </Text>
                    //           <div
                    //             dangerouslySetInnerHTML={{
                    //               __html: item?.message,
                    //             }}
                    //           />
                    //         </Stack>
                    //       </Paper>
                    //     </Group>
                    //   ) : (
                    //     <Group>
                    //       <Paper
                    //         key={item?.id}
                    //         bg={"cyan.2"}
                    //         p={"sm"}
                    //         mt={"sm"}
                    //       >
                    //         <Stack spacing={0}>
                    //           <Text lineClamp={1} fw={"bold"} fz={"xs"}>
                    //             {item?.User?.Profile?.name}
                    //           </Text>
                    //           <div
                    //             dangerouslySetInnerHTML={{
                    //               __html: item?.message,
                    //             }}
                    //           />
                    //         </Stack>
                    //       </Paper>
                    //     </Group>
                    //   )}
                    // </Flex>
                  )}
                </ScrollOnly>
              </Box>
            )}
          </Box>

          {/* Footer */}
          <FooterGrup msg={msg} setMsg={setMsg} />
        </Container>
      </Box>
    </>
  );
}

function HeaderGrup({
  selectRoom,
}: {
  selectRoom: MODEL_COLLABORATION_ROOM_CHAT;
}) {
  const router = useRouter();
  const [loadingBack, setLoadingBack] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false);
  return (
    <>
      <Box
        h={"8vh"}
        style={{
          zIndex: 10,
        }}
        w={"100%"}
        pos={"sticky"}
        top={0}
        bg={MainColor.darkblue}
      >
        <Stack h={"100%"} justify="center" px={"sm"}>
          <Grid grow gutter={"lg"}>
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
                  <IconChevronLeft color="white" />
                )}
              </ActionIcon>
            </Grid.Col>
            <Grid.Col span={8}>
              <Center>
                <Title c={"white"} order={5} lineClamp={1}>
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
                    <IconInfoSquareRounded color="white" />
                  )}
                </ActionIcon>
              </Group>
            </Grid.Col>
          </Grid>
        </Stack>
      </Box>
    </>
  );
}

function FooterGrup({
  msg,
  setMsg,
}: {
  msg: string;
  setMsg: (val: any) => any;
}) {
  async function onSend() {
    console.log(msg);
  }
  return (
    <>
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
        <Stack justify="center" h={"100%"} px={"sm"}>
          <Grid align="center">
            <Grid.Col span={"auto"}>
              <Textarea
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
                bg={AccentColor.softblue}
                color={"cyan"}
                radius={"xl"}
                size={"xl"}
                onClick={() => {
                  onSend()
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
    </>
  );
}
