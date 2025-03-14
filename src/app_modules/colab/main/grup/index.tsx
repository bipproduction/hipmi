"use client";

import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Box, Center, Loader, Skeleton, Stack } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { ComponentColab_CardGrup } from "../../component/card_view/crad_grup";
import colab_getListRoomChatByAuthorId from "../../fun/get/room_chat/get_list_room_by_author_id";
import { MODEL_COLLABORATION_ANGGOTA_ROOM_CHAT } from "../../model/interface";
import { clientLogger } from "@/util/clientLogger";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetAllCollaboration } from "../../_lib/api_collaboration";
import {
  Collaboration_SkeletonBeranda,
  Collaboration_SkeletonGrup,
} from "../../component/skeleton_view";
import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";

export default function Colab_GrupDiskus() {
  const [data, setData] = useState<
    MODEL_COLLABORATION_ANGGOTA_ROOM_CHAT[] | null
  >(null);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetAllCollaboration({
        kategori: "grup",
        page: `${activePage}`,
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get grup", error);
    }
  }

  if (_.isNull(data)) {
    return <Collaboration_SkeletonGrup />;
  }

  return (
    <>
      <Box>
        {_.isEmpty(data) ? (
          <ComponentGlobal_IsEmptyData />
        ) : (
          <Box>
            <ScrollOnly
              height="85vh"
              renderLoading={() => (
                <Center mt={"lg"}>
                  <Loader color={"yellow"} />
                </Center>
              )}
              data={data}
              setData={setData as any}
              moreData={async () => {
                const respone = await apiGetAllCollaboration({
                  kategori: "grup",
                  page: `${activePage + 1}`,
                });

                setActivePage((val) => val + 1);

                return respone.data;
              }}
            >
              {(item) => <ComponentColab_CardGrup data={item} />}
            </ScrollOnly>
          </Box>
        )}
      </Box>
    </>
  );
}
