"use client";

import { RouterColab } from "@/lib/router_hipmi/router_colab";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { clientLogger } from "@/util/clientLogger";
import { Box, Center, Loader } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { apiGetAllCollaboration } from "../../_lib/api_collaboration";
import { ComponentColab_CardProyekSaya } from "../../component/card_view/card_proyek_saya";
import { Collaboration_SkeletonBeranda } from "../../component/skeleton_view";
import { MODEL_COLLABORATION } from "../../model/interface";

export default function Colab_ProyekSaya() {
  const [data, setData] = useState<MODEL_COLLABORATION[] | null>(null);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetAllCollaboration({
        kategori: "proyeksaya",
        page: `${activePage}`,
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get proyeksaya", error);
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
        // --- Main component --- //
        <Box>
          <ScrollOnly
            height="75vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <Loader color={"yellow"} />
              </Center>
            )}
            data={data}
            setData={setData as any}
            moreData={async () => {
              const respone = await apiGetAllCollaboration({
                kategori: "proyeksaya",
                page: `${activePage + 1}`,
              });

              setActivePage((val) => val + 1);

              return respone.data;
            }}
          >
            {(item) => (
              <ComponentColab_CardProyekSaya
                data={item}
                path={RouterColab.detail_proyek_saya}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
