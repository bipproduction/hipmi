"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import notifikasiToUser_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_user";
import { clientLogger } from "@/util/clientLogger";
import mqtt_client from "@/util/mqtt_client";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Drawer,
  Group,
  Loader,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useParams } from "next/navigation";
import { useState } from "react";
import { apiGetOneCollaborationById } from "../../_lib/api_collaboration";
import colab_funCreatePartisipan from "../../fun/create/fun_create_partisipan_by_user_id";
import { MODEL_COLLABORATION_PARTISIPASI } from "../../model/interface";
import { Collaboration_SkeletonListPrtisipanIsUser } from "../skeleton_view";
import ComponentColab_AuthorNameOnListPartisipan from "./header_author_list_partisipan";

export default function ComponentColab_DetailListPartisipasiUser({
  userLoginId,
  authorId,
}: {
  userLoginId?: string;
  authorId?: string;
}) {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_COLLABORATION_PARTISIPASI[] | null>(
    null
  );
  const [isPartisipan, setCekPartisipan] = useState<boolean | null>(null);

  const [activePage, setActivePage] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const [deskripsi, setDeskripsi] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  useShallowEffect(() => {
    onCheckPartisipasi();
  }, []);

  async function onCheckPartisipasi() {
    try {
      const respone = await apiGetOneCollaborationById({
        id: params.id,
        kategori: "cek_partisipasi",
      });

      if (respone) {
        setCekPartisipan(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error cek partisipasi", error);
    }
  }

  async function onJoin() {
    try {
      setIsLoading(true);
      const res = await colab_funCreatePartisipan({
        id: params.id,
        deskripsi: deskripsi,
      });

      if (res.status === 201) {
        // const dataNotif = {
        //   appId: res?.data?.ProjectCollaboration?.id,
        //   userId: res?.data?.ProjectCollaboration?.userId,
        //   pesan: res?.data?.ProjectCollaboration?.title,
        //   status: "Partisipan Project",
        //   kategoriApp: "COLLABORATION",
        //   title: "Partisipan baru telah bergabung !",
        // };

        // const createNotifikasi = await notifikasiToUser_funCreate({
        //   data: dataNotif as any,
        // });

        // if (createNotifikasi.status === 201) {
        //   mqtt_client.publish(
        //     "USER",
        //     JSON.stringify({
        //       userId: dataNotif.userId,
        //       count: 1,
        //     })
        //   );
        // }

        const respone = await apiGetOneCollaborationById({
          id: params.id,
          kategori: "list_partisipan",
          page: `${activePage}`,
        });

        if (respone) {
          setData(respone.data);
        }

        const cekPartisipan = await apiGetOneCollaborationById({
          id: params.id,
          kategori: "cek_partisipasi",
        });

        if (cekPartisipan) {
          setCekPartisipan(cekPartisipan);
        }

        close();
        ComponentGlobal_NotifikasiBerhasil(res.message);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      clientLogger.error("Error create partisipan", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (_.isNull(data) || _.isNull(isPartisipan)) {
    return <Collaboration_SkeletonListPrtisipanIsUser />;
  }

  return (
    <>
      <Stack>
        {userLoginId !== authorId && (
          <Center>
            <Button
              radius={"xl"}
              disabled={isPartisipan}
              color={isPartisipan ? "green" : "yellow"}
              onClick={open}
              // bg={MainColor.yellow}
            >
              {isPartisipan ? "Telah Berpartisipasi" : "Partisipasi"}
            </Button>
          </Center>
        )}

        {_.isEmpty(data) ? (
          <ComponentGlobal_CardStyles>
            <Stack>
              <Center>
                <Title order={5}>Partispasi User ({data?.length})</Title>
              </Center>
              <ComponentGlobal_IsEmptyData
                height={10}
                text=" Tidak ada partisipan"
              />
            </Stack>
          </ComponentGlobal_CardStyles>
        ) : (
          <ComponentGlobal_CardStyles>
            <Stack spacing={"xl"}>
              <Center>
                <Title order={5}>Partispasi User ({data?.length})</Title>
              </Center>{" "}
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
                    <ComponentColab_AuthorNameOnListPartisipan
                      isPembatas={true}
                      author={item.User}
                      deskripsi={item.deskripsi_diri}
                    />
                  )}
                </ScrollOnly>
              </Box>
            </Stack>
          </ComponentGlobal_CardStyles>
        )}
      </Stack>

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
        <Stack spacing={"xs"}>
          <Group position="right">
            <ActionIcon onClick={close} variant="transparent">
              <IconX color="white" />
            </ActionIcon>
          </Group>
          <Textarea
            maxLength={300}
            label={
              <Text c={"white"} mb={"sm"} fw={"bold"}>
                Deskripsi Diri
              </Text>
            }
            placeholder="Deskripsikan diri anda yang sesuai dengan proyek ini.."
            minRows={4}
            onChange={(val) => {
              setDeskripsi(val.currentTarget.value);
            }}
          />
          <Group position="apart">
            {/* <Button radius={"xl"} onClick={() => close()}>
              Batal
            </Button> */}
            <ComponentGlobal_InputCountDown
              lengthInput={deskripsi?.length}
              maxInput={300}
            />
            <Button
              loaderPosition="center"
              loading={isLoading}
              disabled={!deskripsi}
              radius={"xl"}
              color="yellow"
              bg={MainColor.yellow}
              onClick={() => onJoin()}
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
