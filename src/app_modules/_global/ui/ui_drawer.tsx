"use client"

import {
  ActionIcon,
  Drawer,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AccentColor } from "../color/color_pallet";
import ComponentGlobal_Loader from "../component/loader";

interface MODEL_DRAWER {
  id: string;
  name: string;
  icon: string;
  path: string;
}
export default function UIGlobal_Drawer({
  opened,
  close,
  component,
}: {
  opened: boolean;
  close: () => void;
  component:
  | {
    id: string;
    name: string;
    icon: string;
    path: string;
  }[]
  | any[];
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [pageId, setPageId] = useState("");

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => close()}
        position={"bottom"}
        size={"auto"}
        withCloseButton={false}
        styles={{
          content: {
            padding: 0,
            position: "absolute",
            margin: "auto",
            backgroundColor: "transparent",
            left: 0,
            right: 0,
            width: 500,
          },
          body: {
            backgroundColor: AccentColor.darkblue,
            borderTop: `2px solid ${AccentColor.blue}`,
            borderRight: `1px solid ${AccentColor.blue}`,
            borderLeft: `1px solid ${AccentColor.blue}`,
            borderRadius: "20px 20px 0px 0px",
            color: "white",
            paddingBottom: "5%",
          },
        }}
      >
        <Stack spacing={"xs"}>
          <Group position="right">
            <ActionIcon onClick={close} variant="transparent">
              <IconX color="white" />
            </ActionIcon>
          </Group>
          <SimpleGrid cols={component.length < 4 ? component.length : 4}>
            {component.map((e, i) => (
              <Stack key={i} align="center" spacing={"xs"}
                onClick={() => {
                  setPageId(e?.id);
                  setIsLoading(true);
                  router.push(e?.path, { scroll: false });
                }}
              >
                <ActionIcon
                  variant="transparent"
                  c="white"
                >
                  {/* PAKE LOADING */}
                  {/* {isLoading && e?.id === pageId ? (
                    <ComponentGlobal_Loader />
                  ) : (
                    e?.icon
                  )} */}


                  {/* GA PAKE LOADING */}
                  {e?.icon}

                </ActionIcon>
                <Text fz={"sm"} align="center" color="white">
                  {e?.name}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Drawer>
    </>
  );
}
