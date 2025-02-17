"use client";

import { RouterForum } from "@/lib/router_hipmi/router_forum";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
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
import { useShallowEffect, useWindowScroll } from "@mantine/hooks";
import { IconPencilPlus, IconSearchOff } from "@tabler/icons-react";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import ComponentForum_ForumkuMainCardView from "../component/forumku_component/forumku_view";
import { forum_getAllPostingByAuhtorId } from "../fun/get/get_list_posting_by_author_id";
import { MODEL_FORUM_POSTING } from "../model/interface";
import ComponentForum_ViewForumProfile from "./forum_profile";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import { apiGetUserById } from "@/app_modules/_global/lib/api_user";
import backendLogger from "@/util/backendLogger";
import { clientLogger } from "@/util/clientLogger";
import { apiGetForumkuById } from "../component/api_fetch_forum";
import {
  Forum_SkeletonCard,
  Forum_SkeletonForumku,
} from "../component/skeleton_view";
import { data } from "autoprefixer";
import { Forum_ComponentIsDataEmpty } from "../component/other_component";

export default function Forum_Forumku({
  totalPosting,
  userLoginId,
}: {
  totalPosting: number;
  userLoginId: string;
}) {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const userId = params.id;
  const [dataUser, setDataUser] = useState<MODEL_USER | null>(null);
  const [dataPosting, setDataPosting] = useState<MODEL_FORUM_POSTING[]>([]);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    const handleLoadDataUser = async () => {
      try {
        const response = await apiGetUserById({
          id: userId,
        });

        if (response) {
          console.log("response", response);
          setDataUser(response.data);
        }
      } catch (error) {
        clientLogger.error("Error get user", error);
      }
    };

    handleLoadDataUser();
  }, []);

  useShallowEffect(() => {
    handleLoadDataForum();
  }, []);

  const handleLoadDataForum = async () => {
    try {
      const response = await apiGetForumkuById({
        id: userId,
        page: "1",
      });

      if (response.success) {
        setDataPosting(response.data);
        setActivePage(1);
      }
    } catch (error) {
      clientLogger.error("Error get data forum");
      setDataPosting([]);
    }
  };

  const handleMoreData = async () => {
    try {
      const nextPage = activePage + 1;

      const response = await apiGetForumkuById({
        id: userId,
        page: `${nextPage}`,
      });

      if (response.success) {
        setActivePage(nextPage);
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      clientLogger.error("Error get data forum");
      return null;
    }
  };

  return (
    <>
      <Stack spacing={"xl"}>
        {!dataUser ? (
          <Forum_SkeletonForumku />
        ) : (
          <ComponentForum_ViewForumProfile
            auhtorSelectedData={dataUser}
            totalPosting={totalPosting}
          />
        )}

        {!dataPosting.length ? (
          <Forum_SkeletonCard />
        ) : _.isEmpty(dataPosting) ? (
          <Forum_ComponentIsDataEmpty />
        ) : (
          // --- Main component --- //
          <ScrollOnly
            height={dataPosting.length < 5 ? "75vh" : "100vh"}
            renderLoading={() => (
              <Center mt={"lg"}>
                <Loader color={"yellow"} />
              </Center>
            )}
            data={dataPosting}
            setData={setDataPosting}
            moreData={handleMoreData}
          >
            {(item) => (
              <ComponentForum_ForumkuMainCardView
                data={item}
                userLoginId={userLoginId}
                onLoadData={(val) => {
                  setDataPosting(val);
                }}
                allData={dataPosting}
              />
            )}
          </ScrollOnly>
        )}
      </Stack>

      {userLoginId === dataUser?.id && (
        <ComponentGlobal_CreateButton path={RouterForum.create} />
      )}
    </>
  );
}
