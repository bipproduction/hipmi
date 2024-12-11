"use client";

import { APIs } from "@/app/lib";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import {
  ComponentMap_DetailData,
  ComponentMap_DrawerDetailData,
} from "@/app_modules/map/_component";
import { defaultMapZoom } from "@/app_modules/map/lib/default_lat_long";
import { MODEL_MAP } from "@/app_modules/map/lib/interface";
import { Avatar, Paper, Stack, Title } from "@mantine/core";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import {
  AttributionControl,
  Map,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { MODEL_PORTOFOLIO } from "../model/interface";

export function Portofolio_UiMap({
  mapboxToken,
  data,
}: {
  mapboxToken: string;
  data: MODEL_PORTOFOLIO;
}) {
  return (
    <Paper
      p={"sm"}
      style={{
        backgroundColor: AccentColor.darkblue,
        border: `2px solid ${AccentColor.blue}`,
        borderRadius: "10px ",
        padding: "15px",
        color: "white",
      }}
    >
      <Stack spacing={0}>
        <Title mb={"lg"} order={6}>
          Lokasi Bisnis
        </Title>

        <MapView
          data={data.BusinessMaps}
          mapboxToken={mapboxToken}
          logoId={data.logoId}
        />
      </Stack>
    </Paper>
  );
}

function MapView({
  mapboxToken,
  data,
  logoId,
}: {
  mapboxToken: string;
  data: MODEL_MAP;
  logoId: string;
}) {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
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
          height: "50vh",
          borderRadius: "10px",
        }}
        attributionControl={false}
      >
        <Marker
          style={{
            color: "red",
            width: 40,
            cursor: "pointer",
          }}
          latitude={data.latitude}
          longitude={data.longitude}
          anchor="bottom"
          offset={[0, 0]}
          scale={1}
          onClick={() => {
            setOpenDrawer(true);
          }}
          pitchAlignment="auto"
        >
          <Stack spacing={0} align="center">
            <Avatar
              src={
                data.pinId === null
                  ? APIs.GET({ fileId: logoId , size: "300"})
                  : APIs.GET({ fileId: data.pinId, size: "300" })
              }
              alt="Logo"
              style={{
                border: `2px solid ${AccentColor.softblue}`,
                backgroundColor: "white",
                borderRadius: "100%",
              }}
            />
          </Stack>
        </Marker>

        <NavigationControl />
        <ScaleControl position="top-left" />
        <AttributionControl
          style={{ color: "black" }}
          customAttribution="Map design by PT. Bali Interaktif Perkasa"
        />
      </Map>

      <ComponentMap_DrawerDetailData
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        mapId={data.id}
        component={<ComponentMap_DetailData mapId={data.id} isDetail />}
      />
    </>
  );
}

