"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { apiGetMasterBidangBisnis } from "@/app_modules/_global/lib/api_master";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { clientLogger } from "@/util/clientLogger";
import {
  Button,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
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

interface IUpdatePortofoli {
  namaBisnis: string;
  alamatKantor: string;
  tlpn: string;
  deskripsi: string;
  masterBidangBisnisId: string;
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

  useShallowEffect(() => {
    onLoadBidang();
    onLoadData();
  }, []);

  const onLoadData = async () => {
    try {
      const respone = await apiGetPortofolioById({
        id: portofolioId,
      });

      if (respone.success) {
        setData(respone.data);
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

  const validateData = async (data: any) => {
    if (_.values(data).includes("")) {
      // VALIDASI NOMOR TELEPON
      return "Lengkapi data";
    }

    if (data?.tlpn.length < 8) {
      return "Nomor telepon minimal 8 digit";
    }
  };

  const hanldeUpadteData = async (data: any) => {
    try {
      const newData: IUpdatePortofoli = {
        namaBisnis: data?.namaBisnis,
        alamatKantor: data?.alamatKantor,
        tlpn: data?.tlpn,
        deskripsi: data?.deskripsi,
        masterBidangBisnisId: data?.MasterBidangBisnis.id,
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
      clientLogger.error("Error update data portofolio", error);
    }
  };

  if (!data) return <Portofolio_SkeletonEditDataBisnis />;

  return (
    <>
      <Stack spacing={50} p={"sm"}>
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
          <Select
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
            withAsterisk
            value={data?.MasterBidangBisnis.id}
            label="Bidang Bisnis"
            placeholder="Pilih salah satu bidang bisnis"
            data={listBidang.map((e) => ({
              value: e.id,
              label: e.name,
            }))}
            onChange={(val) => {
              setData({
                ...(data as any),
                MasterBidangBisnis: {
                  id: val,
                },
              });
            }}
          />
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

          {/* <TextInput
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
            withAsterisk
            value={data?.tlpn}
            label="Nomor Telepon Kantor"
            placeholder="Nomor telepon kantor"
            type="number"
            maxLength={15}
            error={
              data?.tlpn === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan nomor telepon kantor" />
              ) : (
                ""
              )
            }
            onChange={(val) => {
              setData({
                ...data,
                tlpn: val.target.value,
              });
            }}
          /> */}

          <Stack spacing={5}>
            <Text c={MainColor.white} fz={"sm"}>
              Nomor Telepon{" "}
              <Text c={"red"} span inherit>
                *
              </Text>
            </Text>

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
          </Stack>

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
          disabled={_.values(data).includes("")}
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
