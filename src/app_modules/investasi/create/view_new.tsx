"use client";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_ButtonUploadFileImage,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import {
  AspectRatio,
  Box,
  Center,
  Grid,
  Image,
  Loader,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import {
  IconCircleCheck,
  IconFileTypePdf,
  IconPhoto,
} from "@tabler/icons-react";
import _ from "lodash";
import { useState } from "react";
import { Investasi_ComponentButtonCreateNewInvestasi } from "../_component";
import { Investasi_ComponentButtonUploadFile } from "../_component/button/comp_button_upload_file_prospektus";
import { apiGetMasterInvestasi } from "../_lib/api_interface";

export default function InvestasiCreateNew() {
  const [loadingMasterInvestor, setLoadingMasterInvestor] = useState(true);
  const [loadingMasterPeriodeDeviden, setLoadingMasterPeriodeDeviden] =
    useState(true);
  const [loadingMasterPembagianDeviden, setLoadingMasterPembagianDeviden] =
    useState(true);
  const [periodeDeviden, setPeriodeDeviden] = useState<any[]>([]);
  const [pembagianDeviden, setPembagianDeviden] = useState<any[]>([]);
  const [pencarianInvestor, setPencarianInvestor] = useState<any[]>([]);
  const [fileImage, setFileImage] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();
  const [filePdf, setFilePdf] = useState<File | null>(null);
  const [fPdf, setFPdf] = useState<any | null>(null);
  const [totalLembar, setTotalLembar] = useState(0);
  const [value, setValue] = useState({
    title: "",
    targetDana: 0,
    hargaLembar: 0,
    roi: 0,
    pencarianInvestorId: "",
    periodeDevidenId: "",
    pembagianDevidenId: "",
  });
  const [target, setTarget] = useState("");
  const [harga, setHarga] = useState("");

  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [isMinimalTarget, setMinimalTarget] = useState(false);

  async function onTotalLembar({
    target,
    harga,
  }: {
    target?: number | any;
    harga?: number | any;
  }) {
    if (target !== 0 && harga !== 0) {
      const hasil: any = target / harga;
      setTotalLembar(_.floor(hasil === Infinity ? 0 : hasil));
    }
  }

  async function onGetMasterInvestor() {
    try {
      setLoadingMasterInvestor(true);
      const response = await apiGetMasterInvestasi("?cat=pencarian-investor");
      if (response.success) {
        setPencarianInvestor(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMasterInvestor(false);
    }
  }

  async function onGetMasterPeriodeDeviden() {
    try {
      setLoadingMasterPeriodeDeviden(true);
      const response = await apiGetMasterInvestasi("?cat=periode-deviden");
      if (response.success) {
        setPeriodeDeviden(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMasterPeriodeDeviden(false);
    }
  }

  async function onGetMasterPembagianDeviden() {
    try {
      setLoadingMasterPembagianDeviden(true);
      const response = await apiGetMasterInvestasi("?cat=pembagian-deviden");
      if (response.success) {
        setPembagianDeviden(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMasterPembagianDeviden(false);
    }
  }

  useShallowEffect(() => {
    onGetMasterInvestor();
    onGetMasterPeriodeDeviden();
    onGetMasterPembagianDeviden();
  }, []);

  return (
    <>
      <Stack px={"xs"} spacing={40}>
        {/* Upload Image */}
        <Stack spacing={0}>
          <Box mb={"sm"}>
            <ComponentGlobal_BoxInformation informasi="Gambar investasi bisa berupa ilustrasi, poster atau foto terkait investasi." />
          </Box>
          <ComponentGlobal_BoxUploadImage>
            {isLoadingImg ? (
              <Stack justify="center" align="center" h={"100%"}>
                <Loader size={150} color="yellow" />
              </Stack>
            ) : img ? (
              <AspectRatio ratio={1 / 1} mah={265} mx={"auto"}>
                <Image
                  style={{ maxHeight: 250, margin: "auto", padding: "5px" }}
                  alt="Foto"
                  height={250}
                  src={img}
                />
              </AspectRatio>
            ) : (
              <Stack justify="center" align="center" h={"100%"}>
                <IconPhoto size={150} color="gray" />
              </Stack>
            )}
          </ComponentGlobal_BoxUploadImage>

          {/* Upload Foto */}
          <Center>
            <ComponentGlobal_ButtonUploadFileImage
              onSetFile={setFileImage}
              onSetImage={setImg}
            />
          </Center>
        </Stack>

        {/* Upload File */}
        <Stack spacing={"sm"}>
          <ComponentGlobal_BoxInformation informasi="File prospektus wajib untuk diupload, agar calon investor paham dengan prospek investasi yang akan anda jalankan kedepannya." />
          <ComponentGlobal_CardStyles marginBottom={"0px"}>
            {isLoadingPdf ? (
              <Stack justify="center" align="center" h={"100%"}>
                <Loader size={50} color="yellow" />
              </Stack>
            ) : !filePdf ? (
              <Stack justify="center" align="center" h={"100%"}>
                <IconFileTypePdf size={50} color="gray" />
              </Stack>
            ) : (
              <Grid align="center" justify="center">
                <Grid.Col span={1}></Grid.Col>
                <Grid.Col span={"auto"}>
                  <Center>
                    <Box p="xs" w={200}>
                      <Text
                        style={{
                          textAlign: "center",
                          width: "100%",
                        }}
                        truncate
                        align="center"
                      >
                        {filePdf.name}
                      </Text>
                    </Box>
                  </Center>
                </Grid.Col>
                <Grid.Col span={1}>
                  <Center>
                    <IconCircleCheck color="green" />
                  </Center>
                </Grid.Col>
              </Grid>
            )}
          </ComponentGlobal_CardStyles>

          <Center>
            <Investasi_ComponentButtonUploadFile
              onSetFile={setFilePdf}
              onSetImage={setFPdf}
              text="Upload File"
              icon={<IconFileTypePdf size={20} />}
            />
          </Center>
        </Stack>

        <Stack>
          <TextInput
            styles={{
              label: {
                color: MainColor.white,
              },
              required: {
                color: MainColor.red,
              },
              input: {
                backgroundColor: MainColor.white,
              },
            }}
            withAsterisk
            label="Judul Investasi"
            placeholder="Judul investasi"
            maxLength={100}
            onChange={(val) => {
              setValue({
                ...value,
                title: val.target.value,
              });
            }}
          />

          <Stack>
            <TextInput
              styles={{
                label: {
                  color: MainColor.white,
                },
                required: {
                  color: MainColor.red,
                },
                input: {
                  backgroundColor: MainColor.white,
                },
              }}
              icon={<Text fw={"bold"}>Rp.</Text>}
              min={0}
              withAsterisk
              label="Dana Dibutuhkan"
              placeholder="0"
              value={target}
              error={isMinimalTarget ? "Minimal target 10.000.000" : ""}
              onChange={(val) => {
                // console.log(typeof val)
                const match = val.currentTarget.value
                  .replace(/\./g, "")
                  .match(/^[0-9]+$/);

                if (val.currentTarget.value === "") return setTarget(0 + "");
                if (!match?.[0]) return null;

                const nilai = val.currentTarget.value.replace(/\./g, "");
                const targetNilai = Intl.NumberFormat("id-ID").format(+nilai);

                // console.log("type nilai", typeof nilai);
                // console.log("nilai", nilai);
                // console.log("targetNilai", targetNilai);
                // console.log("type targetNilai", typeof targetNilai);

                if (+nilai < 10000000) {
                  setMinimalTarget(true);
                } else {
                  setMinimalTarget(false);
                }

                onTotalLembar({
                  target: +nilai,
                  harga: +value.hargaLembar,
                });

                setTarget(targetNilai);
                setValue({
                  ...value,
                  targetDana: +nilai,
                });
              }}
            />
          </Stack>

          <TextInput
            styles={{
              label: {
                color: MainColor.white,
              },
              required: {
                color: MainColor.red,
              },
              input: {
                backgroundColor: MainColor.white,
              },
            }}
            icon={<Text fw={"bold"}>Rp.</Text>}
            min={0}
            withAsterisk
            label="Harga Per Lembar"
            placeholder="0"
            value={harga}
            onChange={(val) => {
              try {
                // console.log(typeof +val.currentTarget.value);

                const match = val.currentTarget.value
                  .replace(/\./g, "")
                  .match(/^[0-9]+$/);

                if (val.currentTarget.value === "") return setHarga(0 + "");

                if (!match?.[0]) return null;

                const nilai = val.currentTarget.value.replace(/\./g, "");
                const targetNilai = Intl.NumberFormat("id-ID").format(+nilai);

                onTotalLembar({
                  harga: +nilai,
                  target: +value.targetDana,
                });

                setHarga(targetNilai);
                setValue({
                  ...value,
                  hargaLembar: +nilai,
                });
              } catch (error) {
                console.log(error);
              }
            }}
          />

          <TextInput
            description="*Total lembar dihitung dari, Target Dana / Harga Perlembar"
            label="Total Lembar"
            value={harga === "0" ? "0" : target === "0" ? 0 : totalLembar}
            readOnly
            styles={{
              label: {
                color: MainColor.white,
              },
              required: {
                color: MainColor.red,
              },
              input: {
                backgroundColor: MainColor.white,
              },
            }}
          />

          <TextInput
            styles={{
              label: {
                color: MainColor.white,
              },
              required: {
                color: MainColor.red,
              },
              input: {
                backgroundColor: MainColor.white,
              },
            }}
            rightSection={
              <Text fw={"bold"} c={"gray"}>
                %
              </Text>
            }
            withAsterisk
            type="number"
            label={"Rasio Keuntungan / ROI %"}
            placeholder="Masukan rasio keuntungan"
            onChange={(val) => {
              setValue({
                ...value,
                roi: _.toNumber(val.target.value),
              });
            }}
          />

          <Select
            styles={{
              label: {
                color: MainColor.white,
              },
              required: {
                color: MainColor.red,
              },
              input: {
                backgroundColor: MainColor.white,
              },
              dropdown: {
                backgroundColor: MainColor.white,
              },
            }}
            withAsterisk
            label="Pencarian Investor"
            placeholder={
              loadingMasterInvestor ? "Loading..." : "Pilih batas waktu"
            }
            data={pencarianInvestor.map((e) => ({
              value: e.id,
              label: e.name + " " + "hari",
            }))}
            onChange={(val) => {
              setValue({
                ...(value as any),
                pencarianInvestorId: val,
              });
            }}
          />

          <Select
            styles={{
              label: {
                color: MainColor.white,
              },
              required: {
                color: MainColor.red,
              },
              input: {
                backgroundColor: MainColor.white,
              },
              dropdown: {
                backgroundColor: MainColor.white,
              },
            }}
            withAsterisk
            label="Periode Deviden"
            placeholder={
              loadingMasterPeriodeDeviden ? "Loading..." : "Pilih batas waktu"
            }
            data={periodeDeviden.map((e) => ({ value: e.id, label: e.name }))}
            onChange={(val) => {
              setValue({
                ...(value as any),
                periodeDevidenId: val,
              });
            }}
          />

          <Select
            styles={{
              label: {
                color: MainColor.white,
              },
              required: {
                color: MainColor.red,
              },
              input: {
                backgroundColor: MainColor.white,
              },
              dropdown: {
                backgroundColor: MainColor.white,
              },
            }}
            withAsterisk
            label="Pembagian Deviden"
            placeholder={
              loadingMasterPembagianDeviden ? "Loading..." : "Pilih batas waktu"
            }
            data={pembagianDeviden.map((e) => ({
              value: e.id,
              label: e.name + " " + "bulan",
            }))}
            onChange={(val) => {
              setValue({
                ...(value as any),
                pembagianDevidenId: val,
              });
            }}
          />
        </Stack>

        <Investasi_ComponentButtonCreateNewInvestasi
          data={value}
          totalLembar={totalLembar}
          fileImage={fileImage as any}
          filePdf={filePdf as any}
          isMinimalTarget={isMinimalTarget}
        />
      </Stack>
    </>
  );
}
