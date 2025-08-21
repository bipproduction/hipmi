"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_ButtonUploadFileImage,
} from "@/app_modules/_global/component";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import Component_V3_Label_TextInput from "@/app_modules/_global/component/new/comp_V3_label_text_input";
import { Component_V3_TextEditor } from "@/app_modules/_global/component/new/comp_V3_text_editor";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import { funReplaceHtml } from "@/app_modules/_global/fun/fun_replace_html";
import { apiNewGetUserIdByToken } from "@/app_modules/_global/lib/api_fetch_global";
import { maxInputLength } from "@/app_modules/_global/lib/maximal_setting";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import { DIRECTORY_ID } from "@/lib";
import { IRealtimeData } from "@/lib/global_state";
import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { clientLogger } from "@/util/clientLogger";
import {
  AspectRatio,
  Button,
  Center,
  Image,
  Stack,
  TextInput
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconPhoto } from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { Donasi_funCreate } from "../fun/create/fun_create_donasi";
import { gs_donasi_hot_menu } from "../global_state";
import { apiGetTemporaryCreate } from "../lib/api_donasi";
import { MODEL_DONASI_TEMPORARY } from "../model/interface";

export default function CreateCeritaPenggalangDonasi() {
  const { id } = useParams();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [donasiHotMenu, setDonasiHotMenu] = useAtom(gs_donasi_hot_menu);

  const [data, setData] = useState({
    pembukaan: "",
    cerita: "",
    namaBank: "",
    rekening: "",
  });
  const [temporary, setTemporary] = useState<MODEL_DONASI_TEMPORARY | null>(
    null
  );
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();
  const [userLoginId, setUserLoginId] = useState<string | null>(null);

  useShallowEffect(() => {
    handleGetUserId();
    handleGetTemporaryCreate();
  }, []);

  async function handleGetUserId() {
    try {
      const response = await apiNewGetUserIdByToken();

      if (response) {
        setUserLoginId(response.userId);
      }
    } catch (error) {
      console.error("Error get data detail", error);
    }
  }

  async function handleGetTemporaryCreate() {
    try {
      const response = await apiGetTemporaryCreate({ id: id as string });

      if (response && response.success) {
        setTemporary(response.data);
      } else {
        console.log("response temporary create", response.message);
      }
    } catch (error) {
      console.error("Error get temporary create", error);
    }
  }

  async function onCreate() {
    if (_.values(data).includes(""))
      return ComponentGlobal_NotifikasiPeringatan("Lengkapin Data");

    const body = {
      id: temporary?.id,
      title: temporary?.title,
      target: temporary?.target,
      donasiMaster_KategoriId: temporary?.donasiMaster_KategoriId,
      donasiMaster_DurasiId: temporary?.donasiMaster_DurasiId,
      authorId: userLoginId as string,
      namaBank: data.namaBank,
      rekening: data.rekening,
      imageId: temporary?.imageId,
      CeritaDonasi: {
        pembukaan: data.pembukaan,
        cerita: data.cerita,
      },
    };

    try {
      setLoading(true);
      const uploadImage = await funGlobal_UploadToStorage({
        file: file as File,
        dirId: DIRECTORY_ID.donasi_cerita_image,
      });

      if (!uploadImage.success) {
        setLoading(false);
        ComponentGlobal_NotifikasiPeringatan("Gagal upload file gambar");
        return;
      }

      const res = await Donasi_funCreate({
        data: body as any,
        fileId: uploadImage.data.id,
      });

      if (res.status === 201) {
        const dataNotifikasi: IRealtimeData = {
          appId: res.data?.id as any,
          status: res.data?.DonasiMaster_Status?.name as any,
          userId: res.data?.authorId as any,
          pesan: res.data?.title as any,
          kategoriApp: "DONASI",
          title: "Donasi baru",
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

          setDonasiHotMenu(1);
          ComponentGlobal_NotifikasiBerhasil(res.message);
          router.push(RouterDonasi.status_galang_dana({ id: "2" }), {
            scroll: false,
          });
        }
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error create cerita donasi", error);
    }
  }

  if (!temporary) return <CustomSkeleton height={400} />;

  return (
    <>
      <Stack spacing={50} px={"sm"} pb={"md"}>
        <Stack spacing={"sm"}>
          <ComponentGlobal_BoxInformation informasi="Cerita Anda adalah kunci untuk menginspirasi kebaikan. Jelaskan dengan jujur dan jelas tujuan penggalangan dana ini agar calon donatur memahami dampak positif yang dapat mereka wujudkan melalui kontribusi mereka." />

          <Stack spacing={5}>
            <Component_V3_Label_TextInput text="Pembukaan cerita" />

            <Component_V3_TextEditor
              data={data.pembukaan}
              onSetData={(val) => {
                setData({
                  ...data,
                  pembukaan: val,
                });
              }}
            />

            <ComponentGlobal_InputCountDown
              lengthInput={funReplaceHtml({ html: data.pembukaan }).length}
              maxInput={maxInputLength}
            />
          </Stack>

          <Stack spacing={5}>
            <Component_V3_Label_TextInput text="Inti cerita" />

            <Component_V3_TextEditor
              data={data.cerita}
              onSetData={(val) => {
                setData({
                  ...data,
                  cerita: val,
                });
              }}
            />

            <ComponentGlobal_InputCountDown
              lengthInput={funReplaceHtml({ html: data.cerita }).length}
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
              autosize
              minRows={2}
              maxRows={4}
              withAsterisk
              label="Pembukaan"
              placeholder="Pembuka cerita"
              maxLength={500}
              onChange={(val) =>
                setData({
                  ...data,
                  pembukaan: val.target.value,
                })
              }
            />
            <ComponentGlobal_InputCountDown
              maxInput={500}
              lengthInput={data.pembukaan.length}
            />
          </Stack> */}

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
              autosize
              minRows={2}
              maxRows={10}
              withAsterisk
              label="Cerita"
              placeholder="Ceritakan alasan mengapa harus membuat Penggalangan Dana"
              maxLength={1000}
              onChange={(val) =>
                setData({
                  ...data,
                  cerita: val.target.value,
                })
              }
            />
            <ComponentGlobal_InputCountDown
              maxInput={1000}
              lengthInput={data.cerita.length}
            />
          </Stack> */}

          <Stack spacing={5}>
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
                <Stack justify="center" align="center" h={"100%"}>
                  <IconPhoto size={100} />
                </Stack>
              )}
            </ComponentGlobal_BoxUploadImage>

            {/* Upload Foto */}
            <Center>
              <ComponentGlobal_ButtonUploadFileImage
                onSetFile={setFile}
                onSetImage={setImg}
              />
            </Center>
          </Stack>
        </Stack>

        <Stack spacing={"sm"}>
          <ComponentGlobal_BoxInformation informasi="Pastikan Anda mengisi nama bank dan nomor rekening dengan benar. Informasi ini akan membantu admin memverifikasi dan memproses penggalangan dana Anda dengan cepat dan tepat setelah penggalangan dana dipublikasikan." />
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
            placeholder="Contoh: BNI, BCA, MANDIRI, DLL"
            label="Nama Bank"
            maxLength={50}
            onChange={(val) => {
              setData({
                ...data,
                namaBank: _.upperCase(val.target.value),
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
            placeholder="Masukan nomor rekening"
            label="Nomor rekening"
            maxLength={100}
            onChange={(val) => {
              setData({
                ...data,
                rekening: val.target.value,
              });
            }}
          />
        </Stack>
        <Button
          style={{
            transition: "0.5s",
          }}
          disabled={
            _.values(data).includes("") ||
            file === null ||
            funReplaceHtml({ html: data.pembukaan }).length > maxInputLength ||
            funReplaceHtml({ html: data.pembukaan }).length === 0 ||
            funReplaceHtml({ html: data.cerita }).length > maxInputLength ||
            funReplaceHtml({ html: data.cerita }).length === 0
          }
          loaderPosition="center"
          loading={isLoading ? true : false}
          w={"100%"}
          radius={"xl"}
          onClick={() => onCreate()}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
        >
          Simpan
        </Button>
      </Stack>
      {/* <pre> {JSON.stringify(value.pembukaan, null, 2)}</pre> */}
    </>
  );
}
