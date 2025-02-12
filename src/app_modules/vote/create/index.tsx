"use client";

import { IRealtimeData } from "@/lib/global_state";
import { RouterVote } from "@/lib/router_hipmi/router_vote";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import {
  Box,
  Button,
  Center,
  Group,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { Vote_funCreate } from "../fun/create/create_vote";
import { gs_vote_hotMenu } from "../global_state";
import { clientLogger } from "@/util/clientLogger";

export default function Vote_Create() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hotMenu, setHotMenu] = useAtom(gs_vote_hotMenu);

  const [data, setData] = useState({
    title: "",
    deskripsi: "",
    awalVote: "",
    akhirVote: "",
  });

  const [listVote, setListVote] = useState([
    {
      name: "Nama Pilihan",
      value: "",
    },
    {
      name: "Nama Pilihan",
      value: "",
    },
  ]);

  async function onSave() {
    if (_.values(data).includes(""))
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");

    const cekAwalVote = moment(data.awalVote).format();
    if (cekAwalVote === "Invalid date")
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Tanggal");

    const cekAkhirVote = moment(data.akhirVote).format();
    if (cekAkhirVote === "Invalid date")
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Tanggal");

    if (_.values(listVote.map((e) => e.value)).includes(""))
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Pilihan Voting");

    // console.log("berhasil");

    try {
      setIsLoading(true);
      const res = await Vote_funCreate(data as any, listVote);
      if (res.status === 201) {
        const dataNotifikasi: IRealtimeData = {
          appId: res.data?.id as any,
          status: res.data?.Voting_Status?.name as any,
          userId: res.data?.authorId as any,
          pesan: res.data?.title as any,
          kategoriApp: "VOTING",
          title: "Voting baru",
        };

        const notif = await notifikasiToAdmin_funCreate({
          data: dataNotifikasi as any,
        });

        if (notif.status === 201) {
          WibuRealtime.setData({
            type: "notification",
            pushNotificationTo: "ADMIN",
          });

          WibuRealtime.setData({
            type: "trigger",
            pushNotificationTo: "ADMIN",
            dataMessage: dataNotifikasi,
          });

          setHotMenu(2);
          router.replace(RouterVote.status({ id: "2" }));
          ComponentGlobal_NotifikasiBerhasil(res.message);

        }
      } else {
        setIsLoading(false);
        ComponentGlobal_NotifikasiGagal(res.message);
      }

    } catch (error) {
      setIsLoading(false);
      clientLogger.error("Error create voting", error);

    }
  }

  return (
    <>
      <Stack px={"sm"} spacing={"xl"} mb={"xl"}>
        <Stack>
          <TextInput
            styles={{
              label: {
                color: MainColor.white,
              },
              input: {
                backgroundColor: MainColor.white,
              },
              required: {
                color: MainColor.red,
              }
            }}
            label="Judul"
            withAsterisk
            placeholder="Masukan judul"
            maxLength={100}
            onChange={(val) => {
              setData({
                ...data,
                title: val.target.value,
              });
            }}
          />
          <Stack spacing={5}>
            <Textarea
              styles={{
                label: {
                  color: MainColor.white,
                },
                input: {
                  backgroundColor: MainColor.white,
                },
                required: {
                  color: MainColor.red,
                }
              }}
              label="Deskripsi"
              autosize
              minRows={2}
              maxRows={5}
              withAsterisk
              maxLength={300}
              placeholder="Masukan deskripsi"
              onChange={(val) => {
                setData({
                  ...data,
                  deskripsi: val.target.value,
                });
              }}
            />
            <ComponentGlobal_InputCountDown
              maxInput={300}
              lengthInput={data.deskripsi.length}
            />
          </Stack>

          <DatePickerInput
            styles={{
              label: {
                color: MainColor.white,
              },
              input: {
                backgroundColor: MainColor.white,
              },
              required: {
                color: MainColor.red,
              }
            }}
            label="Jangka Waktu"
            placeholder="Masukan jangka waktu voting"
            withAsterisk
            dropdownType="modal"
            type="range"
            excludeDate={(date) => {
              return moment(date).diff(Date.now(), "days") < 0;
            }}
            onChange={(val: any) => {
              setData({
                ...data,
                awalVote: val[0],
                akhirVote: val[1],
              });
            }}
          />
        </Stack>

        <Stack spacing={0}>
          <Center>
            <Text fw={"bold"} fz={"sm"} c={MainColor.white}>
              Daftar Pilihan
            </Text>
          </Center>

          <Stack spacing={"xl"}>
            <Stack>
              {listVote.map((e, index) => (
                <Box key={index}>
                  <TextInput
                    styles={{
                      label: {
                        color: MainColor.white,
                      },
                      input: {
                        backgroundColor: MainColor.white,
                      },
                      required: {
                        color: MainColor.red,
                      }
                    }}
                    label={e.name}
                    withAsterisk
                    maxLength={100}
                    placeholder="Nama pilihan voting"
                    onChange={(v) => {
                      const val = _.clone(listVote);
                      val[index].value = v.currentTarget.value;
                      setListVote([...val]);
                    }}
                  />
                </Box>
              ))}
            </Stack>

            <Group position="center">
              <Button
                disabled={listVote.length >= 4 ? true : false}
                radius={"xl"}
                leftIcon={<IconPlus size={15} />}
                onClick={() => {
                  setListVote([
                    ...listVote,
                    { name: "Nama Voting", value: "" },
                  ]);
                }}
                compact
                bg={MainColor.yellow}
                color={"yellow"}
                c={"black"}
              >
                <Text fz={8}>Tambah List</Text>
              </Button>

              <Button
                disabled={listVote.length <= 2 ? true : false}
                radius={"xl"}
                leftIcon={<IconMinus size={15} />}
                onClick={() => {
                  setListVote([...listVote.slice(0, -1)]);
                }}
                compact
                bg={MainColor.yellow}
                color={"yellow"}
                c={"black"}
              >
                <Text fz={8}>Kurangi List</Text>
              </Button>
            </Group>
          </Stack>
        </Stack>

        <Button
          disabled={
            !data.title ||
              !data.deskripsi ||
              !data.awalVote ||
              !data.akhirVote ||
              listVote.map((e, i) => e.value).includes("")
              ? true
              : false
          }
          loaderPosition="center"
          loading={isLoading ? true : false}
          mt={"lg"}
          radius={"xl"}
          onClick={() => {
            onSave();
          }}
          c={"black"}
          bg={MainColor.yellow}
          color="yellow"
          style={{
            transition: "0.5s",
          }}
        >
          Simpan
        </Button>
      </Stack>
    </>
  );
}
