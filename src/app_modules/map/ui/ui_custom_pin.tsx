"use client";

import { APIs, DIRECTORY_ID } from "@/lib";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_ButtonUploadFileImage } from "@/app_modules/_global/component";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import {
  funGlobal_DeleteFileById,
  funGlobal_UploadToStorage,
} from "@/app_modules/_global/fun";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { clientLogger } from "@/util/clientLogger";
import { Avatar, Button, Center, Stack } from "@mantine/core";
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
              "Pin map akan secara otomatis menampilkan logo pada porotofolio ini, jika anda ingin melakukan custom silahkan upload logo pin baru anda."
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
            <ComponentGlobal_ButtonUploadFileImage
              onSetFile={setFilePin}
              onSetImage={setImgPin}
            />
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

        <ButtonSimpan
          mapId={data.id}
          filePin={filePin}
          fileRemoveId={data.pinId}
        />
      </Stack>
    </>
  );
}

function ButtonSimpan({
  mapId,
  filePin,
  fileRemoveId,
}: {
  mapId: string;
  filePin: File;
  fileRemoveId: string;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  async function onCustom() {
    try {
      setLoading(true);

      const uploadFileToStorage = await funGlobal_UploadToStorage({
        file: filePin,
        dirId: DIRECTORY_ID.map_pin,
      });

      if (!uploadFileToStorage.success) {
        setLoading(false);
        ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");
        return;
      }

      const deletePin = await funGlobal_DeleteFileById({
        fileId: fileRemoveId,
        dirId: DIRECTORY_ID.map_pin,
      });
      if (!deletePin.success) {
        setLoading(false);
        clientLogger.error("Error delete logo", deletePin.message);
      }

      const res = await map_funCustomPinMap({
        mapId: mapId,
        fileId: uploadFileToStorage.data.id,
      });

      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil(res.message);
        router.back();
      } else {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error custom pin", error);
    }
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
