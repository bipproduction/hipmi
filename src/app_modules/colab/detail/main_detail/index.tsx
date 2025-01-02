"use client";

import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
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

export default function Colab_MainDetail({
  userLoginId,
}: {
  userLoginId?: string;
}) {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_COLLABORATION | null>(null);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetOneCollaborationById({
        id: params.id,
        kategori: "detail",
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get all collaboration", error);
    }
  }

  return (
    <>
      <Stack>
        {_.isNull(data) ? (
          <Collaboration_SkeletonDetail />
        ) : (
          <ComponentGlobal_CardStyles>
            <Stack>
              <ComponentColab_AuthorNameOnHeader
                tglPublish={data.createdAt}
                profile={data?.Author?.Profile as any}
              />
              <ComponentColab_DetailData data={data as any} />
            </Stack>
          </ComponentGlobal_CardStyles>
        )}

        <ComponentColab_DetailListPartisipasiUser
          userLoginId={userLoginId}
          authorId={data?.Author.id}
        />
      </Stack>
    </>
  );
}
