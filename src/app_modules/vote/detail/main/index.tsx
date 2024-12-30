"use client";

import { IRealtimeData } from "@/app/lib/global_state";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import notifikasiToUser_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_user";
import { clientLogger } from "@/util/clientLogger";
import {
  Badge,
  Box,
  Button,
  Center,
  Radio,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import moment from "moment";
import "moment/locale/id";
import { useParams } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import {
  apiCheckKontributorToOneVoting,
  apiGetHasilVotingById,
  apiGetOneVotingById,
} from "../../_lib/api_voting";
import ComponentVote_HasilVoting from "../../component/detail/detail_hasil_voting";
import { Voting_ComponentSkeletonDetail } from "../../component/skeleton_view";
import { Vote_funCreateHasil } from "../../fun/create/create_hasil";
import { MODEL_VOTING } from "../../model/interface";

export default function Vote_MainDetail({
  userLoginId,
}: {
  userLoginId: string;
}) {
  const params = useParams<{ id: string }>();
  const today = new Date();
  const [data, setData] = useState<MODEL_VOTING | null>(null);
  const [hasil, setHasil] = useState<any[] | null>(null);
  const [pilihanVotingId, setPilihanVotingId] = useState("");
  const [pilihanKontributor, setPilihanKontributor] = useState<string | null>(
    null
  );

  const [isKontributor, setIsKontributor] = useState<boolean | null>(null);

  useShallowEffect(() => {
    onLoadData();
    onLoadHasil();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetOneVotingById({
        id: params.id,
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get data detail", error);
    }
  }

  async function onLoadHasil() {
    try {
      const respone = await apiGetHasilVotingById({
        id: params.id,
      });

      if (respone) {
        setHasil(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get data hasil voting", error);
    }
  }

  useShallowEffect(() => {
    onCheckKontribusi();
    onLoadPilihan();
  }, []);

  async function onCheckKontribusi() {
    try {
      const respone = await apiCheckKontributorToOneVoting({
        id: params.id,
        kategori: "isKontributor",
      });

      if (respone) {
        setIsKontributor(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error check kontibusi", error);
    }
  }

  async function onLoadPilihan() {
    try {
      const respone = await apiCheckKontributorToOneVoting({
        id: params.id,
        kategori: "pilihan",
      });

      if (respone) {
        setPilihanKontributor(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error check pilihan", error);
    }
  }

  async function onVote() {
    try {
      const res = await Vote_funCreateHasil({
        pilihanVotingId: pilihanVotingId,
        votingId: params.id,
      });
      if (res.status === 201) {
        const respone = await apiGetHasilVotingById({
          id: params.id,
        });

        if (respone) {
          setHasil(respone.data);
          ComponentGlobal_NotifikasiBerhasil(res.message);

          const checkKontibutor = await apiCheckKontributorToOneVoting({
            id: params.id,
            kategori: "isKontributor",
          });

          if (checkKontibutor) {
            setIsKontributor(checkKontibutor.data);
          }

          const checkPilihan = await apiCheckKontributorToOneVoting({
            id: params.id,
            kategori: "pilihan",
          });

          if (checkPilihan) {
            setPilihanKontributor(checkPilihan.data);
          }
        }

        if (userLoginId !== res?.data?.Voting?.authorId) {
          const dataNotifikasi: IRealtimeData = {
            appId: res?.data?.Voting?.id as string,
            userId: res?.data?.Voting?.authorId as string,
            pesan: res?.pilihan as string,
            status: "Voting Masuk",
            kategoriApp: "VOTING",
            title: "User lain telah melakukan voting !",
          };

          const createNotifikasi = await notifikasiToUser_funCreate({
            data: dataNotifikasi as any,
          });

          if (createNotifikasi.status === 201) {
            WibuRealtime.setData({
              type: "notification",
              pushNotificationTo: "USER",
              dataMessage: dataNotifikasi,
            });
          }
        }
      } else {
        ComponentGlobal_NotifikasiPeringatan(res.message);
      }
    } catch (error) {
      clientLogger.error("Error vote", error);
      ComponentGlobal_NotifikasiGagal("Gagal melakukan voting");
    }
  }

  if (_.isNull(data) || _.isNull(hasil) || _.isNull(isKontributor)) {
    return <Voting_ComponentSkeletonDetail />;
  }

  return (
    <>
      <Stack pb={"md"}>
        {moment(data?.awalVote).diff(today, "hours") < 0 ? (
          ""
        ) : (
          <ComponentGlobal_BoxInformation informasi="Untuk sementara voting ini belum di buka. Voting akan dimulai sesuai dengan tanggal awal pemilihan, dan akan ditutup sesuai dengan tanggal akhir pemilihan." />
        )}

        <ComponentGlobal_CardStyles>
          <Stack>
            <ComponentGlobal_AvatarAndUsername
              profile={data?.Author?.Profile as any}
            />

            <Stack spacing={"lg"}>
              <Center>
                <Title order={5} align="center">
                  {data?.title}
                </Title>
              </Center>
              <Text>{data?.deskripsi}</Text>

              <Stack spacing={0}>
                <Stack align="center" spacing={"xs"}>
                  <Text fz={10} fw={"bold"}>
                    Batas Voting
                  </Text>

                  <Badge
                    styles={{
                      root: {
                        backgroundColor: AccentColor.blue,
                        border: `1px solid ${AccentColor.skyblue}`,
                        color: "white",
                        width: "80%",
                      },
                    }}
                  >
                    <Text>
                      {data
                        ? moment(data.awalVote).format("ll")
                        : "tgl awal voting"}{" "}
                      -{" "}
                      {data
                        ? moment(data.akhirVote).format("ll")
                        : "tgl akhir voting"}
                    </Text>
                  </Badge>
                </Stack>
              </Stack>
            </Stack>
            {isKontributor ? (
              <Stack
                align="center"
                spacing={0}
                style={{
                  color: "white",
                }}
              >
                <Text mb={"sm"} fw={"bold"} fz={"xs"}>
                  Pilihan anda:
                </Text>
                <Badge size="lg">{pilihanKontributor}</Badge>
              </Stack>
            ) : (
              <Stack
                spacing={"xl"}
                style={{
                  color: "white",
                }}
              >
                <Radio.Group
                  styles={{
                    label: {
                      color: "white",
                    },
                  }}
                  value={pilihanVotingId}
                  onChange={(val) => {
                    setPilihanVotingId(val);
                  }}
                  label={
                    <Text mb={"sm"} fw={"bold"} fz={"xs"}>
                      Pilihan :
                    </Text>
                  }
                >
                  <Stack px={"md"}>
                    {_.isEmpty(data?.Voting_DaftarNamaVote) ? (
                      <Text>Pilihan Tidak Ditemukan</Text>
                    ) : (
                      data?.Voting_DaftarNamaVote.map((v) => (
                        <Box key={v.id}>
                          <Radio
                            disabled={
                              moment(data?.awalVote).diff(today, "hours") < 0
                                ? false
                                : true
                            }
                            color="yellow"
                            styles={{ label: { color: "white" } }}
                            label={v.value}
                            value={v.id}
                          />
                        </Box>
                      ))
                    )}
                  </Stack>
                </Radio.Group>

                <Center>
                  <Button
                    style={{
                      transition: "all 0.3s ease-in-out",
                    }}
                    disabled={pilihanVotingId == ""}
                    radius={"xl"}
                    bg={MainColor.yellow}
                    color="yellow"
                    c={"black"}
                    onClick={() => onVote()}
                  >
                    Vote
                  </Button>
                </Center>
              </Stack>
            )}
          </Stack>
        </ComponentGlobal_CardStyles>

        <ComponentVote_HasilVoting data={hasil as any} />
      </Stack>
    </>
  );
}