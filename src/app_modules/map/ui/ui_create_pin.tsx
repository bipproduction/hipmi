"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_BoxUploadImage } from "@/app_modules/_global/component";
import { MAX_SIZE } from "@/app_modules/_global/lib";
import { PemberitahuanMaksimalFile } from "@/app_modules/_global/lib/max_size";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import {
  AspectRatio,
  Button,
  Center,
  FileButton,
  Image,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import _ from "lodash";
import { useState } from "react";
import Map, {
  AttributionControl,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { ComponentMap_ButtonSavePin } from "../_component";
import { defaultLatLong, defaultMapZoom } from "../lib/default_lat_long";
import {
  funGlobal_DeleteFileById,
  funGlobal_UploadToStorage,
} from "@/app_modules/_global/fun";
import { DIRECTORY_ID } from "@/app/lib";

export function UiMap_CreatePin({
  mapboxToken,
  portofolioId,
}: {
  mapboxToken: string;
  portofolioId: string;
}) {
  const [[lat, long], setLatLong] = useState([0, 0]);
  const [isPin, setIsPin] = useState(false);
  const [namePin, setNamePin] = useState("");
  const [img, setImg] = useState<any | null>(null);
  const [imageId, setImageId] = useState("");

  return (
    <>
      <Stack>
        <Map
          mapboxAccessToken={mapboxToken}
          mapStyle={"mapbox://styles/mapbox/streets-v11"}
          initialViewState={{
            latitude: defaultLatLong[0],
            longitude: defaultLatLong[1],
            zoom: defaultMapZoom,
          }}
          style={{
            cursor: "pointer",
            width: "100%",
            height: "60vh",
            borderRadius: "10px",
          }}
          onClick={(a) => {
            setLatLong([a.lngLat.lat, a.lngLat.lng]);
            setIsPin(true);
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
            latitude={lat}
            longitude={long}
            anchor="bottom"
          >
            <Stack spacing={0}>
              <Image
                w={"100%"}
                alt="image"
                src="https://cdn-icons-png.flaticon.com/512/5860/5860579.png"
              />
            </Stack>
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
            disabled={isPin ? false : true}
            style={{ transition: "0.5s" }}
            styles={{ label: { color: isPin ? "white" : "gray" } }}
            label="Nama Pin"
            placeholder="Masukan nama pin map"
            withAsterisk
            onChange={(val) => {
              setNamePin(_.startCase(val.currentTarget.value));
            }}
          />
        </Paper>

        <Stack>
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
                <Title order={3}>Foto Lokasi Bisnis</Title>
                <Text fs={"italic"} fz={10} align="center">
                  Upload foto lokasi bisnis anda untuk ditampilkan dalam detail
                  map
                </Text>
              </Stack>
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
                    setImg(null);
                    ComponentGlobal_NotifikasiPeringatan(
                      PemberitahuanMaksimalFile,
                      3000
                    );

                    return;
                  }

                  // if (files.size > MAX_SIZE) {
                  //   setImg(null);
                  //   ComponentGlobal_NotifikasiPeringatan(
                  //     PemberitahuanMaksimalFile,
                  //     3000
                  //   );
                  // } else {
                  //   setImg(buffer);
                  // }

                  if (imageId != "") {
                    const deletePhoto = await funGlobal_DeleteFileById({
                      fileId: imageId,
                    });

                    if (deletePhoto.success) {
                      setImageId("");

                      const uploadPhoto = await funGlobal_UploadToStorage({
                        file: files,
                        dirId: DIRECTORY_ID.map_image,
                      });

                      if (uploadPhoto.success) {
                        setImageId(uploadPhoto.data.id);
                        setImg(buffer);
                      } else {
                        ComponentGlobal_NotifikasiPeringatan(
                          "Gagal upload gambar"
                        );
                      }
                    }
                  } else {
                    const uploadPhoto = await funGlobal_UploadToStorage({
                      file: files,
                      dirId: DIRECTORY_ID.map_image,
                    });

                    if (uploadPhoto.success) {
                      setImageId(uploadPhoto.data.id);
                      setImg(buffer);
                    } else {
                      ComponentGlobal_NotifikasiPeringatan(
                        "Gagal upload gambar"
                      );
                    }
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
              accept="image/png,image/jpeg"
            >
              {(props) => (
                <Button
                  disabled={isPin ? false : true}
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

        <ComponentMap_ButtonSavePin
          namePin={namePin}
          lat={lat as any}
          long={long as any}
          portofolioId={portofolioId}
          imageId={imageId}
        />
      </Stack>
    </>
  );
}
