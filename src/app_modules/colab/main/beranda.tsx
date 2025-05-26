"use client";

import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { apiNewGetUserIdByToken } from "@/app_modules/_global/lib/api_fetch_global";
import { RouterColab } from "@/lib/router_hipmi/router_colab";
import { clientLogger } from "@/util/clientLogger";
import mqtt_client from "@/util/mqtt_client";
import { Box, Center, Loader } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { apiGetAllCollaboration } from "../_lib/api_collaboration";
import { ComponentColab_ButtonUpdateBeranda } from "../component/button/button_update_beranda";
import { ComponentColab_CardBeranda } from "../component/card_view/card_beranda";
import { Collaboration_SkeletonBeranda } from "../component/skeleton_view";
import { MODEL_COLLABORATION } from "../model/interface";

export default function Colab_Beranda() {
  const [data, setData] = useState<MODEL_COLLABORATION[] | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [isNewPost, setIsNewPost] = useState(false);
  const [userLoginId, setUserLoginId] = useState<string | null>(null);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetAllCollaboration({
        kategori: "beranda",
        page: "1",
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get all collaboration", error);
    }
  }

  useShallowEffect(() => {
    handleGetUserLoginId();
  }, []);

  async function handleGetUserLoginId() {
    try {
      const response = await apiNewGetUserIdByToken();
      if (response.success) {
        setUserLoginId(response.userId);
      } else {
        setUserLoginId(null);
      }
    } catch (error) {
      setUserLoginId(null);
    }
  }

  useShallowEffect(() => {
    mqtt_client.subscribe("Colab_create");

    mqtt_client.on("message", (topic, message) => {
      if (topic === "Colab_create") {
        setIsNewPost(JSON.parse(message.toString()).isNewPost);
      }
    });
  }, []);

  if (_.isNull(data)) {
    return <Collaboration_SkeletonBeranda />;
  }

  return (
    <>
      <Box>
        {isNewPost && (
          <ComponentColab_ButtonUpdateBeranda
            onLoad={(val) => {
              setData(val);
            }}
            setIsNewPost={setIsNewPost}
          />
        )}

        <ComponentGlobal_CreateButton path={RouterColab.create} />

        {_.isEmpty(data) ? (
          <ComponentGlobal_IsEmptyData />
        ) : (
          <Box>
            <ScrollOnly
              height="80vh"
              renderLoading={() => (
                <Center mt={"lg"}>
                  <Loader color={"yellow"} />
                </Center>
              )}
              data={data}
              setData={setData as any}
              moreData={async () => {
                const respone = await apiGetAllCollaboration({
                  kategori: "beranda",
                  page: `${activePage + 1}`,
                });

                setActivePage((val) => val + 1);

                return respone.data;
              }}
            >
              {(item) => (
                <ComponentColab_CardBeranda
                  data={item}
                  userLoginId={userLoginId as string}
                />
              )}
            </ScrollOnly>
          </Box>
        )}
      </Box>
    </>
  );
}
