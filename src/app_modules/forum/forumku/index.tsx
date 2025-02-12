"use client";

import { RouterForum } from "@/lib/router_hipmi/router_forum";
import {
  AccentColor
} from "@/app_modules/_global/color/color_pallet";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import {
  ActionIcon,
  Affix,
  Center,
  Loader,
  Stack,
  Text,
  rem,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconPencilPlus, IconSearchOff } from "@tabler/icons-react";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentForum_ForumkuMainCardView from "../component/forumku_component/forumku_view";
import { forum_getAllPostingByAuhtorId } from "../fun/get/get_list_posting_by_author_id";
import { MODEL_FORUM_POSTING } from "../model/interface";
import ComponentForum_ViewForumProfile from "./forum_profile";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";

export default function Forum_Forumku({
  auhtorSelectedData,
  dataPosting,
  totalPosting,
  userLoginId,
}: {
  auhtorSelectedData: MODEL_USER;
  dataPosting: MODEL_FORUM_POSTING[];
  totalPosting: number;
  userLoginId: string;
}) {
  const router = useRouter();
  const [data, setData] = useState(dataPosting);
  const [activePage, setActivePage] = useState(1);

  const [scroll, scrollTo] = useWindowScroll();
  const [loadingCreate, setLoadingCreate] = useState(false);

  return (
    <>
      {userLoginId === auhtorSelectedData.id && (
        <ComponentGlobal_CreateButton path={RouterForum.create} />
      )}

      <Stack spacing={"xl"}>
        <ComponentForum_ViewForumProfile
          auhtorSelectedData={auhtorSelectedData}
          totalPosting={totalPosting}
        />

        {_.isEmpty(data) ? (
          <Stack align="center" justify="center" h={"80vh"}>
            <IconSearchOff size={80} color="white" />
            <Stack spacing={0} align="center">
              <Text c={"white"} fw={"bold"} fz={"xs"}>
                Tidak ada data
              </Text>
            </Stack>
          </Stack>
        ) : (
          // --- Main component --- //
          <ScrollOnly
            height={data.length < 5 ? "75vh" : "100vh"}
            renderLoading={() => (
              <Center mt={"lg"}>
                <Loader color={"yellow"} />
              </Center>
            )}
            data={data}
            setData={setData}
            moreData={async () => {
              const loadData = await forum_getAllPostingByAuhtorId({
                page: activePage + 1,
                authorId: auhtorSelectedData.id,
              });
              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentForum_ForumkuMainCardView
                data={item}
                userLoginId={userLoginId}
                onLoadData={(val) => {
                  setData(val);
                }}
                allData={data}
              />
            )}
          </ScrollOnly>
        )}
      </Stack>
    </>
  );
}
