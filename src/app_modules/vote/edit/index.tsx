"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import {
  ActionIcon,
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
import { useShallowEffect } from "@mantine/hooks";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Vote_funEditById } from "../fun/edit/fun_edit_by_id";
import { Vote_getListDaftarNamaById } from "../fun/get/get_list_daftar_vote_by_id";
import { gs_vote_hotMenu, gs_vote_status } from "../global_state";
import {
  MODEL_VOTING,
  MODEL_VOTING_DAFTAR_NAMA_VOTE,
} from "../model/interface";
import { clientLogger } from "@/util/clientLogger";
import Component_V3_Label_TextInput from "@/app_modules/_global/component/new/comp_V3_label_text_input";
import { Component_V3_TextEditor } from "@/app_modules/_global/component/new/comp_V3_text_editor";
import { funReplaceHtml } from "@/app_modules/_global/fun/fun_replace_html";
import { maxInputLength } from "@/app_modules/_global/lib/maximal_setting";

export default function Vote_Edit({
  dataVote,
  listDaftarVote,
}: {
  dataVote: MODEL_VOTING;
  listDaftarVote: MODEL_VOTING_DAFTAR_NAMA_VOTE[];
}) {
  const [data, setData] = useState(dataVote);
  const [pilihanNama, setPilihanNama] = useState(listDaftarVote);

  useShallowEffect(() => {
    onLoadList();
  }, []);

  async function onLoadList() {
    const loadList = await Vote_getListDaftarNamaById(data.id);
    setPilihanNama(loadList as any);
  }

  return (
    <>
      <Stack px={"sm"} c={"white"} mb={"xl"}>
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
            },
          }}
          label="Judul"
          withAsterisk
          placeholder="Judul"
          value={data.title}
          maxLength={100}
          error={
            data.title === "" ? (
              <ComponentGlobal_ErrorInput text="Masukan judul" />
            ) : (
              ""
            )
          }
          onChange={(val) => {
            setData({
              ...data,
              title: val.target.value,
            });
          }}
        />

        <Stack spacing={5}>
          <Component_V3_Label_TextInput text="Deskripsi" />

          <Component_V3_TextEditor
            data={data.deskripsi}
            onSetData={(val) => {
              setData({
                ...data,
                deskripsi: val,
              });
            }}
          />
          {funReplaceHtml({ html: data.deskripsi }).length === 0 && (
            <ComponentGlobal_ErrorInput text="Masukan deskripsi" />
          )}

          <ComponentGlobal_InputCountDown
            lengthInput={funReplaceHtml({ html: data.deskripsi }).length}
            maxInput={maxInputLength}
          />
        </Stack>

        {/* <Stack spacing={5}>
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
              },
            }}
            label="Deskripsi"
            autosize
            minRows={2}
            maxRows={5}
            withAsterisk
            placeholder="Deskripsi"
            value={data.deskripsi}
            maxLength={300}
            error={
              data.deskripsi === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan deskripsi" />
              ) : (
                ""
              )
            }
            onChange={(val) => {
              setData({
                ...data,
                deskripsi: val.target.value,
              });
            }}
          />
          <ComponentGlobal_InputCountDown
            lengthInput={data.deskripsi.length}
            maxInput={300}
          />
        </Stack> */}

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
            },
          }}
          label="Jangka Waktu"
          placeholder="Masukan jangka waktu voting"
          withAsterisk
          dropdownType="modal"
          type="range"
          excludeDate={(date) => {
            return moment(date).diff(Date.now(), "days") < 0;
          }}
          value={[data.awalVote, data.akhirVote]}
          error={
            data.awalVote === null || data.akhirVote === null ? (
              <ComponentGlobal_ErrorInput text="Invalid Date" />
            ) : (
              ""
            )
          }
          onChange={(val: any) => {
            setData({
              ...data,
              awalVote: val[0],
              akhirVote: val[1],
            });
          }}
        />

        <Stack spacing={0}>
          <Center>
            <Text fw={"bold"} fz={"sm"}>
              Daftar Pilihan
            </Text>
          </Center>

          <Stack>
            <Stack>
              {pilihanNama.map((e, index) => (
                <Group key={index} position="apart" align="center">
                  <Box w={"85%"}>
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
                        },
                      }}
                      label={"Nama Pilihan"}
                      withAsterisk
                      placeholder="Nama pilihan"
                      value={e.value}
                      maxLength={100}
                      error={
                        e.value === "" ? (
                          <ComponentGlobal_ErrorInput text="Masukan nama pilihan" />
                        ) : (
                          ""
                        )
                      }
                      onChange={(v) => {
                        const cloneData = _.clone(pilihanNama);
                        cloneData[index].value = v.currentTarget.value;
                        setPilihanNama([...pilihanNama]);
                      }}
                    />
                  </Box>
                  <ActionIcon
                    mt={"lg"}
                    variant="transparent"
                    radius={"xl"}
                    disabled={pilihanNama.length < 3 ? true : false}
                    onClick={() => {
                      pilihanNama.splice(index, 1);
                      setPilihanNama([...pilihanNama]);
                    }}
                  >
                    <IconTrash
                      style={{
                        transition: "0.5s",
                      }}
                      color={pilihanNama.length < 3 ? "gray" : "red"}
                    />
                  </ActionIcon>
                </Group>
              ))}
            </Stack>

            <Group position="center">
              <Button
                disabled={pilihanNama.length >= 4 ? true : false}
                radius={"xl"}
                leftIcon={<IconPlus size={15} />}
                onClick={() => {
                  setPilihanNama([...(pilihanNama as any), { value: "" }]);
                }}
                compact
                bg={MainColor.yellow}
                color={"yellow"}
                c={"black"}
              >
                <Text fz={8}>Tambah List</Text>
              </Button>
            </Group>
          </Stack>
        </Stack>

        <ButtonAction data={data} listVoting={pilihanNama} />

        {/* <pre>{JSON.stringify(listDaftarVote, null, 2)}</pre> */}
      </Stack>
    </>
  );
}

function ButtonAction({
  data,
  listVoting,
}: {
  data: MODEL_VOTING;
  listVoting: MODEL_VOTING_DAFTAR_NAMA_VOTE[];
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hotMenu, setHotMenu] = useAtom(gs_vote_hotMenu);
  const [tabsStatus, setTabsStatus] = useAtom(gs_vote_status);

  async function onUpdate() {
    // console.log(listVoting);

    try {
      setIsLoading(true);
      await Vote_funEditById(data, listVoting).then((res) => {
        if (res.status === 200) {
          ComponentGlobal_NotifikasiBerhasil("Berhasil Update");
          // setHotMenu(1);
          // setTabsStatus("Draft");
          router.back();
        } else {
          setIsLoading(false);
          ComponentGlobal_NotifikasiGagal(res.message);
        }
      });
    } catch (error) {
      setIsLoading(false);
      clientLogger.error("Error update voting", error);
    }
  }

  return (
    <>
      <Button
        disabled={
          !data.title ||
          funReplaceHtml({ html: data.deskripsi }).length > maxInputLength ||
          funReplaceHtml({ html: data.deskripsi }).length === 0
        }
        loaderPosition="center"
        loading={isLoading ? true : false}
        mt={"lg"}
        radius={"xl"}
        onClick={() => onUpdate()}
        c={"black"}
        bg={MainColor.yellow}
        color="yellow"
        style={{
          transition: "0.5s",
        }}
      >
        Update
      </Button>
    </>
  );
}
