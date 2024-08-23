"use client";

import { RouterPortofolio } from "@/app/lib/router_hipmi/router_katalog";
import { RouterMap } from "@/app/lib/router_hipmi/router_map";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
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
import { ComponentMap_DrawerDetailData } from "../_component";
import { ComponentMap_DetailData } from "../_component/detail_data";
import { map_funGetAllMap } from "../fun/get/fun_get_all_map";
import { defaultLatLong, defaultMapZoom } from "../lib/default_lat_long";
import { MODEL_MAP } from "../lib/interface";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";

export function UiMap_MapBoxView({
  mapboxToken,
  dataMap,
}: {
  mapboxToken: string;
  dataMap: MODEL_MAP[];
}) {
  const [mapId, setMapId] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState(dataMap);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    const loadData = await map_funGetAllMap();
    setData(loadData as any);
  }

  if (!mapboxToken)
    return <ComponentGlobal_IsEmptyData text="Mapbox token not found" />;

  return (
    <>
      <Stack style={{ borderRadius: "10px" }}>
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
            height: "90vh",
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
                latitude={e.latitude}
                longitude={e.longitude}
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
                      e.imagePinId === null
                        ? RouterPortofolio.api_logo_porto + e.Portofolio.logoId
                        : RouterMap.api_custom_pin + e.imagePinId
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
      </Stack>

      <ComponentMap_DrawerDetailData
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        mapId={mapId}
        component={<ComponentMap_DetailData mapId={mapId} />}
      />
    </>
  );
}
