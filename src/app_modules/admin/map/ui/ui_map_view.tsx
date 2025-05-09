"use client";

import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { apiGetAllMap } from "@/app_modules/map/lib/api_map";
import {
  defaultLatLong,
  defaultMapZoom,
} from "@/app_modules/map/lib/default_lat_long";
import { IDataMap } from "@/app_modules/map/lib/type_map";
import { APIs } from "@/lib";
import { Avatar, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import Map, {
  AttributionControl,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import ComponentAdminGlobal_IsEmptyData from "../../_admin_global/is_empty_data";
import { ComponentAdminMap_Drawer } from "../component";

export function UiAdminMap_MapBoxView({
  mapboxToken,
}: {
  mapboxToken: string;
}) {
  const [mapId, setMapId] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState<IDataMap[]>([]);
  const [loading, setLoading] = useState(false);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      setLoading(true);
      const response = await apiGetAllMap();
      if (response) {
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (!mapboxToken)
    return <ComponentAdminGlobal_IsEmptyData text="Mapbox token not found" />;

  return (
    <>
      <Stack
        style={{
          marginTop: "10px",
          borderRadius: "5px",
          backgroundColor: "gray",
        }}
      >
        {loading ? (
          <CustomSkeleton height={500} />
        ) : (
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
              width: "auto",
              height: "82vh",
              borderRadius: "5px",
            }}
            attributionControl={false}
          >
            {data.map((e, i) => (
              <Stack key={i}>
                <Marker
                  style={{
                    width: 40,
                    cursor: "pointer",
                  }}
                  latitude={e.latitude as any}
                  longitude={e.longitude as any}
                  anchor="bottom"
                  offset={[0, 0]}
                  scale={1}
                >
                  <Stack
                    spacing={0}
                    align="center"
                    onClick={() => {
                      setMapId(e.id);
                      setOpenDrawer(true);
                    }}
                  >
                    <Avatar
                      alt="Logo"
                      style={{
                        border: `2px solid ${AccentColor.softblue}`,
                        borderRadius: "100%",
                        backgroundColor: "white",
                      }}
                      src={
                        e.pinId === null
                          ? APIs.GET({ fileId: e.logoId, size: "300" })
                          : APIs.GET({ fileId: e.pinId, size: "300" })
                      }
                    />
                  </Stack>
                </Marker>
              </Stack>
            ))}

            <NavigationControl />
            <ScaleControl position="top-left" />
            <AttributionControl customAttribution="Map design by PT. Bali Interaktif Perkasa" />
          </Map>
        )}
      </Stack>

      <ComponentAdminMap_Drawer
        opened={openDrawer}
        onClose={() => setOpenDrawer(false)}
        mapId={mapId as any}
      />
    </>
  );
}
