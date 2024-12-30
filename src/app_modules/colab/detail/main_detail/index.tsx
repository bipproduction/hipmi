"use client";

import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { Center, Stack, Loader } from "@mantine/core";
import ComponentColab_DetailData from "../../component/detail/detail_data";
import ComponentColab_DetailListPartisipasiUser from "../../component/detail/list_partisipasi_user";
import ComponentColab_AuthorNameOnHeader from "../../component/header_author_name";
import { MODEL_COLLABORATION } from "../../model/interface";
import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { clientLogger } from "@/util/clientLogger";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import {
  apiGetAllCollaboration,
  apiGetOneCollaborationById,
} from "../../_lib/api_collaboration";
import { useParams } from "next/navigation";
import _ from "lodash";

export default function Colab_MainDetail({
  dataColab,
  userLoginId,
  listPartisipan,
  cekPartisipan,
}: {
  dataColab?: MODEL_COLLABORATION;
  userLoginId?: string;
  listPartisipan?: any[];
  cekPartisipan: boolean;
}) {
  const params = useParams<{ id: string }>();

  const [data, setData] = useState<MODEL_COLLABORATION | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [isNewPost, setIsNewPost] = useState(false);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetOneCollaborationById({
        id: params.id,
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get all collaboration", error);
    }
  }

  if (_.isNull(data)) {
    return (
      <>
        <Center>
          <Loader />
        </Center>
      </>
    );
  }

  return (
    <>
      <Stack>
        <ComponentGlobal_CardStyles>
          <Stack>
            <ComponentColab_AuthorNameOnHeader
              tglPublish={new Date()}
              profile={data?.Author?.Profile as any}
            />
            <ComponentColab_DetailData data={data as any} />
          </Stack>
        </ComponentGlobal_CardStyles>

          <ComponentColab_DetailListPartisipasiUser
            listPartisipan={listPartisipan}
            userLoginId={userLoginId}
            authorId={data?.Author.id}
            colabId={data?.id}
            cekPartisipan={cekPartisipan}
          />
        {/* <ComponentGlobal_CardStyles>
        </ComponentGlobal_CardStyles> */}
      </Stack>
    </>
  );
}
