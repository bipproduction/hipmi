"use client";

import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { clientLogger } from "@/util/clientLogger";
import { Center, Loader, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { ScrollOnly } from "next-scroll-loader";
import { useParams } from "next/navigation";
import { useState } from "react";
import { apiGetEventPesertaById } from "../../_lib/api_event";
import { MODEL_EVENT_PESERTA } from "../../_lib/interface";
import ComponentEvent_AvatarAndUsername from "../../component/detail/comp_avatar_and_username_event";
import _ from "lodash";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";

function Event_DaftarPeserta() {
  const params = useParams<{ id: string }>();

  const [data, setData] = useState<MODEL_EVENT_PESERTA[] | null>(null);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    onLoadDataPeserta();
  }, []);

  async function onLoadDataPeserta() {
    try {
      const respone = await apiGetEventPesertaById({
        id: params.id,
        page: `${activePage}`,
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get data peserta:", error);
    }
  }

  const handleMoreData = async () => {
    try {
      const nextPage = activePage + 1;

      const response = await apiGetEventPesertaById({
        id: params.id,
        page: `${nextPage}`,
      });

      if (response) {
        setActivePage(nextPage);

        return response.data;
      }
    } catch (error) {
      clientLogger.error("Error fetching more data:", error);
    }
  };

  if (!data) {
    return (
      <>
        <Stack>
          <CustomSkeleton height={70} width={"100%"} />
          <CustomSkeleton height={70} width={"100%"} />
        </Stack>
      </>
    );
  }

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        <Stack>
          <ScrollOnly
            height="90vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <Loader color={"yellow"} />
              </Center>
            )}
            data={data}
            setData={setData as any}
            moreData={handleMoreData}
          >
            {(item) => (
              <ComponentEvent_AvatarAndUsername
                profile={item?.User?.Profile as any}
                sizeAvatar={30}
                fontSize={"sm"}
                tanggalMulai={item?.Event?.tanggal}
                tanggalSelesai={item?.Event?.tanggalSelesai}
                isPresent={item?.isPresent}
              />
            )}
          </ScrollOnly>
        </Stack>
      )}
    </>
  );
}

export default Event_DaftarPeserta;
