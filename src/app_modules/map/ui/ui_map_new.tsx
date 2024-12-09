"use client";
import { APIs } from "@/app/lib";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Avatar, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import Map, { AttributionControl, Marker, NavigationControl, ScaleControl, } from "react-map-gl";
import { ComponentMap_DetailData, ComponentMap_DrawerDetailData } from "../_component";
import { apiGetAllMap } from "../lib/api_map";
import { defaultLatLong, defaultMapZoom } from "../lib/default_lat_long";
import { IDataMap } from "../lib/type_map";

export function UiMap_MapBoxViewNew({ mapboxToken, }: { mapboxToken: string }) {
   const [mapId, setMapId] = useState("");
   const [openDrawer, setOpenDrawer] = useState(false);
   const [data, setData] = useState<IDataMap[]>([]);
   const [loading, setLoading] = useState(false);

   useShallowEffect(() => {
      onLoadData();
   }, []);

   async function onLoadData() {
      try {
         setLoading(true)
         const response = await apiGetAllMap()
         if (response.success) {
            setData(response.data)
         }
      } catch (error) {
         console.error(error)
      } finally {
         setLoading(false)
      }
   }

   if (!mapboxToken)
      return <ComponentGlobal_IsEmptyData text="Mapbox token not found" />;

   return (
      <>
         <Stack style={{ borderRadius: "10px" }}>
            {
               loading ?
                  <></> :
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
                              latitude={Number(e.latitude)}
                              longitude={Number(e.longitude)}
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
                                          ? APIs.GET({ fileId: e.logoId })
                                          : APIs.GET({ fileId: e.pinId })
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
            }
         </Stack>

         <ComponentMap_DrawerDetailData
            opened={openDrawer}
            close={() => setOpenDrawer(false)}
            mapId={mapId}
            component={<ComponentMap_DetailData mapId={mapId} />}
         />

         {/* <ComponentMap_DrawerDetailDataNew opened={openDrawer} close={() => setOpenDrawer(false)} mapId={mapId}/> */}
      </>
   );
}
