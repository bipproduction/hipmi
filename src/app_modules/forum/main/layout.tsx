"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import {
  ActionIcon,
  Avatar,
  Loader
} from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LayoutForum_Main({
  children,
  dataAuthor,
}: {
  children: React.ReactNode;
  dataAuthor: MODEL_USER;
}) {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useState(1);
  const [loading, setLoading] = useState(false);


  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Forum"
            iconRight={
              <ActionIcon
                radius={"xl"}
                variant="transparent"
                onClick={() => {
                  setLoading(true);
                  router.push(RouterForum.forumku + dataAuthor?.id);
                }}
              >
                {loading ? (
                  <Loader size={20} />
                ) : (
                  <Avatar
                    radius={"xl"}
                    size={30}
                    sx={{
                      borderStyle: "solid",
                      borderWidth: "0.5px",
                      borderColor: "black",
                    }}
                    alt="foto"
                    src={
                      RouterProfile.api_foto_profile +
                      dataAuthor?.Profile?.imagesId
                    }
                  />
                )}
              </ActionIcon>
            }
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>

      {/* <AppComponentGlobal_LayoutTamplate
        header={
          <Header height={50} sx={{ borderStyle: "none" }}>
            <Group h={50} position="apart" px={"md"}>
              <ActionIcon
                variant="transparent"
                onClick={() => {
                  setLoading(true);
                  return router.push(RouterHome.main_home);
                }}
              >
                <IconChevronLeft />
              </ActionIcon>

              <Title order={5}>Forum</Title>
              
              <ActionIcon
                loading={loading ? true : false}
                variant="transparent"
                onClick={() => {
                  setLoading(true);
                  router.push(RouterForum.forumku + dataAuthor?.id);
                }}
              >
                <Avatar
                  radius={"xl"}
                  size={30}
                  sx={{
                    borderStyle: "solid",
                    borderWidth: "0.5px",
                    borderColor: "black",
                  }}
                  alt="foto"
                  src={
                    RouterProfile.api_foto_profile +
                    dataAuthor?.Profile?.imagesId
                  }
                />
              </ActionIcon>
            </Group>
          </Header>
        }

        // footer={
        //   <Footer height={60} bg={"dark"}>
        //     <Grid>
        //       {listFooter.map((e) => (
        //         <Grid.Col
        //           key={e.id}
        //           span={"auto"}
        //           pt={"md"}
        //           onClick={() => {
        //             router.replace(e.path);
        //             setHotMenu(e.id);
        //           }}
        //         >
        //           <Center>
        //             <Stack align="center" spacing={0}>
        //               <ActionIcon
        //                 variant="transparent"
        //                 c={hotMenu === e.id ? "blue" : "white"}
        //               >
        //                 {e.icon}
        //               </ActionIcon>
        //               <Text fz={10} c={hotMenu === e.id ? "blue" : "white"}>
        //                 {e.name}
        //               </Text>
        //             </Stack>
        //           </Center>
        //         </Grid.Col>
        //       ))}
        //     </Grid>
        //   </Footer>
        // }
      >
        {children}
      </AppComponentGlobal_LayoutTamplate> */}
    </>
  );
}
