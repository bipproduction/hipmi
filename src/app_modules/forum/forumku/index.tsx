"use client";

import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import { apiGetUserById } from "@/app_modules/_global/lib/api_user";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import { RouterForum } from "@/lib/router_hipmi/router_forum";
import { clientLogger } from "@/util/clientLogger";
import { Center, Loader, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { apiGetForumkuById } from "../component/api_fetch_forum";
import ComponentForum_ForumkuMainCardView from "../component/forumku_component/forumku_view";
import { Forum_ComponentIsDataEmpty } from "../component/other_component";
import {
  Forum_SkeletonCard,
  Forum_SkeletonForumku,
} from "../component/skeleton_view";
import { MODEL_FORUM_POSTING } from "../model/interface";
import ComponentForum_ViewForumProfile from "./forum_profile";

export default function Forum_Forumku({
  userLoginId,
}: {
  userLoginId: string;
}) {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const userId = params.id;
  const [dataUser, setDataUser] = useState<MODEL_USER | null>(null);
  const [dataPosting, setDataPosting] = useState<MODEL_FORUM_POSTING[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    const handleLoadDataUser = async () => {
      try {
        const response = await apiGetUserById({
          id: userId,
        });

        if (response) {
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
      setIsLoading(true);
      const response = await apiGetForumkuById({
        id: userId,
        page: "1",
      });

      if (response.success) {
        setDataPosting(response.data);
        setActivePage(1);
        setIsLoading(false);
      } else {
        setDataPosting([]);
        setIsLoading(false);
      }
    } catch (error) {
      clientLogger.error("Error get data forum");
      setIsLoading(false);
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
            totalPosting={dataPosting.length}
          />
        )}

        {!dataPosting.length && isLoading ? (
          <Forum_SkeletonCard />
        ) : _.isEmpty(dataPosting) ? (
          <Forum_ComponentIsDataEmpty />
        ) : (
          // --- Main component --- //
          <ScrollOnly
            height={"75vh"}
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
