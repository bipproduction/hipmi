"use client";

import { Box, Center, Group, Loader, Stack, TextInput } from "@mantine/core";
import _ from "lodash";
import { MODEL_FORUM_KOMENTAR, MODEL_FORUM_POSTING } from "../model/interface";
import mqtt_client from "@/util/mqtt_client";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import "react-quill/dist/quill.bubble.css";
import ComponentForum_DetailCreateKomentar from "../component/detail_component/detail_create_komentar";
import ComponentForum_KomentarView from "../component/detail_component/detail_list_komentar";
import ComponentForum_DetailForumView from "../component/detail_component/detail_view";
import { ScrollOnly } from "next-scroll-loader";
import { forum_funGetAllKomentarById } from "../fun/get/get_all_komentar_by_id";
import {
  apiGetKomentarForumById,
  apiGetOneForumById,
} from "../component/api_fetch_forum";
import { useParams } from "next/navigation";
import { clientLogger } from "@/util/clientLogger";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import {
  Forum_SkeletonKomentar,
  Forum_SkeletonListKomentar,
} from "../component/skeleton_view";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";

export default function Forum_MainDetail({
  userLoginId,
  countKomentar,
}: {
  userLoginId: string;
  countKomentar: number;
}) {
  const param = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_FORUM_POSTING | null>(null);
  const [lsKomentar, setLsKomentar] = useState<MODEL_FORUM_KOMENTAR[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [newKomentar, setNewKomentar] = useState(false);

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      const response = await apiGetOneForumById({
        id: param.id,
      });

      if (response) {
        setData(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get data forum", error);
      setData(null);
    }
  };

  useShallowEffect(() => {
    handleLoadDataKomentar();
  }, [newKomentar]);

  const handleLoadDataKomentar = async () => {
    try {
      const response = await apiGetKomentarForumById({
        id: param.id,
        page: `${activePage}`,
      });

      if (response.success) {
        setLsKomentar(response.data);
      } else {
        setLsKomentar([]);
      }
    } catch (error) {
      clientLogger.error("Error get data komentar forum", error);
      setLsKomentar([]);
    }
  };

  const handleMoreDataKomentar = async () => {
    try {
      const nextPage = activePage + 1;
      const response = await apiGetKomentarForumById({
        id: param.id,
        page: `${nextPage}`,
      });

      if (response.success) {
        setActivePage(nextPage);
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      clientLogger.error("Error get data komentar forum", error);
      return null;
    }
  };

  useShallowEffect(() => {
    mqtt_client.subscribe("Forum_detail_ganti_status");

    mqtt_client.on("message", (topic: any, message: any) => {
      const newData = JSON.parse(message.toString());
      if (newData.id === data?.id) {
        const cloneData = _.clone(data);

        // console.log(newData.data);
        const updateData = {
          ...cloneData,
          ForumMaster_StatusPosting: {
            id: newData.data.id,
            status: newData.data.status,
          },
        };

        setData(updateData as any);
      }
    });
  }, [data]);

  return (
    <>
      <Stack>
        {!data ? (
          <CustomSkeleton height={200} width={"100%"} />
        ) : (
          <ComponentForum_DetailForumView
            data={data}
            totalKomentar={countKomentar}
            userLoginId={userLoginId}
            onLoadData={(val) => {
              setData(val);
            }}
          />
        )}

        {!data ? (
          <Forum_SkeletonKomentar />
        ) : (
          (data?.ForumMaster_StatusPosting?.id as any) === 1 && (
            <ComponentForum_DetailCreateKomentar
              postingId={data?.id}
              onSetKomentar={(val) => {
                setLsKomentar(val);
              }}
              data={data}
              userLoginId={userLoginId}
              onSetNewKomentar={(val) => {
                setNewKomentar(val);
              }}
            />
          )
        )}

        {!lsKomentar.length ? (
          <Forum_SkeletonListKomentar />
        ) : _.isEmpty(lsKomentar) ? (
          <ComponentGlobal_IsEmptyData />
        ) : (
          <Box >
            <ScrollOnly
              height={"60vh"}
              renderLoading={() => (
                <Center mt={"lg"}>
                  <Loader color={"yellow"} />
                </Center>
              )}
              data={lsKomentar}
              setData={setLsKomentar}
              moreData={handleMoreDataKomentar}
            >
              {(item) => (
                <ComponentForum_KomentarView
                  data={item}
                  setKomentar={setLsKomentar}
                  postingId={data?.id as any}
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
