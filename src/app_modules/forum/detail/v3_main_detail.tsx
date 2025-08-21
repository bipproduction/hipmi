"use client";

import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { apiGetUserById } from "@/app_modules/_global/lib/api_user";
import { ISticker } from "@/app_modules/_global/lib/interface/stiker";
import { apiGetStickerForUser } from "@/app_modules/_global/lib/stiker/api_fecth_stiker_for_user";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { clientLogger } from "@/util/clientLogger";
import mqtt_client from "@/util/mqtt_client";
import { Box, Center, Loader, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useParams } from "next/navigation";
import { useState } from "react";
import "react-quill/dist/quill.bubble.css";
import {
  apiGetKomentarForumById,
  apiGetOneForumById,
} from "../component/api_fetch_forum";
import Forum_V3_CreateKomentar from "../component/detail_component/comp_V3_create.comment";
import ComponentForum_KomentarView from "../component/detail_component/detail_list_komentar";
import ComponentForum_DetailForumView from "../component/detail_component/detail_view";
import {
  Forum_SkeletonKomentar,
  Forum_SkeletonListKomentar,
} from "../component/skeleton_view";
import { MODEL_FORUM_KOMENTAR, MODEL_FORUM_POSTING } from "../model/interface";
import { apiNewGetUserIdByToken } from "@/app_modules/_global/lib/api_fetch_global";

export default function Forum_V3_MainDetail() {
  const param = useParams<{ id: string }>();
  const [dataPosting, setDataPosting] = useState<MODEL_FORUM_POSTING | null>(
    null
  );
  const [countNewComment, setCountNewComment] = useState(false);
  const [listKomentar, setListKomentar] = useState<
    MODEL_FORUM_KOMENTAR[] | null
  >(null);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sticker, setSticker] = useState<ISticker[] | null>(null);
  const [userLoginId, setUserLoginId] = useState<string | null>(null);

  useShallowEffect(() => {
    onLoadDataSticker();
  }, []);

  async function onLoadDataSticker() {
    try {
      const response = await apiNewGetUserIdByToken();
      if (response.success) {
        setUserLoginId(response.userId);
        const responseDataProfile = await apiGetUserById({
          id: response.userId,
        });

        if (responseDataProfile.success) {
          try {
            const response = await apiGetStickerForUser({
              gender: responseDataProfile?.data?.Profile?.jenisKelamin,
            });
            if (response.success) {
              setSticker(response.res.data);
            } else {
              setSticker([]);
            }
          } catch (error) {
            setSticker([]);
           }
         } else {
           console.error("Failed to get profile", responseDataProfile.message);
           setSticker(null);
         }
      } else {
        setUserLoginId(null);
      }
     
    } catch (error) {
      console.error("Error get profile", error);
      setSticker(null);
    }
  }

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      setIsLoading(true);
      const response = await apiGetOneForumById({
        id: param.id,
      });

      if (response) {
        setDataPosting(response.data);
      } else {
        setDataPosting(null);
      }
    } catch (error) {
      clientLogger.error("Error get data forum", error);
      setDataPosting(null);
    } finally {
      setIsLoading(false);
    }
  };

  useShallowEffect(() => {
    handleLoadDataKomentar();
  }, []);

  const handleLoadDataKomentar = async () => {
    try {
      const response = await apiGetKomentarForumById({
        id: param.id,
        page: `${activePage}`,
      });

      if (response.success) {
        setListKomentar(response.data);
      } else {
        setListKomentar([]);
      }
    } catch (error) {
      clientLogger.error("Error get data komentar forum", error);
      setListKomentar([]);
    }
  };

  const handleMoreDataKomentar = async (
    currentKomentarList: MODEL_FORUM_KOMENTAR[]
  ): Promise<MODEL_FORUM_KOMENTAR[]> => {
    try {
      const nextPage = activePage + 1;
      const response = await apiGetKomentarForumById({
        id: param.id,
        page: `${nextPage}`,
      });

      if (response.success) {
        setActivePage(nextPage);
        const filteredData = response.data.filter(
          (itemBaru: MODEL_FORUM_KOMENTAR) =>
            !currentKomentarList.some(
              (itemLama: MODEL_FORUM_KOMENTAR) => itemLama.id === itemBaru.id
            )
        );

        return filteredData;
      } else {
        return [];
      }
    } catch (error) {
      clientLogger.error("Error get data komentar forum", error);
      return [];
    }
  };

  async function handlerCountComment({
    count,
    trigger,
  }: {
    count: number;
    trigger: boolean;
  }) {
    if (trigger && dataPosting) {
      const cloneData = _.clone(dataPosting);
      const newCount = count - 1;
      cloneData.count = newCount;
      setDataPosting(cloneData);
      setCountNewComment(false);
    }
  }

  useShallowEffect(() => {
    mqtt_client.subscribe("Forum_detail_ganti_status");

    mqtt_client.on("message", (topic: any, message: any) => {
      const newData = JSON.parse(message.toString());
      if (newData.id === dataPosting?.id) {
        const cloneData = _.clone(dataPosting);

        // console.log(newData.data);
        const updateData = {
          ...cloneData,
          ForumMaster_StatusPosting: {
            id: newData.data.id,
            status: newData.data.status,
          },
        };

        setDataPosting(updateData as any);
      }
    });
  }, [dataPosting]);

  return (
    <>
      <Stack>
        {!dataPosting || isLoading || !userLoginId ? (
          <CustomSkeleton height={200} width={"100%"} />
        ) : (
          <ComponentForum_DetailForumView
            data={dataPosting}
            totalKomentar={dataPosting.count}
            userLoginId={userLoginId}
            onLoadData={(val) => {
              setDataPosting(val);
            }}
          />
        )}

        {!dataPosting || isLoading || !userLoginId ? (
          <Forum_SkeletonKomentar />
        ) : (
          (dataPosting?.ForumMaster_StatusPosting?.id as any) === 1 && (
            <Forum_V3_CreateKomentar
              postingId={dataPosting?.id}
              data={dataPosting}
              userLoginId={userLoginId}
              onSetLoadData={(val) => {
                setListKomentar((prev: any) => [val, ...prev]);
              }}
              dataSticker={sticker}
            />
          )
        )}

        {!listKomentar || isLoading || !userLoginId ? (
          <Forum_SkeletonListKomentar />
        ) : _.isEmpty(listKomentar) ? (
          <ComponentGlobal_IsEmptyData text="Tidak ada komentar" />
        ) : (
          <Box>
            <ScrollOnly
              height={"70vh"}
              renderLoading={() => (
                <Center mt={"lg"}>
                  <Loader color={"yellow"} />
                </Center>
              )}
              data={listKomentar || []}
              setData={setListKomentar as any}
              moreData={() => handleMoreDataKomentar(listKomentar as any)}
            >
              {(item) => (
                <ComponentForum_KomentarView
                  data={item}
                  listKomentar={listKomentar as any}
                  setKomentar={(val: any) => (
                    setListKomentar(val.filterComment as any),
                    handlerCountComment({
                      count: dataPosting?.count as number,
                      trigger: val.triggerCount,
                    })
                  )}
                  postingId={dataPosting?.id as any}
                  userLoginId={userLoginId}
                />
              )}
            </ScrollOnly>
          </Box>
        )}
      </Stack>
    </>
  );
}
