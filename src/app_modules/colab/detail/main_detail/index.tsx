"use client";

import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { clientLogger } from "@/util/clientLogger";
import { Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useParams } from "next/navigation";
import { useState } from "react";
import { apiGetOneCollaborationById } from "../../_lib/api_collaboration";
import ComponentColab_DetailData from "../../component/detail/detail_data";
import ComponentColab_DetailListPartisipasiUser from "../../component/detail/list_partisipasi_user";
import ComponentColab_AuthorNameOnHeader from "../../component/header_author_name";
import { Collaboration_SkeletonDetail } from "../../component/skeleton_view";
import { MODEL_COLLABORATION } from "../../model/interface";
import { apiNewGetUserIdByToken } from "@/app_modules/_global/lib/api_fetch_global";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function Colab_MainDetail() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_COLLABORATION | null>(null);
  const [userLoginId, setUserLoginId] = useState<string | null>();

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const response = await apiNewGetUserIdByToken();

      if (response.success) {
        setUserLoginId(response.userId);
        const respone = await apiGetOneCollaborationById({
          id: params.id,
          kategori: "detail",
        });

        if (respone) {
          setData(respone.data);
        }
      } else {
        setUserLoginId(null);
      }
    } catch (error) {
      clientLogger.error("Error get all collaboration", error);
    }
  }

  if (userLoginId === undefined || data === null)
    return <Collaboration_SkeletonDetail />;

  return (
    <>
      {userLoginId === null ? (
        <ComponentGlobal_BoxInformation informasi="Anda tidak memiliki akses untuk melihat detail proyek ini" />
      ) : (
        <Stack>
          <ComponentGlobal_CardStyles>
            <Stack>
              <ComponentColab_AuthorNameOnHeader
                tglPublish={data.createdAt}
                profile={data?.Author?.Profile as any}
              />
              <ComponentColab_DetailData data={data as any} />
            </Stack>
          </ComponentGlobal_CardStyles>

          <ComponentColab_DetailListPartisipasiUser
            userLoginId={userLoginId as string}
            authorId={data?.Author.id}
          />
        </Stack>
      )}
    </>
  );
}
