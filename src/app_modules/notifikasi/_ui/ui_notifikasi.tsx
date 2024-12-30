"use client";

import { API_RouteNotifikasi } from "@/app/lib/api_user_router/route_api_notifikasi";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { clientLogger } from "@/util/clientLogger";
import { Box, Center } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import {
  ComponentNotifiaksi_CardView,
  Notifikasi_ComponentSkeletonView,
} from "../component";
import { gs_notifikasi_kategori_app } from "../lib";
import { apiGetAllNotifikasiByCategory } from "../lib/api_notifikasi";
import { MODEL_NOTIFIKASI } from "../model/interface";

export default function Notifikasi_UiMain() {
  const [data, setData] = useState<MODEL_NOTIFIKASI[] | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [categoryPage, setCategoryPage] = useAtom(gs_notifikasi_kategori_app);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respon = await apiGetAllNotifikasiByCategory({
        category: categoryPage as any,
        page: 1,
      });

      if (respon.success) {
        setData(respon.data);
      }
    } catch (error) {
      clientLogger.error("Error get notifikasi", error);
    }
  }

  return (
    <>
      <Box>
        {_.isNull(data) ? (
          <Notifikasi_ComponentSkeletonView />
        ) : _.isEmpty(data) ? (
          <ComponentGlobal_IsEmptyData text="Tidak ada pemberitahuan" />
        ) : (
          <ScrollOnly
            height="85vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <ComponentGlobal_Loader />
              </Center>
            )}
            data={data}
            setData={setData as any}
            moreData={async () => {
              try {
                const respon = await apiGetAllNotifikasiByCategory({
                  category: categoryPage as any,
                  page: activePage + 1,
                });

                if (respon.success) {
                  setActivePage((val) => val + 1);
                  return respon.data;
                }
              } catch (error) {
                clientLogger.error("Error get notifikasi", error);
              }
            }}
          >
            {(item) => (
              <ComponentNotifiaksi_CardView
                data={item}
                onLoadData={setData}
                categoryPage={categoryPage as any}
              />
            )}
          </ScrollOnly>
        )}
      </Box>
    </>
  );
}
