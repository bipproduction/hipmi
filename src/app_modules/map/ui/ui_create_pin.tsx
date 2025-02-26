"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_ButtonUploadFileImage,
} from "@/app_modules/_global/component";
import {
  AspectRatio,
  Center,
  Image,
  Paper,
  Stack,
  TextInput
} from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import _ from "lodash";
import { useParams } from "next/navigation";
import { useState } from "react";
import Map, {
  AttributionControl,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { ComponentMap_ButtonSavePin } from "../_component";
import { defaultLatLong, defaultMapZoom } from "../lib/default_lat_long";

export function UiMap_CreatePin({ mapboxToken }: { mapboxToken: string }) {
  const params = useParams<{ id: string }>();
  const portofolioId = params.id;
  const [[lat, long], setLatLong] = useState([0, 0]);
  const [isPin, setIsPin] = useState(false);
  const [namePin, setNamePin] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>(null);

  return (
    <>
      <Stack spacing={50}>
        {/* Map Pin */}
        <Stack spacing={"sm"}>
          <ComponentGlobal_BoxInformation informasi="Tentukan lokasi pin map dengan klik pada peta." />
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
              styles={{
                label: { color: isPin ? MainColor.white : "gray" },
                input: {
                  backgroundColor: MainColor.white,
                },
                required: {
                  color: MainColor.red,
                },
              }}
              label="Nama Pin"
              placeholder="Masukan nama pin map"
              withAsterisk
              onChange={(val) => {
                setNamePin(_.startCase(val.currentTarget.value));
              }}
            />
          </Paper>
        </Stack>

        <Stack spacing={"sm"}>
          <ComponentGlobal_BoxInformation informasi="Upload foto lokasi bisnis anda untuk ditampilkan dalam detail map." />
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

        <ComponentMap_ButtonSavePin
          namePin={namePin}
          lat={lat as any}
          long={long as any}
          portofolioId={portofolioId}
          file={file as File}
        />
      </Stack>
    </>
  );
}
