"use client";
import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { Stack, Tabs } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { Investasi_ViewPortofolioNew } from "../../_view/main/portofolio/view_portofolio_new";

export function Investasi_UiPortofolioNew() {
   const param = useParams<{ id: string }>();
   const router = useRouter();
   const status = [
      {
         id: "1",
         name: "Publish",
         color: "green"
      },
      {
         id: "2",
         name: "Review",
         color: "orange"
      },
      {
         id: "3",
         name: "Draft",
         color: "yellow"
      },
      {
         id: "4",
         name: "Reject",
         color: "red"
      }
   ]

   return (
      <>
         <Tabs
            variant="pills"
            radius="xl"
            defaultValue={param.id}
            styles={{
               tabsList: {
                  position: "sticky",
                  top: 0,
                  zIndex: 99,
               },
            }}
            value={param.id}
            onTabChange={(val: any) => {
               router.push(NEW_RouterInvestasi.portofolio({ id: val }));
            }}
         >
            <Stack>
               <Tabs.List grow mb={"xs"}>
                  {status.map((e) => (
                     <Tabs.Tab
                        w={"20%"}
                        key={e.id}
                        value={e.id}
                        fw={"bold"}
                        style={{
                           transition: "ease 0.5s ",
                           backgroundColor:
                              param.id === e.id ? MainColor.yellow : AccentColor.blue,
                           color: param.id === e.id ? "black" : "white",
                        }}
                     >
                        {e.name}
                     </Tabs.Tab>
                  ))}
               </Tabs.List>

               <Investasi_ViewPortofolioNew />
            </Stack>
         </Tabs>
      </>
   );
}
