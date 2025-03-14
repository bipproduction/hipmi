"use client";

import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { clientLogger } from "@/util/clientLogger";
import { Box, Stack, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  apiGetDataGroupById
} from "../../_lib/api_collaboration";
import ComponentColab_DetailData from "../../component/detail/detail_data";
import {
  Collaboration_SkeletonDetailInfoGroup
} from "../../component/skeleton_view";
import {
  MODEL_COLLABORATION_ROOM_CHAT
} from "../../model/interface";
import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, { UI_NewHeader, UI_NewChildren } from "@/app_modules/_global/ui/V2_layout_tamplate";

export default function Colab_DetailInfoGrup() {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Info Grup" />}
      >
        <InfoGroup />
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Info Grup" />
        </UI_NewHeader>
        <UI_NewChildren>
          <InfoGroup />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}

function InfoGroup() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_COLLABORATION_ROOM_CHAT | null>(null);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetDataGroupById({
        id: params.id,
        kategori: "info_group",
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get data info group", error);
    }
  }

  if (_.isNull(data)) {
    return (
      <>
        <Collaboration_SkeletonDetailInfoGroup />
      </>
    );
  }

  return (
    <>
      <Stack>
        <ComponentGlobal_CardStyles marginBottom={"0px"}>
          <ComponentColab_DetailData data={data?.ProjectCollaboration} />
        </ComponentGlobal_CardStyles>
        <ComponentGlobal_CardStyles>
          <Stack>
            <Title order={6}>Anggota Grup</Title>
            {data?.ProjectCollaboration_AnggotaRoomChat.map((e, i) => (
              <Box mb={"sm"} key={i}>
                <ComponentGlobal_AvatarAndUsername
                  profile={e.User.Profile as any}
                />
              </Box>
            ))}
          </Stack>
        </ComponentGlobal_CardStyles>
      </Stack>
    </>
  );
}
