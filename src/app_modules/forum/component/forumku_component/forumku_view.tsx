"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import {
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { Box, Group, Stack, Text } from "@mantine/core";
import { IconMessageCircle, IconMessageCircleX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_FORUM_POSTING } from "../../model/interface";
import ComponentForum_ForumkuHeaderCard from "./forumku_header";

export default function ComponentForum_ForumkuMainCardView({
  data,
  userLoginId,
  onLoadData,
  allData,
}: {
  data: MODEL_FORUM_POSTING;
  userLoginId: string;
  onLoadData: (val: any) => void;
  allData: any[];
}) {
  const router = useRouter();
  const [visable, setVisible] = useState(false);

  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack>
          <ComponentForum_ForumkuHeaderCard
            data={data}
            isMoreButton={true}
            userLoginId={userLoginId}
            onLoadData={onLoadData}
            allData={allData}
          />

          <Box
            sx={{ zIndex: 0 }}
            p={"lg"}
            onClick={() => {
              setVisible(true);
              router.push(RouterForum.main_detail + data?.id);
            }}
          >
            <Text c={"white"} fz={"sm"} lineClamp={4}>
              <div dangerouslySetInnerHTML={{ __html: data?.diskusi }} />
            </Text>
          </Box>

          <Group spacing={"xs"} px={"sm"}>
            {(data?.ForumMaster_StatusPosting?.id as any) === 1 ? (
              <IconMessageCircle color="white" size={25} />
            ) : (
              <IconMessageCircleX color="gray" size={25} />
            )}

            <Text
              c={
                (data?.ForumMaster_StatusPosting?.id as any) === 1
                  ? "white"
                  : "gray"
              }
            >
              {data?.Forum_Komentar.length}
            </Text>
          </Group>
          {visable && <ComponentGlobal_CardLoadingOverlay />}
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
