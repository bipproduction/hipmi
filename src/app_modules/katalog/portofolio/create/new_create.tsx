"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_ButtonUploadFileImage,
} from "@/app_modules/_global/component";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { apiGetMasterBidangBisnis } from "@/app_modules/_global/lib/api_fetch_master";
import { ISUB_BIDANG_BISNIS } from "@/app_modules/model_global/portofolio";
import { clientLogger } from "@/util/clientLogger";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Group,
  Image,
  Select,
  Stack,
  Styles,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { BaseSelectStylesNames } from "@mantine/core/lib/Select/types";
import { useShallowEffect } from "@mantine/hooks";
import { IconMinus, IconPhoto, IconPlus } from "@tabler/icons-react";
import _ from "lodash";
import { useParams } from "next/navigation";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Portofolio_ComponentButtonSelanjutnya } from "../component";
import { apiGetSubBidangBisnis } from "../lib/api_portofolio";
import { MODEL_PORTOFOLIO_BIDANG_BISNIS } from "../model/interface";

export default function Portofolio_V3_Create() {
  const params = useParams<{ id: string }>();
  const profileId = params.id;

  const [dataPortofolio, setDataPortofolio] = useState({
    namaBisnis: "",
    masterBidangBisnisId: "",
    // masterSubBidangBisnisId: "",
    alamatKantor: "",
    tlpn: "",
    deskripsi: "",
  });

  const [dataMedsos, setDataMedsos] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    tiktok: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>(null);
  const [listBidangBisnis, setListBidangBisnis] = useState<
    MODEL_PORTOFOLIO_BIDANG_BISNIS[] | null
  >(null);

  const [listSubBidang, setListSubBidang] = useState<
    ISUB_BIDANG_BISNIS[] | null
  >(null);

  const [selectedSubBidang, setSelectedSubBidang] = useState<
    ISUB_BIDANG_BISNIS[] | null
  >(null);
  const [listSubBidangSelected, setListSubBidangSelected] = useState([
    {
      id: "",
    },
  ]);

  useShallowEffect(() => {
    onLoadMasterBidangBisnis();
    onLoadMasterSubBidangBisnis();
  }, []);

  async function onLoadMasterBidangBisnis() {
    try {
      const respone = await apiGetMasterBidangBisnis();

      if (respone.success) {
        setListBidangBisnis(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error on load master bidang bisnis", error);
    }
  }

  async function onLoadMasterSubBidangBisnis() {
    try {
      const response = await apiGetSubBidangBisnis({});

      if (response.success) {
        setListSubBidang(response.data);
      }
    } catch (error) {
      clientLogger.error("Error on load master sub bidang bisnis", error);
    }
  }

  const handlerSelectedSubBidang = ({ id }: { id: string }) => {
    const selectedList = listSubBidang?.filter(
      (item) => item.masterBidangBisnisId === id
    );
    setSelectedSubBidang(selectedList as ISUB_BIDANG_BISNIS[]);
  };

  const baseStyles: Styles<BaseSelectStylesNames, Record<string, any>> = {
    label: {
      color: MainColor.white,
    },
    input: {
      backgroundColor: MainColor.white,
    },
  };

  return (
    <>
      <Stack px={"sm"} mb={"lg"} spacing={50}>
        <Stack spacing={"sm"}>
          <ComponentGlobal_BoxInformation informasi="Lengkapi data bisnis" />

          <TextInput
            styles={{
              ...baseStyles,
              required: {
                color: MainColor.red,
              },
            }}
            withAsterisk
            label="Nama Bisnis"
            placeholder="Nama bisnis"
            maxLength={100}
            onChange={(val) => {
              setDataPortofolio({
                ...dataPortofolio,
                namaBisnis: _.startCase(val.target.value),
              });
            }}
          />

          <Select
            styles={{
              ...baseStyles,
              required: {
                color: MainColor.red,
              },
              dropdown: {
                backgroundColor: MainColor.white,
              },
            }}
            withAsterisk
            label="Bidang Bisnis"
            placeholder={
              listBidangBisnis ? "Pilih bidang bisnis" : "Loading..."
            }
            data={_.map(listBidangBisnis as any).map((e: any) => ({
              value: e.id,
              label: e.name,
            }))}
            onChange={(val: any) => {
              const isSameBidang = dataPortofolio.masterBidangBisnisId === val;

              // Update data portofolio
              setDataPortofolio({
                ...dataPortofolio,
                masterBidangBisnisId: val,
                // masterSubBidangBisnisId: isSameBidang
                //   ? dataPortofolio.masterSubBidangBisnisId
                //   : "",
              });

              // Jika berbeda bidang, reset sub bidang ke satu input kosong
              if (!isSameBidang) {
                setListSubBidangSelected([{ id: "" }]);
              }

              // Panggil handler sub bidang berdasarkan bidang bisnis terpilih
              handlerSelectedSubBidang({ id: val });
            }}
          />

          <Stack>
            {listSubBidangSelected.map((e, index) => (
              <Box key={index}>
                <Select
                  disabled={dataPortofolio.masterBidangBisnisId === ""}
                  styles={{
                    ...baseStyles,
                    required: {
                      color: MainColor.red,
                    },
                    dropdown: {
                      backgroundColor: MainColor.white,
                    },
                  }}
                  withAsterisk
                  label={`Sub Bidang Bisnis ${index + 1}`}
                  placeholder={
                    selectedSubBidang
                      ? "Pilih sub bidang bisnis"
                      : "Menunggu pilihan bidang bisnis"
                  }
                  data={_.map(selectedSubBidang as any)
                    .filter((option: any) => {
                      const selectedValues = listSubBidangSelected.map(
                        (s) => s.id
                      );
                      return (
                        option.id === e.id || // biarkan tetap muncul kalau ini valuenya sendiri
                        !selectedValues.includes(option.id)
                      );
                    })
                    .map((e: any) => ({
                      value: e.id,
                      label: e.name,
                    }))}
                  value={e.id}
                  onChange={(val) => {
                    const list = _.clone(listSubBidangSelected);
                    list[index].id = val as any;
                    setListSubBidangSelected(list);
                  }}
                  error={
                    listSubBidangSelected.length > 1 && !e.id
                      ? "Wajib dipilih / kurangi list"
                      : undefined
                  }
                />
              </Box>
            ))}
          </Stack>

          <Group position="center">
            <Button
              disabled={
                listSubBidangSelected.length === selectedSubBidang?.length
              }
              radius="xl"
              leftIcon={<IconPlus size={15} />}
              onClick={() => {
                setListSubBidangSelected([
                  ...listSubBidangSelected,
                  { id: "" },
                ]);
              }}
              compact
              bg={MainColor.yellow}
              color="yellow"
              c="black"
            >
              <Text fz={8}>Tambah List</Text>
            </Button>

            <Button
              disabled={listSubBidangSelected.length <= 1}
              radius="xl"
              leftIcon={<IconMinus size={15} />}
              onClick={() => {
                setListSubBidangSelected(listSubBidangSelected.slice(0, -1));
              }}
              compact
              bg={MainColor.yellow}
              color="yellow"
              c="black"
            >
              <Text fz={8}>Kurangi List</Text>
            </Button>
          </Group>

          {/* <pre style={{ color: "white" }}>
            {JSON.stringify(dataPortofolio, null, 2)}
          </pre>
          <pre style={{ color: "white" }}>
            {JSON.stringify(listSubBidangSelected, null, 2)}
          </pre> */}

          {/* <Select
            disabled={dataPortofolio.masterBidangBisnisId == ""}
            styles={{
              ...baseStyles,
              required: {
                color: MainColor.red,
              },
              dropdown: {
                backgroundColor: MainColor.white,
              },
            }}
            value={dataPortofolio.masterSubBidangBisnisId == "" 
              ? null 
              : dataPortofolio.masterSubBidangBisnisId
            }
            withAsterisk
            label="Sub Bidang Bisnis"
            placeholder={
              selectedSubBidang ? "Pilih sub bidang bisnis" : "Menunggu pilihan bidang bisnis"
            }
            data={_.map(selectedSubBidang as any).map((e: any) => ({
              value: e.id,
              label: e.name,
            }))}
            onChange={(val) => {
              setDataPortofolio({
                ...dataPortofolio,
                masterSubBidangBisnisId: val as any,
              });
            }}
          /> */}

          <TextInput
            styles={{
              ...baseStyles,
              required: {
                color: MainColor.red,
              },
            }}
            withAsterisk
            label="Alamat Bisnis"
            placeholder="Alamat bisnis"
            maxLength={100}
            onChange={(val) => {
              setDataPortofolio({
                ...dataPortofolio,
                alamatKantor: val.target.value,
              });
            }}
          />

          <Stack spacing={5}>
            <Text c={MainColor.white} fz={"sm"}>
              Nomor Telepon{" "}
              <Text c={"red"} span inherit>
                *
              </Text>
            </Text>

            <PhoneInput
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
                setDataPortofolio({
                  ...dataPortofolio,

                  tlpn: valPhone,
                });
              }}
            />
          </Stack>

          <Stack spacing={5}>
            <Textarea
              styles={{
                ...baseStyles,
                required: {
                  color: MainColor.red,
                },
              }}
              maxLength={300}
              autosize
              minRows={2}
              maxRows={5}
              withAsterisk
              label="Deskripsi"
              placeholder="Deskripsi singkat mengenai usaha"
              onChange={(val) => {
                setDataPortofolio({
                  ...dataPortofolio,
                  deskripsi: val.target.value,
                });
              }}
            />
            <ComponentGlobal_InputCountDown
              maxInput={300}
              lengthInput={dataPortofolio.deskripsi.length}
            />
          </Stack>
        </Stack>

        <Stack>
          <ComponentGlobal_BoxInformation informasi="Upload logo bisnis anda untuk ditampilkan dalam portofolio " />
          <ComponentGlobal_BoxUploadImage>
            {img ? (
              <AspectRatio ratio={1 / 1} mah={265} mx={"auto"}>
                <Image
                  style={{ maxHeight: 250, margin: "auto", padding: "5px" }}
                  alt="Foto"
                  height={250}
                  src={img}
                />
              </AspectRatio>
            ) : (
              <Stack spacing={5} justify="center" align="center" h={"100%"}>
                <IconPhoto size={100} />
              </Stack>
            )}
          </ComponentGlobal_BoxUploadImage>

          <Center>
            <ComponentGlobal_ButtonUploadFileImage
              onSetFile={setFile}
              onSetImage={setImg}
            />
          </Center>
        </Stack>

        <Stack>
          <ComponentGlobal_BoxInformation informasi="Isi hanya pada sosial media yang anda miliki" />
          <TextInput
            styles={{
              ...baseStyles,
            }}
            label="Facebook"
            maxLength={100}
            placeholder="Facebook"
            onChange={(val) => {
              setDataMedsos({
                ...dataMedsos,
                facebook: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              ...baseStyles,
            }}
            label="Instagram"
            maxLength={100}
            placeholder="Instagram"
            onChange={(val) => {
              setDataMedsos({
                ...dataMedsos,
                instagram: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              ...baseStyles,
            }}
            label="Tiktok"
            maxLength={100}
            placeholder="Tiktok"
            onChange={(val) => {
              setDataMedsos({
                ...dataMedsos,
                tiktok: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              ...baseStyles,
            }}
            label="Twitter"
            maxLength={100}
            placeholder="Twitter"
            onChange={(val) => {
              setDataMedsos({
                ...dataMedsos,
                twitter: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              ...baseStyles,
            }}
            label="Youtube"
            maxLength={100}
            placeholder="Youtube"
            onChange={(val) => {
              setDataMedsos({
                ...dataMedsos,
                youtube: val.target.value,
              });
            }}
          />
        </Stack>

        <Portofolio_ComponentButtonSelanjutnya
          dataPortofolio={dataPortofolio as any}
          listSubBidangSelected={listSubBidangSelected as any}
          dataMedsos={dataMedsos}
          profileId={profileId}
          //
          file={file as File}
        />
      </Stack>
    </>
  );
}
