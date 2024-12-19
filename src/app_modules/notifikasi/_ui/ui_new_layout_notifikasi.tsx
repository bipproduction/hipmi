"use client";

import { RouterNotifikasi } from "@/app/lib/router_hipmi/router_notifikasi";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import {
  BackgroundImage,
  Box,
  Button,
  Container,
  Flex,
  rem,
  Loader,
} from "@mantine/core";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { gs_notifikasi_kategori_app } from "../lib/global_state";
import { useShallowEffect } from "@mantine/hooks";
import { API_RouteNotifikasi } from "@/app/lib/api_user_router/route_api_notifikasi";

export default function Notifikasi_UiNewLayout({
  children,
  header,
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
}) {
  return (
    <>
      <Box
        w={"100%"}
        h={"100%"}
        style={{
          backgroundColor: MainColor.black,
          overflowX: "auto",
          overflowY: "auto",
          position: "fixed",
        }}
      >
        <Container mih={"100vh"} p={0} size={rem(500)} bg={MainColor.darkblue}>
          <BackgroundImage
            src={"/aset/global/main_background.png"}
            h={"100vh"}
            style={{ position: "relative" }}
          >
            <UIHeader header={header} />

            <UIChildren>{children}</UIChildren>
          </BackgroundImage>
        </Container>
      </Box>
    </>
  );
}

function UIHeader({ header }: { header: React.ReactNode }) {
  return (
    <>
      {header ? (
        <Box
          h={"8vh"}
          style={{
            zIndex: 10,
          }}
          w={"100%"}
          pos={"sticky"}
          top={0}
        >
          {header}
        </Box>
      ) : (
        ""
      )}
    </>
  );
}

function UIChildren({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mstrKategori, setMstrKategori] = useState<any[] | null>(null);
  const [categoryPage, setCategoryPage] = useAtom(gs_notifikasi_kategori_app);

  useShallowEffect(() => {
    onLoadMaster();
  }, []);

  async function onLoadMaster() {
    const res = await fetch(API_RouteNotifikasi.get_master_kategori());
    const data = await res.json();
    setMstrKategori(data.data);
  }

  return (
    <>
      {_.isNull(mstrKategori) ? (
        <SkeletonButton />
      ) : _.isEmpty(mstrKategori) ? (
        <Button w={80} radius={"xl"} c={"gray.5"}>
          Null
        </Button>
      ) : (
        <Box style={{ zIndex: 0 }} h={"92vh"} px={"xs"} pos={"static"}>
          <Box
            mb={"xs"}
            style={{
              display: "flex",
              gap: "20px",
              position: "relative",
              overflowX: "scroll",
              scrollbarWidth: "none",
            }}
          >
            <Flex gap={"md"}>
              {mstrKategori.map((e, i) => (
                <Button
                  radius={"xl"}
                  key={i}
                  c={categoryPage === e.name ? "black" : "gray.5"}
                  style={{
                    transition: "0.3s",
                    backgroundColor:
                      categoryPage === e.name ? MainColor.yellow : "GrayText",
                  }}
                  onClick={() => {
                    router.replace(
                      RouterNotifikasi.categoryApp({
                        name: _.lowerCase(e.name),
                      }),
                      {
                        scroll: false,
                      }
                    );
                    setCategoryPage(e.name);
                  }}
                >
                  {e.name}
                </Button>
              ))}
            </Flex>
          </Box>
          {children}
        </Box>
      )}
    </>
  );
}

function SkeletonButton() {
  return (
    <>
      <Box style={{ zIndex: 0 }} h={"92vh"} px={"xs"} pos={"static"}>
        <Box
          mb={"xs"}
          style={{
            display: "flex",
            gap: "20px",
            position: "relative",
            overflowX: "scroll",
            scrollbarWidth: "none",
          }}
        >
          <Flex gap={"md"}>
            {Array.from(new Array(10)).map((e, i) => (
              <Button
                w={80}
                radius={"xl"}
                key={i}
                c={"gray.5"}
                style={{
                  transition: "0.3s",
                  backgroundColor: "GrayText",
                }}
                onClick={() => {}}
              >
                <Loader size={"xs"} color="black" />
              </Button>
            ))}
          </Flex>
        </Box>
      </Box>
      ;
    </>
  );
}
