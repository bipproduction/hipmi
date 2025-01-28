"use client";
import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import {
  Box,
  Divider,
  Grid,
  Stack,
  Title
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

function ComponentEvent_ListSponsor({
  backgroundColor,
  border,
  marginBottom,
  height,
  color,
  profile,
  data,
}: {
  backgroundColor?: string;
  border?: string;
  marginBottom?: string | number;
  height?: string | number;
  color?: string;
  profile: any;
  data: any;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack>
          <Grid>
            <Grid.Col span={"auto"}>
              <ComponentGlobal_AvatarAndUsername profile={profile} />
            </Grid.Col>
          </Grid>
          <Divider />

          <Box
            p={"md"}
            onClick={() => {
              router.push(RouterEvent.detail_sponsor({ id: data.id }));
              setVisible(true);
            }}
          >
            <Title align="center" order={2}>
              {data?.name}
            </Title>
          </Box>
        </Stack>
        {visible && <ComponentGlobal_CardLoadingOverlay />}
      </ComponentGlobal_CardStyles>
      {/* <Box>
        <Card
          style={{
            backgroundColor: backgroundColor
              ? backgroundColor
              : AccentColor.darkblue,
            border: `2px solid ${border ? border : AccentColor.blue}`,
            paddingInline: "16px",
            paddingBlock: "16px",
            borderRadius: "10px",
            color: color ? color : MainColor.white,
            height: height ? height : "auto",
            marginBottom: marginBottom ? marginBottom : "15px",
          }}
          onClick={() =>
            router.push(RouterEvent.detail_sponsor({ id: params.id }))
          }
        >
          <Flex gap={"md"} align={"center"} justify={"space-between"}>
            <Group>
              <Avatar radius={"xl"} size={40}>
                <Image
                  src={"https://images.app.goo.gl/C7WDoF9X52HC5SJX9"}
                  alt=""
                />
              </Avatar>
              <Text fz={"md"}>INACO</Text>
            </Group>
            <Text style={{ color: "white" }}>Rp. 100.000</Text>
          </Flex>
        </Card>
      </Box> */}
    </>
  );
}

export default ComponentEvent_ListSponsor;
