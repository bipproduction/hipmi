import { APIs } from "@/app/lib";
import { AccentColor } from "@/app_modules/_global/color";
import { defaultMapZoom } from "@/app_modules/map/lib/default_lat_long";
import { Paper, Stack, Title, Avatar, Skeleton } from "@mantine/core";
import "mapbox-gl/dist/mapbox-gl.css";
import { useParams } from "next/navigation";
import { useState } from "react";
import { AttributionControl, Map, Marker, NavigationControl, ScaleControl, } from "react-map-gl";
import { IDetailPortofolioLokasi } from "../lib/type_portofolio";
import { apiGetOnePortofolioById } from "../lib/api_portofolio";
import { useShallowEffect } from "@mantine/hooks";
import { ComponentMap_DetailData, ComponentMap_DrawerDetailData } from "@/app_modules/map/_component";

export default function Portofolio_UiMapNew({ mapboxToken }: { mapboxToken: string }) {
   const [loading, setLoading] = useState(true)
   const param = useParams<{ id: string }>()
   const [dataPorto, setDataPorto] = useState<IDetailPortofolioLokasi>()
   const [openDrawer, setOpenDrawer] = useState(false)

   async function funGetPortofolio() {
      try {
         setLoading(true)
         const response = await apiGetOnePortofolioById(param.id, "lokasi");
         if (response.success) {
            setDataPorto(response.data);
         }
      } catch (error) {
         console.error(error);
      } finally {
         setLoading(false)
      }
   }

   useShallowEffect(() => {
      funGetPortofolio()
   }, []);


   return (
      <>
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
               {
                  loading ?
                     <Skeleton radius={"md"} w={"100%"} h={100} />
                     :
                     <Map
                        mapboxAccessToken={mapboxToken}
                        mapStyle={"mapbox://styles/mapbox/streets-v11"}
                        initialViewState={{
                           latitude: Number(dataPorto?.latitude),
                           longitude: Number(dataPorto?.longitude),
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
                           latitude={Number(dataPorto?.latitude)}
                           longitude={Number(dataPorto?.longitude)}
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
                                    dataPorto?.pinId === null
                                       ? APIs.GET({ fileId: String(dataPorto?.logoId) })
                                       : APIs.GET({ fileId: String(dataPorto?.pinId) })
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

               }

            </Stack>

            <ComponentMap_DrawerDetailData
               opened={openDrawer}
               close={() => setOpenDrawer(false)}
               mapId={String(dataPorto?.mapId)}
               component={<ComponentMap_DetailData mapId={String(dataPorto?.mapId)} isDetail />}
            />
         </Paper>
      </>
   )
}