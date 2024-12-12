"use client";

import { APIs } from "@/app/lib";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_LoadImage,
} from "@/app_modules/_global/component";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import {
  AspectRatio,
  Avatar,
  Button,
  Center,
  FileButton,
  Image,
  Paper,
  Stack,
  TextInput,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { useState } from "react";
import Map, {
  AttributionControl,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { ComponentMap_ButtonUpdateDataMap } from "../_component";
import { defaultMapZoom } from "../lib/default_lat_long";
import { MODEL_MAP } from "../lib/interface";
import { MAX_SIZE } from "@/app_modules/_global/lib";
import { PemberitahuanMaksimalFile } from "@/app_modules/_global/lib/max_size";

export function UiMap_EditMap({
  mapboxToken,
  dataMap,
}: {
  mapboxToken: string;
  dataMap: MODEL_MAP;
}) {
  const [data, setData] = useState(dataMap);
  const [file, setFile] = useState<File | any>(null);
  const [img, setImg] = useState<any | null>(null);

  return (
    <>
      <Stack spacing={30} px={"sm"}>
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
            height: "60vh",
            borderRadius: "10px",
          }}
          onClick={(a) => {
            setData({
              ...data,
              latitude: a.lngLat.lat,
              longitude: a.lngLat.lng,
            });
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
              src={
                data.pinId === null
                  ? APIs.GET({ fileId: dataMap.Portofolio.logoId, size: "400" })
                  : APIs.GET({ fileId: data.pinId, size: "400" })
              }
              alt="Logo"
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

        <Paper
          style={{
            padding: "15px",
            backgroundColor: AccentColor.darkblue,
            border: `2px solid ${AccentColor.blue}`,
            borderRadius: "10px",
            color: "white",
          }}
        >
          <TextInput
            style={{ transition: "0.5s" }}
            styles={{ label: { color: "white" } }}
            label="Nama Pin"
            placeholder="Masukan nama pin map"
            value={data.namePin}
            withAsterisk
            onChange={(val) => {
              setData({
                ...data,
                namePin: val.currentTarget.value,
              });
            }}
          />
        </Paper>

        {/* Photo Usaha */}
        <Stack spacing={"xs"}>
          <ComponentGlobal_BoxInformation informasi="Masukan photo toko atau tempat usaha anda !" />

          <ComponentGlobal_BoxUploadImage>
            {img ? (
              <AspectRatio ratio={1 / 1} mt={5} maw={300} mx={"auto"}>
                <Image style={{ maxHeight: 250 }} alt="Avatar" src={img} />
              </AspectRatio>
            ) : (
              <ComponentGlobal_LoadImage maw={300} fileId={data.imageId} />
            )}
          </ComponentGlobal_BoxUploadImage>

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
                    setImg(buffer);
                    setFile(files);
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

        <ComponentMap_ButtonUpdateDataMap data={data as any} file={file} />
      </Stack>
    </>
  );
}
