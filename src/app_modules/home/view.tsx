"use client";

import { useAtom } from "jotai";
import { Logout } from "../auth";
import { valueCookies } from "../auth/state/s_token";
import { useState } from "react";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useShallowEffect } from "@mantine/hooks";
import toast from "react-simple-toasts";
import { s_getOneUser } from "./state/s_get_one";
import { getAllUser } from "./fun/get-one";
import {
  IconAffiliate,
  IconBriefcase,
  IconHeartHandshake,
  IconMap2,
  IconMessages,
  IconPackageImport,
  IconPresentation,
  IconShoppingBag,
  IconUserCircle,
} from "@tabler/icons-react";
import { MyConsole } from "../fun";


const listHalaman = [
  {
    id: 1,
    name: "Forums",
    icon: <IconMessages size={50} />,
  },
  {
    id: 2,
    name: "Project Collaboration",
    icon: <IconAffiliate size={50} />,
  },
  {
    id: 3,
    name: "Voting",
    icon: <IconPackageImport size={50} />,
  },
  {
    id: 4,
    name: "Event",
    icon: <IconPresentation size={50} />,
  },
  {
    id: 5,
    name: "Crowd Funding",
    icon: <IconHeartHandshake size={50} />,
  },
  {
    id: 6,
    name: "Marketplace",
    icon: <IconShoppingBag size={50} />,
  },
  {
    id: 7,
    name: "Job Vacancy",
    icon: <IconBriefcase size={50} />,
  },
  {
    id: 8,
    name: "Business Maps",
    icon: <IconMap2 size={50} />,
  },
];

export default function ViewHome() {
  const router = useRouter();
  const [valToken, setToken] = useAtom(valueCookies);

  useShallowEffect(() => {
    getData();
  }, []);

  async function getData() {
    const data = await fetch("/api/user/get-one")
      .then((res) => res.json())
      .then((val) => setToken(val))
      
  }

  return (
    <>
      {/* {JSON.stringify(valToken, null, 2)} */}

      {/* <Center>
        <Flex direction={"column"} gap={"lg"}>
          <Title>Home</Title>
          <Text>Welcome, {valToken?.data?.username}</Text>
          <Button
            onClick={() => {
              if (valToken?.data?.Profile === null) {
                return router.push("/dev/katalog/profile/create");
              } else {
                return router.push("/dev/katalog/view");
              }
            }}
          >
            Katalog
          </Button>

          <Logout />
        </Flex>
      </Center> */}

      <Box>
        <Flex align={"center"} gap={"sm"}>
          <ActionIcon
            size={30}
            variant="transparent"
            onClick={() => {
              if (valToken?.data?.Profile === null) {
                return router.push("/dev/katalog/profile/create");
              } else {
                return router.push("/dev/katalog/view");
              }
            }}
          >
            <IconUserCircle size={50} color="black" />
          </ActionIcon>

          <Text>Welcome to, {valToken?.data?.username}</Text>
          <Logout/>
        </Flex>
        <Paper bg={"dark"} radius={5} my={"xs"}>
          <Image alt="logo" src={"/aset/logo.png"} />
        </Paper>
        <Box my={"sm"}>
          <SimpleGrid cols={2}>
            {listHalaman.map((e, i) => (
              <Paper
                key={e.id}
                h={100}
                withBorder
                onClick={() => toast(e.name)}
              >
                <Flex
                  justify={"center"}
                  align={"center"}
                  direction={"column"}
                  h={100}
                >
                  {e.icon}
                  {e.name}
                </Flex>
              </Paper>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}
