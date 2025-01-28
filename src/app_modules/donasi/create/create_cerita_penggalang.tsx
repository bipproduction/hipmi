"use client";

import { DIRECTORY_ID } from "@/app/lib";
import { IRealtimeData } from "@/app/lib/global_state";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_ButtonUploadFileImage,
} from "@/app_modules/_global/component";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import { clientLogger } from "@/util/clientLogger";
import {
  AspectRatio,
  Button,
  Center,
  Image,
  Stack,
  TextInput,
  Textarea
} from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { Donasi_funCreate } from "../fun/create/fun_create_donasi";
import { gs_donasi_hot_menu } from "../global_state";
import { MODEL_DONASI_TEMPORARY } from "../model/interface";

export default function CreateCeritaPenggalangDonasi({
  dataTemporary,
  userId,
}: {
  dataTemporary: MODEL_DONASI_TEMPORARY;
  userId: string;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [donasiHotMenu, setDonasiHotMenu] = useAtom(gs_donasi_hot_menu);

  const [data, setData] = useState({
    pembukaan: "",
    cerita: "",
    namaBank: "",
    rekening: "",
  });
  const [temporary, setTemporary] = useState(dataTemporary);
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();

  async function onCreate() {
    if (_.values(data).includes(""))
      return ComponentGlobal_NotifikasiPeringatan("Lengkapin Data");

    const body = {
      id: temporary.id,
      title: temporary.title,
      target: temporary.target,
      donasiMaster_KategoriId: temporary.donasiMaster_KategoriId,
      donasiMaster_DurasiId: temporary.donasiMaster_DurasiId,
      authorId: userId,
      namaBank: data.namaBank,
      rekening: data.rekening,
      imageId: temporary.imageId,
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
  return (
    <>
      <Stack spacing={50} px={"xl"} pb={"md"}>
        {/* <pre>{JSON.stringify(dataTempo, null, 2)}</pre> */}
        <Stack spacing={"sm"}>
          <ComponentGlobal_BoxInformation informasi="Cerita Anda adalah kunci untuk menginspirasi kebaikan. Jelaskan dengan jujur dan jelas tujuan penggalangan dana ini agar calon donatur memahami dampak positif yang dapat mereka wujudkan melalui kontribusi mereka." />

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
          </Stack>

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
          disabled={_.values(data).includes("") || file === null ? true : false}
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
