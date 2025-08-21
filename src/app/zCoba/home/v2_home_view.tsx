"use client";

import { AccentColor, MainColor } from "@/app_modules/_global/color";
import {
  listMenuHomeBody,
  menuHomeJob,
} from "@/app_modules/home/component/list_menu_home";
import {
  Box,
  Stack,
  SimpleGrid,
  Paper,
  ActionIcon,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { IconUserSearch } from "@tabler/icons-react";

export function V2_HomeView() {
  return (
    <>
      <Box>
        <Image
          height={140}
          fit={"cover"}
          alt="logo"
          src={"/aset/home/home-hipmi-new.png"}
          styles={{
            imageWrapper: {
              border: `2px solid ${AccentColor.blue}`,
              borderRadius: "10px 10px 10px 10px",
            },
            image: {
              borderRadius: "8px 8px 8px 8px",
            },
          }}
        />

        {Array.from(new Array(2)).map((e, i) => (
          <Stack my={"sm"} key={i}>
            <SimpleGrid cols={2} spacing="md">
              {listMenuHomeBody.map((e, i) => (
                <Paper
                  key={e.id}
                  h={150}
                  bg={MainColor.darkblue}
                  style={{
                    borderRadius: "10px 10px 10px 10px",
                    border: `2px solid ${AccentColor.blue}`,
                  }}
                  onClick={() => {}}
                >
                  <Stack align="center" justify="center" h={"100%"}>
                    <ActionIcon
                      size={50}
                      variant="transparent"
                      c={e.link == "" ? "gray.3" : MainColor.white}
                    >
                      {e.icon}
                    </ActionIcon>
                    <Text
                      c={e.link == "" ? "gray.3" : MainColor.white}
                      fz={"xs"}
                    >
                      {e.name}
                    </Text>
                  </Stack>
                </Paper>
              ))}
            </SimpleGrid>

            {/* Job View */}
            <Paper
              p={"md"}
              w={"100%"}
              bg={MainColor.darkblue}
              style={{
                borderRadius: "10px 10px 10px 10px",
                border: `2px solid ${AccentColor.blue}`,
              }}
            >
              <Stack onClick={() => {}}>
                <Group>
                  <ActionIcon
                    variant="transparent"
                    size={40}
                    c={menuHomeJob.link == "" ? "gray.3" : MainColor.white}
                  >
                    {menuHomeJob.icon}
                  </ActionIcon>
                  <Text c={menuHomeJob.link == "" ? "gray.3" : MainColor.white}>
                    {menuHomeJob.name}
                  </Text>
                </Group>
                <SimpleGrid cols={2} spacing="md">
                  {Array.from({ length: 2 }).map((e, i) => (
                    <Stack key={i}>
                      <Group spacing={"xs"}>
                        <Stack h={"100%"} align="center" justify="flex-start">
                          <IconUserSearch size={20} color={MainColor.white} />
                        </Stack>
                        <Stack spacing={0} w={"60%"}>
                          <Text
                            lineClamp={1}
                            fz={"sm"}
                            c={MainColor.yellow}
                            fw={"bold"}
                          >
                            nama {i}
                          </Text>
                          <Text fz={"sm"} c={MainColor.white} lineClamp={2}>
                            judulnya {i}
                          </Text>
                        </Stack>
                      </Group>
                    </Stack>
                  ))}
                </SimpleGrid>
              </Stack>
            </Paper>
          </Stack>
        ))}
      </Box>
    </>
  );
}
