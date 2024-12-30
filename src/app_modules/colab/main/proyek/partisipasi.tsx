"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Box, Center, Loader } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { ComponentColab_CardSemuaPartisipan } from "../../component/card_view/card_semua_partisipan";
import colab_getListPartisipasiProyekByAuthorId from "../../fun/get/pasrtisipan/get_list_partisipasi_proyek_by_author_id";
import { MODEL_COLLABORATION_PARTISIPASI } from "../../model/interface";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetAllCollaboration } from "../../_lib/api_collaboration";
import { clientLogger } from "@/util/clientLogger";
import { Collaboration_SkeletonBeranda } from "../../component/skeleton_view";

export default function Colab_PartisipasiProyek() {
  const [data, setData] = useState<MODEL_COLLABORATION_PARTISIPASI[] | null>(
    null
  );
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetAllCollaboration({
        kategori: "partisipasi",
        page: `${activePage}`,
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get partisipasi", error);
    }
  }

  if (_.isNull(data)) {
    return <Collaboration_SkeletonBeranda />;
  }

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        <Box>
          <ScrollOnly
            height="73vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <Loader color={"yellow"} />
              </Center>
            )}
            data={data}
            setData={setData as any}
            moreData={async () => {
              const respone = await apiGetAllCollaboration({
                kategori: "partisipasi",
                page: `${activePage + 1}`,
              });
              setActivePage((val) => val + 1);

              return respone.data;
            }}
          >
            {(item) => (
              <ComponentColab_CardSemuaPartisipan
                data={item}
                path={RouterColab.detail_partisipasi_proyek}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
