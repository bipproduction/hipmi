"use client";

import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { apiGetOneCollaborationById } from "@/app_modules/colab/_lib/api_collaboration";
import ComponentColab_DetailData from "@/app_modules/colab/component/detail/detail_data";
import ComponentColab_DetailListPartisipasiUser from "@/app_modules/colab/component/detail/list_partisipasi_user";
import ComponentColab_AuthorNameOnHeader from "@/app_modules/colab/component/header_author_name";
import { Collaboration_SkeletonDetail } from "@/app_modules/colab/component/skeleton_view";
import { MODEL_COLLABORATION } from "@/app_modules/colab/model/interface";
import { clientLogger } from "@/util/clientLogger";
import { Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Colab_DetailPartisipasiProyek() {
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
      {_.isNull(data) ? (
        <Collaboration_SkeletonDetail />
      ) : (
        <Stack>
          <ComponentGlobal_CardStyles>
            <Stack>
              <ComponentColab_AuthorNameOnHeader
                profile={data.Author.Profile}
              />
              <ComponentColab_DetailData data={data} />
            </Stack>
          </ComponentGlobal_CardStyles>

          <ComponentColab_DetailListPartisipasiUser />
        </Stack>
      )}
    </>
  );
}
