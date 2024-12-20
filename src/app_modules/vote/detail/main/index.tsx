"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import notifikasiToUser_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_user";
import mqtt_client from "@/util/mqtt_client";
import {
  Badge,
  Box,
  Button,
  Center,
  Group,
  Radio,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import _ from "lodash";
import moment from "moment";
import { useState } from "react";
import ComponentVote_HasilVoting from "../../component/detail/detail_hasil_voting";
import { Vote_funCreateHasil } from "../../fun/create/create_hasil";
import { voting_funGetOneVotingbyId } from "../../fun/get/fun_get_one_by_id";
import { MODEL_VOTING } from "../../model/interface";
import { IRealtimeData } from "@/app/lib/global_state";
import { WibuRealtime } from "wibu-pkg";

export default function Vote_MainDetail({
  dataVote,
  hasilVoting,
  isKontributor,
  pilihanKontributor,
  listKontributor,
  userLoginId,
}: {
  dataVote: MODEL_VOTING;
  hasilVoting: any;
  isKontributor: boolean;
  pilihanKontributor: string;
  listKontributor: any[];
  userLoginId: string;
}) {
  const [data, setData] = useState(dataVote);
  const today = new Date();

  return (
    <>
      <Stack pb={"md"}>
        {moment(dataVote?.awalVote).diff(today, "hours") < 0 ? (
          ""
        ) : (
          <ComponentGlobal_BoxInformation informasi="Untuk sementara voting ini belum di buka. Voting akan dimulai sesuai dengan tanggal awal pemilihan, dan akan ditutup sesuai dengan tanggal akhir pemilihan." />
        )}
        <TampilanDataVoting
          dataVote={data}
          setData={setData}
          isKontributor={isKontributor}
          pilihanKontributor={pilihanKontributor}
          userLoginId={userLoginId}
        />
        <ComponentVote_HasilVoting data={data.Voting_DaftarNamaVote} />
      </Stack>
    </>
  );
}

function TampilanDataVoting({
  dataVote,
  setData,
  isKontributor,
  pilihanKontributor,
  userLoginId,
}: {
  dataVote?: MODEL_VOTING;
  setData: any;
  isKontributor: boolean;
  pilihanKontributor: any;
  userLoginId: string;
}) {
  const [votingNameId, setVotingNameId] = useState("");
  const today = new Date();

  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack>
          <ComponentGlobal_AvatarAndUsername
            profile={dataVote?.Author?.Profile as any}
          />
          {/* <ComponentGlobal_AuthorNameOnHeader
            authorName={dataVote?.Author.Profile.name}
            imagesId={dataVote?.Author.Profile.imagesId}
            profileId={dataVote?.Author.Profile.id}
          /> */}
          <Stack spacing={"lg"}>
            <Center>
              <Title order={5} align="center">
                {dataVote?.title}
              </Title>
            </Center>
            <Text>{dataVote?.deskripsi}</Text>

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
                  <Group>
                    <Text>
                      {dataVote?.awalVote.toLocaleDateString(["id-ID"], {
                        dateStyle: "medium",
                      })}
                    </Text>
                    <Text>-</Text>
                    <Text>
                      {dataVote?.akhirVote.toLocaleDateString(["id-ID"], {
                        dateStyle: "medium",
                      })}
                    </Text>
                  </Group>
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
              <Badge size="lg">
                {pilihanKontributor.Voting_DaftarNamaVote.value}
              </Badge>
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
                value={votingNameId}
                onChange={(val) => {
                  setVotingNameId(val);
                }}
                label={
                  <Text mb={"sm"} fw={"bold"} fz={"xs"}>
                    Pilihan :
                  </Text>
                }
              >
                <Stack px={"md"}>
                  {dataVote?.Voting_DaftarNamaVote.map((v) => (
                    <Box key={v.id}>
                      <Radio
                        disabled={
                          moment(dataVote?.awalVote).diff(today, "hours") < 0
                            ? false
                            : true
                        }
                        color="yellow"
                        styles={{ label: { color: "white" } }}
                        label={v.value}
                        value={v.id}
                      />
                    </Box>
                  ))}
                </Stack>
              </Radio.Group>
              <Center>
                {_.isEmpty(votingNameId) ? (
                  <Button radius={"xl"} disabled>
                    Vote
                  </Button>
                ) : (
                  <Button
                    radius={"xl"}
                    onClick={() =>
                      onVote(
                        votingNameId,
                        dataVote?.id as any,
                        setData,
                        userLoginId
                      )
                    }
                    bg={MainColor.yellow}
                    color="yellow"
                    c={"black"}
                  >
                    Vote
                  </Button>
                )}
              </Center>
            </Stack>
          )}
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}

async function onVote(
  pilihanVotingId: string,
  voteId: string,
  setData: any,
  userLoginId: string
) {
  const res = await Vote_funCreateHasil(pilihanVotingId, voteId);
  if (res.status === 201) {
    await voting_funGetOneVotingbyId(voteId).then((val) => {
      setData(val);
      ComponentGlobal_NotifikasiBerhasil(res.message);
    });

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
}
