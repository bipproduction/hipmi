"use client"

import { MainColor } from "@/app_modules/_global/color";
import { listMenuHomeFooter } from "@/app_modules/home";
import {
    ActionIcon,
    Box,
    Center,
    SimpleGrid,
    Stack,
    Text,
} from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Test_FooterHome() {
  const router = useRouter();

  return (
    <Box
      style={{
        zIndex: 99,
        borderRadius: "20px 20px 0px 0px",
      }}
      w={"100%"}
      bottom={0}
      h={"9vh"}
    >
      <SimpleGrid cols={listMenuHomeFooter.length + 1}>
        {listMenuHomeFooter.map((e) => (
          <Center h={"9vh"} key={e.id}>
            <Stack
              align="center"
              spacing={0}
              onClick={() => {
               console.log("test")
              }}
            >
              <ActionIcon
                radius={"xl"}
                c={e.link === "" ? "gray" : MainColor.white}
                variant="transparent"
              >
                {e.icon}
              </ActionIcon>
              <Text
                lineClamp={1}
                c={e.link === "" ? "gray" : MainColor.white}
                fz={12}
              >
                {e.name}
              </Text>
            </Stack>
          </Center>
        ))}

        <Center h={"9vh"}>
          <Stack align="center" spacing={2}>
            <ActionIcon
              variant={"transparent"}
              onClick={() =>
                console.log("test")
              }
            >
              <IconUserCircle color="white" />
            </ActionIcon>
            <Text fz={10} c={MainColor.white}>
              Profile
            </Text>
          </Stack>
        </Center>
      </SimpleGrid>
    </Box>
  );
}
