"use client";

import { RouterEvent } from "@/lib/router_hipmi/router_event";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { MODEL_NEW_DEFAULT_MASTER } from "@/app_modules/model_global/interface";
import { Box, Stack, Tabs } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Event_StatusDraft from "./draft";
import Event_StatusPublish from "./publish";
import Event_StatusReject from "./reject";
import Event_StatusReview from "./review";
import { globalStatusApp } from "@/app_modules/_global/lib";
import Event_ViewStatus from "./view_status";

export default function Event_StatusPage() {
  // const [changeStatus, setChangeStatus] = useState(statusId);
  // async function onChangeStatus({ statusId }: { statusId: string }) {
  //   router.replace(RouterEvent.status({ id: statusId }));
  // }
  const router = useRouter();
  const param = useParams<{ id: string }>();
  const statusId = param.id;

  return (
    <>
      <Tabs
        variant="pills"
        radius="xl"
        mt={1}
        defaultValue={statusId}
        value={statusId}
        onTabChange={(val: any) => {
          router.replace(RouterEvent.status({ id: val }));
        }}
        styles={{
          tabsList: {
            backgroundColor: MainColor.darkblue,
            position: "sticky",
            top: 0,
            zIndex: 99,
          },
        }}
      >
        <Stack>
          <Tabs.List grow>
            {globalStatusApp.map((e) => (
              <Tabs.Tab
                key={e.id}
                value={e.id}
                fw={"bold"}
                style={{
                  transition: "0.5s",
                  color:
                    statusId === e.id
                      ? MainColor.darkblue
                      : MainColor.black,
                  backgroundColor:
                    statusId === e.id ? MainColor.yellow : MainColor.white,
                  border:
                    statusId === e.id
                      ? `1px solid ${AccentColor.yellow}`
                      : `1px solid ${MainColor.white}`,
                }}
              >
                {e.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Event_ViewStatus/>

          {/* <Box>
            {changeStatus === "1" && (
              <Event_StatusPublish listPublish={dataStatus} />
            )}
            {changeStatus === "2" && (
              <Event_StatusReview listReview={dataStatus} />
            )}
            {changeStatus === "3" && (
              <Event_StatusDraft listDraft={dataStatus} />
            )}
            {changeStatus === "4" && (
              <Event_StatusReject listReject={dataStatus} />
            )}
          </Box> */}
        </Stack>
      </Tabs>
    </>
  );

  // return (
  //   <>
  //     <Tabs
  //       variant="pills"
  //       radius="xl"
  //       mt={1}
  //       defaultValue={changeStatus}
  //       value={changeStatus}
  //       onTabChange={(val: any) => {
  //         console.log(val);
  //       }}
  //       styles={{
  //         tabsList: {
  //           backgroundColor: MainColor.darkblue,
  //           position: "sticky",
  //           top: 0,
  //           zIndex: 99,
  //         },
  //       }}
  //     >
  //       <Stack>
  //         <Tabs.List grow>
  //           {listStatus.map((e) => (
  //             <Tabs.Tab
  //               key={e.id}
  //               value={e.name}
  //               fw={"bold"}
  //               c={"black"}
  //               // style={{
  //               //   transition: "0.5s",
  //               //   backgroundColor:
  //               //     tabsStatus === e.name ? MainColor.yellow : "white",
  //               //   border:
  //               //     tabsStatus === e.name
  //               //       ? `1px solid ${AccentColor.yellow}`
  //               //       : `1px solid white`,
  //               // }}
  //             >
  //               {e.name}
  //             </Tabs.Tab>
  //           ))}
  //         </Tabs.List>
  //         {/* {listTabs.map((e) => (
  //           <Tabs.Panel key={e.id} value={e.value}>
  //             {e.path}
  //           </Tabs.Panel>
  //         ))} */}
  //       </Stack>
  //     </Tabs>
  //   </>
  // );
}
