"use client";

import { RouterPortofolio } from "@/app/lib/router_hipmi/router_katalog";
import { RouterMap } from "@/app/lib/router_hipmi/router_map";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { Avatar, Button, Center, FileButton, Stack } from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AttributionControl,
  Map,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { map_funCustomPinMap } from "../fun";
import { defaultMapZoom } from "../lib/default_lat_long";
import { MODEL_MAP } from "../lib/interface";
import { APIs, DIRECTORY_ID } from "@/app/lib";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import { MAX_SIZE } from "@/app_modules/_global/lib";
import { PemberitahuanMaksimalFile } from "@/app_modules/_global/lib/max_size";

export function UiMap_CustomPin({
  dataMap,
  mapboxToken,
}: {
  dataMap: MODEL_MAP;
  mapboxToken: string;
}) {
  const [data, setData] = useState(dataMap);
  const [filePin, setFilePin] = useState<File | any>(null);
  const [imgPin, setImgPin] = useState<any | null>(null);

  if (!mapboxToken)
    return <ComponentGlobal_IsEmptyData text="Mapbox token not found" />;

  return (
    <>
      {/* Logo Custom */}
      <Stack spacing={50} px={"sm"} mb={"md"}>
        <Stack>
          <ComponentGlobal_BoxInformation
            informasi={
              "Pin map akan secara otomatis menampilkan logo pada porotofolio ini, jika anda ingin melakukan custom silahkan upload logo pin baru anda !"
            }
          />

          {imgPin ? (
            <Center>
              <Avatar
                size={200}
                radius={"100%"}
                src={imgPin ? imgPin : "/aset/global/no-image.svg"}
                style={{
                  border: `2px solid ${AccentColor.skyblue}`,
                  backgroundColor: AccentColor.darkblue,
                }}
              />
            </Center>
          ) : (
            <Center>
              <Avatar
                size={200}
                radius={"100%"}
                src={
                  data.pinId === null
                    ? APIs.GET({ fileId: data.Portofolio.logoId, size: "300" })
                    : APIs.GET({ fileId: data.pinId, size: "300" })
                }
                style={{
                  border: `2px solid ${AccentColor.skyblue}`,
                  backgroundColor: AccentColor.darkblue,
                }}
              />
            </Center>
          )}

          <Center>
            <FileButton
              onChange={async (files: any | null) => {
                try {
                  const buffer = URL.createObjectURL(
                    new Blob([new Uint8Array(await files.arrayBuffer())])
                  );
                  if (files.size > MAX_SIZE) {
                    ComponentGlobal_NotifikasiPeringatan(
                      PemberitahuanMaksimalFile,
                      3000
                    );
                  } else {
                    setImgPin(buffer);
                    setFilePin(files);
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
              accept="image/png,image/jpeg"
            >
              {(props) => (
                <Button
                  {...props}
                  radius={"xl"}
                  leftIcon={<IconCamera />}
                  bg={MainColor.yellow}
                  color="yellow"
                  c={"black"}
                >
                  Upload
                </Button>
              )}
            </FileButton>
          </Center>
        </Stack>

        {/* Map */}
        <Map
          mapboxAccessToken={mapboxToken}
          mapStyle={"mapbox://styles/mapbox/streets-v11"}
          initialViewState={{
            latitude: data.latitude,
            longitude: data.longitude,
            zoom: defaultMapZoom,
          }}
          style={{
            cursor: "pointer",
            width: "100%",
            height: "30vh",
            borderRadius: "10px",
          }}
          attributionControl={false}
        >
          <Marker
            style={{
              color: "red",
              width: 40,
              // height: 40,
              cursor: "pointer",
            }}
            latitude={data.latitude}
            longitude={data.longitude}
            anchor="bottom"
          >
            <Avatar
              alt="Logo"
              src={
                imgPin
                  ? imgPin
                  : data.pinId === null
                    ? APIs.GET({ fileId: data.Portofolio.logoId, size: "300" })
                    : APIs.GET({ fileId: data.pinId, size: "300" })
              }
              style={{
                border: `2px solid ${AccentColor.softblue}`,
                backgroundColor: "white",
                borderRadius: "100%",
              }}
            />
          </Marker>
          <NavigationControl />
          <ScaleControl position="top-left" />
          <AttributionControl customAttribution="Map design by PT. Bali Interaktif Perkasa" />
        </Map>

        <ButtonSimpan mapId={data.id} filePin={filePin} />
      </Stack>
    </>
  );
}

function ButtonSimpan({ mapId, filePin }: { mapId: string; filePin: File }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  async function onCustom() {
    const uploadFileToStorage = await funGlobal_UploadToStorage({
      file: filePin,
      dirId: DIRECTORY_ID.map_pin,
    });

    if (!uploadFileToStorage.success)
      return ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");

    const res = await map_funCustomPinMap({
      mapId: mapId,
      fileId: uploadFileToStorage.data.id,
    });
    res.status === 200
      ? (ComponentGlobal_NotifikasiBerhasil(res.message),
        setLoading(true),
        router.back())
      : ComponentGlobal_NotifikasiGagal(res.message);
  }

  return (
    <>
      <Button
        disabled={filePin == null}
        loaderPosition="center"
        loading={isLoading}
        radius={"xl"}
        bg={MainColor.yellow}
        color="yellow"
        c={"black"}
        style={{
          transition: "0.5s",
        }}
        onClick={() => {
          onCustom();
        }}
      >
        Simpan
      </Button>
    </>
  );
}
