"use client";

import { RouterColab } from "@/lib/router_hipmi/router_colab";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { apiGetOneCollaborationById } from "@/app_modules/colab/_lib/api_collaboration";
import ComponentColab_DetailData from "@/app_modules/colab/component/detail/detail_data";
import ComponentColab_AuthorNameOnListPartisipan from "@/app_modules/colab/component/detail/header_author_list_partisipan";
import ComponentColab_IsEmptyData from "@/app_modules/colab/component/is_empty_data";
import {
  Collaboration_SkeletonDetail,
  Collaboration_SkeletonListPrtisipanIsUser,
} from "@/app_modules/colab/component/skeleton_view";
import colab_funCreateRoomChat from "@/app_modules/colab/fun/create/fun_create_room_chat";
import { gs_colab_hot_menu } from "@/app_modules/colab/global_state";
import {
  MODEL_COLLABORATION,
  MODEL_COLLABORATION_PARTISIPASI,
} from "@/app_modules/colab/model/interface";
import { clientLogger } from "@/util/clientLogger";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Checkbox,
  Drawer,
  Grid,
  Group,
  Loader,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Colab_DetailProyekSaya() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_COLLABORATION | null>(null);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetOneCollaborationById({
        id: params.id,
        kategori: "detail",
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get all collaboration", error);
    }
  }

  return (
    <>
      <Stack>
        {_.isNull(data) ? (
          <Collaboration_SkeletonDetail />
        ) : (
          <ComponentGlobal_CardStyles marginBottom={"15px"}>
            <ComponentColab_DetailData data={data} />
          </ComponentGlobal_CardStyles>
        )}

        <CheckBoxPartisipan />
      </Stack>
    </>
  );
}

function CheckBoxPartisipan() {
  const params = useParams<{ id: string }>();
  const [value, setValue] = useState<string[]>([]);
  const [data, setData] = useState<MODEL_COLLABORATION_PARTISIPASI[] | null>(
    null
  );
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    onLoadDataPartisipan();
  }, []);

  async function onLoadDataPartisipan() {
    try {
      const respone = await apiGetOneCollaborationById({
        id: params.id,
        kategori: "list_partisipan",
        page: `${activePage}`,
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get list partisipan", error);
    }
  }

  if (_.isNull(data)) {
    return <Collaboration_SkeletonListPrtisipanIsUser />;
  }

  return (
    <>
      <Stack mb={"lg"}>
        <ComponentGlobal_CardStyles>
          <Stack>
            <Stack spacing={5}>
              <Text c={"red"} fz={10}>
                *
                <Text px={"xs"} span inherit c={MainColor.white}>
                  Pilih user yang akan menjadi tim proyek anda
                </Text>
              </Text>
            </Stack>

            {_.isEmpty(data) ? (
              <ComponentColab_IsEmptyData text="Tidak Ada Pertisipan" />
            ) : (
              <Box>
                <ScrollOnly
                  height="50vh"
                  renderLoading={() => (
                    <Center mt={"lg"}>
                      <Loader color={"yellow"} />
                    </Center>
                  )}
                  data={data}
                  setData={setData as any}
                  moreData={async () => {
                    const respone = await apiGetOneCollaborationById({
                      id: params.id,
                      kategori: "list_partisipan",
                      page: `${activePage + 1}`,
                    });

                    setActivePage((val) => val + 1);

                    return respone.data;
                  }}
                >
                  {(item) => (
                    <Checkbox.Group value={value} onChange={setValue}>
                      <Grid key={item} align="center">
                        <Grid.Col span={2}>
                          <Checkbox color={"yellow"} value={item.User?.id} />
                        </Grid.Col>
                        <Grid.Col span={"auto"}>
                          <ComponentColab_AuthorNameOnListPartisipan
                            isPembatas={true}
                            author={item.User}
                            deskripsi={item.deskripsi_diri}
                          />
                        </Grid.Col>
                      </Grid>
                    </Checkbox.Group>
                  )}
                </ScrollOnly>
              </Box>
            )}
          </Stack>
        </ComponentGlobal_CardStyles>

        <ButtonAction value={value} />
      </Stack>
    </>
  );
}

function ButtonAction({ value }: { value: string[] }) {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [hotMenu, setHotMenu] = useAtom(gs_colab_hot_menu);
  const [nameRoom, setNameRoom] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSave() {
    try {
        setLoading(true);
      if (nameRoom === "")
        return ComponentGlobal_NotifikasiPeringatan("Lengkapi Nama Grup");

      // await notifikasiToUser_CreateGroupCollaboration({ colabId: colabId });

      const res = await colab_funCreateRoomChat(nameRoom, value, params.id);
      if (res.status === 201) {
        // for (let a of value) {
        //   mqtt_client.publish(
        //     "USER",
        //     JSON.stringify({
        //       userId: a,
        //       count: 1,
        //     })
        //   );
        // }

        ComponentGlobal_NotifikasiBerhasil("Berhasil Membuat Grup");
        setHotMenu(4);
        router.replace(RouterColab.grup_diskusi);
      } else {
        ComponentGlobal_NotifikasiGagal("Gagal Membuat Grup");
      }
    } catch (error) {
      clientLogger.error("Error create room chat", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        radius={"xl"}
        disabled={value.length >= 1 ? false : true}
        onClick={() => {
          open();
        }}
        bg={MainColor.yellow}
        color="yellow"
        c={"black"}
        style={{
          transition: "0.5s",
        }}
      >
        Buat Ruang Diskusi
      </Button>

      <Drawer
        opened={opened}
        onClose={close}
        position="bottom"
        size={"auto"}
        withCloseButton={false}
        styles={{
          content: {
            padding: 0,
            position: "absolute",
            margin: "auto",
            backgroundColor: "transparent",
            left: 0,
            right: 0,
            width: 500,
          },
          body: {
            backgroundColor: AccentColor.darkblue,
            borderTop: `2px solid ${AccentColor.blue}`,
            borderRight: `1px solid ${AccentColor.blue}`,
            borderLeft: `1px solid ${AccentColor.blue}`,
            borderRadius: "20px 20px 0px 0px",
            color: "white",
            paddingBottom: "5%",
          },
        }}
      >
        <Stack>
          <Group position="apart">
            <Title c={MainColor.white} order={6}>Nama Grup Diskusi</Title>
            <ActionIcon onClick={close} variant="transparent">
              <IconX color={MainColor.white} />
            </ActionIcon>
          </Group>
          <TextInput
            styles={{ input: { backgroundColor: MainColor.white } }}
            placeholder="Masukan nama grup diskusi .."
            radius={"xl"}
            onChange={(val) => {
              setNameRoom(val.currentTarget.value);
            }}
          />
          <Group position="right">
            <Button
              disabled={!nameRoom}
              loaderPosition="center"
              loading={loading ? true : false}
              radius={"xl"}
              color="yellow"
              c={"black"}
              bg={MainColor.yellow}
              onClick={() => onSave()}
              style={{
                transition: "0.5s",
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Drawer>
    </>
  );
}
