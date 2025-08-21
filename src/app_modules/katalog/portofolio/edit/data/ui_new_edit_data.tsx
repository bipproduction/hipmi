"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { apiGetMasterBidangBisnis } from "@/app_modules/_global/lib/api_fetch_master";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { clientLogger } from "@/util/clientLogger";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Grid,
  Select,
  Stack,
  Styles,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PhoneInput } from "react-international-phone";
import {
  apiGetPortofolioById,
  apiUpdatePortofolioById,
} from "../../component/api_fetch_portofolio";
import { Portofolio_SkeletonEditDataBisnis } from "../../component/skeleton_view";
import {
  MODEL_PORTOFOLIO,
  MODEL_PORTOFOLIO_BIDANG_BISNIS,
} from "../../model/interface";
import { ISUB_BIDANG_BISNIS } from "@/app_modules/model_global/portofolio";
import { apiGetSubBidangBisnis } from "../../lib/api_portofolio";
import { BaseSelectStylesNames } from "@mantine/core/lib/Select/types";
import { IconPlus, IconRowRemove, IconTrash } from "@tabler/icons-react";
import Component_V3_Label_TextInput from "@/app_modules/_global/component/new/comp_V3_label_text_input";

interface SubBidangSelected {
  id: string;
  MasterSubBidangBisnis: {
    id: string;
    name: string;
  };
}

interface IUpdatePortofoli {
  namaBisnis: string;
  alamatKantor: string;
  tlpn: string;
  deskripsi: string;
  masterBidangBisnisId: string;
  subBidang: SubBidangSelected[];
}

export default function Portofolio_EditDataBisnis() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const params = useParams<{ id: string }>();
  const portofolioId = params.id;
  const [data, setData] = useState<MODEL_PORTOFOLIO | null>(null);
  const [listBidang, setListBidang] = useState<
    MODEL_PORTOFOLIO_BIDANG_BISNIS[]
  >([]);

  const [listSubBidang, setListSubBidang] = useState<
    ISUB_BIDANG_BISNIS[] | null
  >(null);

  const [selectedSubBidang, setSelectedSubBidang] = useState<
    ISUB_BIDANG_BISNIS[] | null
  >(null);

  const [listSubBidangSelected, setListSubBidangSelected] = useState<
    SubBidangSelected[]
  >([
    {
      id: "",
      MasterSubBidangBisnis: {
        id: "",
        name: "",
      },
    },
  ]);

  useShallowEffect(() => {
    onLoadData();
    onLoadBidang();
    onLoadMasterSubBidangBisnis();
  }, []);

  const onLoadData = async () => {
    try {
      const respone = await apiGetPortofolioById({
        id: portofolioId,
      });

      if (respone.success) {
        setData(respone.data);

        // Cek apakah ada sub bidang bisnis yang terpilih
        const subBidangData = respone.data.Portofolio_BidangDanSubBidangBisnis;

        // Jika ada sub bidang, gunakan data tersebut
        if (subBidangData && subBidangData.length > 0) {
          setListSubBidangSelected(subBidangData);
        } else {
          // Jika tidak ada sub bidang yang terpilih sebelumnya, tetap inisialisasi dengan array kosong
          setListSubBidangSelected([
            {
              id: "",
              MasterSubBidangBisnis: {
                id: "",
                name: "",
              },
            },
          ]);
        }

        const bisnisId = respone.data.MasterBidangBisnis.id;
        if (bisnisId) {
          handlerLoadSelectedSubBidang({ id: bisnisId });
        }
      } else {
        setData(null);
      }
    } catch (error) {
      clientLogger.error("Error get data portofolio", error);
    }
  };

  const onLoadBidang = async () => {
    try {
      const respone = await apiGetMasterBidangBisnis();

      if (respone.success) {
        setListBidang(respone.data);
      } else {
        setListBidang([]);
      }
    } catch (error) {
      clientLogger.error("Error get data master bidang bisnis", error);
    }
  };

  async function onLoadMasterSubBidangBisnis() {
    try {
      const response = await apiGetSubBidangBisnis({});

      if (response.success) {
        setListSubBidang(response.data);
      }
    } catch (error) {
      console.error("Error on load master sub bidang bisnis", error);
    }
  }

  const validateData = async (data: any) => {
    if (_.values(data).includes("")) {
      return "Lengkapi data";
    }

    if (data?.tlpn?.length < 8) {
      return "Nomor telepon minimal 8 digit";
    }

    // Validasi sub bidang bisnis yang dipilih
    // Pastikan setidaknya satu sub bidang dipilih
    const validSubBidangCount = listSubBidangSelected.filter(
      (item) => item.MasterSubBidangBisnis.id
    ).length;

    if (validSubBidangCount === 0) {
      return "Pilih minimal satu sub bidang bisnis";
    }

    return null;
  };

  const hanldeUpadteData = async (data: any) => {
    try {
      // Filter list sub bidang yang dipilih (hanya ambil yang memiliki id)
      const validSubBidang = listSubBidangSelected.filter(
        (item) => item.MasterSubBidangBisnis.id
      );

      const newData: IUpdatePortofoli = {
        namaBisnis: data?.namaBisnis,
        alamatKantor: data?.alamatKantor,
        tlpn: data?.tlpn,
        deskripsi: data?.deskripsi,
        masterBidangBisnisId: data?.MasterBidangBisnis.id,
        subBidang: validSubBidang, // Hanya kirim sub bidang yang valid
      };

      const respone = await apiUpdatePortofolioById({
        data: newData,
        id: portofolioId,
      });

      return respone;
    } catch (error) {
      console.error("Error update data portofolio", error);
      return null;
    }
  };

  const submitUpdate = async () => {
    const validate = await validateData(data);
    if (validate) {
      ComponentGlobal_NotifikasiPeringatan(validate);
      return;
    }

    try {
      setLoading(true);
      const updateData = await hanldeUpadteData(data);

      if (updateData.success) {
        ComponentGlobal_NotifikasiBerhasil(updateData.message);
        router.back();
      } else {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal(updateData.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error update data portofolio", error);
    }
  };

  const baseStyles: Styles<BaseSelectStylesNames, Record<string, any>> = {
    label: {
      color: MainColor.white,
    },
    input: {
      backgroundColor: MainColor.white,
    },
  };

  // Handler untuk perubahan bidang bisnis
  const handleBidangBisnisChange = (val: string) => {
    const isSameBidang = data?.MasterBidangBisnis?.id === val;

    setData({
      ...(data as any),
      MasterBidangBisnis: {
        id: val,
      },
    });

    // Reset sub bidang jika ganti bidang
    if (!isSameBidang) {
      setListSubBidangSelected([
        {
          id: "",
          MasterSubBidangBisnis: { id: "", name: "" },
        },
      ]);
    }

    handlerLoadSelectedSubBidang({ id: val });
  };

  // Handler untuk saat komponen pertama kali load
  const handlerLoadSelectedSubBidang = ({ id }: { id: string }) => {
    if (!listSubBidang) return;

    const filteredSubBidang = listSubBidang.filter(
      (item) => item.masterBidangBisnisId === id
    );

    setSelectedSubBidang(filteredSubBidang);
  };

  // Handler untuk menambah sub bidang bisnis
  const handleAddSubBidang = () => {
    setListSubBidangSelected([
      ...listSubBidangSelected,
      {
        id: "",
        MasterSubBidangBisnis: { id: "", name: "" },
      },
    ]);
  };

  // Handler untuk menghapus sub bidang bisnis
  const handleRemoveSubBidang = (index: number) => {
    if (listSubBidangSelected.length <= 1) return;

    const updatedList = [...listSubBidangSelected];
    updatedList.splice(index, 1);
    setListSubBidangSelected(updatedList);
  };

  // Handler untuk update sub bidang
  const handleSubBidangChange = (val: string, index: number) => {
    const selected = selectedSubBidang?.find((s) => s.id === val);
    const list = _.cloneDeep(listSubBidangSelected);

    list[index] = {
      id: "",
      MasterSubBidangBisnis: selected || {
        id: val,
        name: "",
      },
    };

    setListSubBidangSelected(list);
  };

  // Effect untuk mengupdate selectedSubBidang saat listSubBidang berubah
  useShallowEffect(() => {
    if (data?.MasterBidangBisnis?.id && listSubBidang) {
      handlerLoadSelectedSubBidang({ id: data.MasterBidangBisnis.id });
    }
  }, [listSubBidang, data?.MasterBidangBisnis?.id]);

  if (!data || !listBidang || !listSubBidang)
    return <Portofolio_SkeletonEditDataBisnis />;

  return (
    <>
      <Stack spacing={50} p={"sm"}>
        <Stack>
          <TextInput
            styles={{
              ...baseStyles,
              required: {
                color: MainColor.red,
              },
            }}
            withAsterisk
            value={data?.namaBisnis}
            label="Nama Bisnis"
            placeholder="Nama bisnis"
            maxLength={100}
            error={
              data?.namaBisnis === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan nama bisnis" />
              ) : (
                ""
              )
            }
            onChange={(val) => {
              setData({
                ...data,
                namaBisnis: val.target.value,
              });
            }}
          />

          {/* Select Bidang dan Sub Bidang */}
          <Select
            styles={{
              ...baseStyles,
              required: {
                color: MainColor.red,
              },
            }}
            withAsterisk
            value={data?.MasterBidangBisnis.id}
            label="Bidang Bisnis"
            placeholder="Pilih salah satu bidang bisnis"
            data={listBidang.map((e) => ({
              value: e.id,
              label: e.name,
            }))}
            onChange={handleBidangBisnisChange}
          />

          <Stack spacing={0}>
            {listSubBidangSelected.map((e, index) => {
              // Filter data untuk select sub bidang, menghilangkan yang sudah dipilih kecuali untuk item ini sendiri
              const selectedIds = listSubBidangSelected
                .filter((_, i) => i !== index)
                .map((s) => s.MasterSubBidangBisnis.id)
                .filter((id) => id); // Filter hanya yang memiliki id (tidak kosong)

              const availableSubBidangOptions = (selectedSubBidang || [])
                .filter((sub) => {
                  // Tampilkan jika ini adalah opsi yang dipilih saat ini atau belum dipilih di sub bidang lainnya
                  return (
                    sub.id === e.MasterSubBidangBisnis.id ||
                    !selectedIds.includes(sub.id)
                  );
                })
                .map((sub) => ({
                  value: sub.id,
                  label: sub.name,
                }));

              return (
                <Box key={index} style={{ position: "relative" }}>
                  <Stack>
                    <Stack spacing={5}>
                      <Grid align="center">
                        <Grid.Col span={"auto"}>
                          <Select
                            styles={{
                              ...baseStyles,
                              required: { color: MainColor.red },
                              dropdown: { backgroundColor: MainColor.white },
                            }}
                            withAsterisk
                            label={`Sub Bidang Bisnis ${index + 1}`}
                            placeholder={
                              selectedSubBidang && selectedSubBidang.length > 0
                                ? "Pilih sub bidang bisnis"
                                : "Menunggu pilihan bidang bisnis"
                            }
                            value={e.MasterSubBidangBisnis.id}
                            data={availableSubBidangOptions}
                            onChange={(val) =>
                              handleSubBidangChange(val as any, index)
                            }
                          />
                        </Grid.Col>
                        <Grid.Col
                          span={"content"}
                          style={{ alignSelf: "flex-end" }}
                        >
                          <Box>
                            {index > 0 ? (
                              <ActionIcon
                                variant="transparent"
                                onClick={() => handleRemoveSubBidang(index)}
                              >
                                <IconTrash color={MainColor.red} />
                              </ActionIcon>
                            ) : (
                              <ActionIcon disabled variant="transparent" />
                            )}
                          </Box>
                        </Grid.Col>
                      </Grid>
                      <Box style={{ alignSelf: "flex-start" }}>
                        {listSubBidangSelected.length > 1 &&
                        e.MasterSubBidangBisnis.id === "" ? (
                          <ComponentGlobal_ErrorInput text="Wajib dipilih" />
                        ) : undefined}
                      </Box>
                    </Stack>

                    {/* Tombol untuk menghapus/menambah sub bidang bisnis */}
                    <Stack style={{ justifyContent: "space-between" }}>
                      {index === listSubBidangSelected.length - 1 && (
                        <Center>
                          <Button
                            radius={"xl"}
                            size={"xs"}
                            fz={10}
                            c={"black"}
                            leftIcon={<IconPlus size={15} />}
                            color={"yellow"}
                            bg={MainColor.yellow}
                            onClick={handleAddSubBidang}
                            disabled={
                              // Hanya disable jika tidak ada bidang bisnis utama yang dipilih
                              !data?.MasterBidangBisnis?.id ||
                              // Atau jika tidak ada sub bidang yang tersedia untuk dipilih
                              (selectedSubBidang &&
                                selectedSubBidang.length === 0) ||
                              // Atau jika semua sub bidang yang tersedia sudah dipilih
                              availableSubBidangOptions.length === 0
                            }
                            style={{
                              alignSelf: "flex-end",
                              marginLeft: "auto",
                              transition: "0.5s",
                            }}
                          >
                            Tambah list
                          </Button>
                        </Center>
                      )}
                    </Stack>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
          {/* Select Bidang dan Sub Bidang */}

          <TextInput
            styles={{
              ...baseStyles,
              required: {
                color: MainColor.red,
              },
            }}
            withAsterisk
            value={data?.alamatKantor}
            label="Alamat Kantor"
            placeholder="Alamat kantor"
            maxLength={100}
            error={
              data?.alamatKantor === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan alamat kantor" />
              ) : (
                ""
              )
            }
            onChange={(val) => {
              setData({
                ...data,
                alamatKantor: val.target.value,
              });
            }}
          />

          <Stack spacing={5}>
            <Component_V3_Label_TextInput text="Nomor Telepon" />

            <PhoneInput
              value={data?.tlpn}
              placeholder="Nomor telepon"
              countrySelectorStyleProps={{
                buttonStyle: {
                  backgroundColor: MainColor.login,
                },
              }}
              inputStyle={{ width: "100%", backgroundColor: MainColor.white }}
              defaultCountry="id"
              onChange={(val) => {
                const valPhone = val.substring(1);
                setData({
                  ...data,
                  tlpn: valPhone,
                });
              }}
            />

            {data?.tlpn === "" ? (
              <ComponentGlobal_ErrorInput text="Masukan nomor telepon" />
            ) : (
              ""
            )}
          </Stack>

          <Stack spacing={5}>
            <Textarea
              styles={{
                ...baseStyles,
                required: {
                  color: MainColor.red,
                },
              }}
              autosize
              minRows={2}
              maxRows={5}
              withAsterisk
              value={data?.deskripsi}
              label="Deskripsi"
              placeholder="Deskripsi singkat mengenai usaha"
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
              maxInput={300}
              lengthInput={data?.deskripsi.length as any}
            />
          </Stack>
        </Stack>

        <Button
          disabled={
            _.values(data).includes("") ||
            // Disable tombol update hanya jika tidak ada sub bidang yang dipilih
            !listSubBidangSelected.some(
              (item) => item.MasterSubBidangBisnis.id !== ""
            )
          }
          radius={"xl"}
          loading={loading ? true : false}
          loaderPosition="center"
          onClick={() => {
            submitUpdate();
          }}
          bg={MainColor.yellow}
          color={"yellow"}
          c={"black"}
          style={{
            transition: "0.5s",
          }}
        >
          Update
        </Button>
      </Stack>
    </>
  );
}
