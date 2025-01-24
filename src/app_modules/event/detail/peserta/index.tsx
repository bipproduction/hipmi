"use client";

import { Stack, Loader, Center } from "@mantine/core";
import ComponentEvent_ListPeserta from "../../component/detail/list_peserta";
import { MODEL_EVENT_PESERTA } from "../../_lib/interface";
import { useParams } from "next/navigation";
import ComponentEvent_ListPesertaNew from "../../component/detail/list_peserta_new";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetEventPesertaById } from "../../_lib/api_event";
import { useState } from "react";
import { clientLogger } from "@/util/clientLogger";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { ScrollOnly } from "next-scroll-loader";
import ComponentEvent_AvatarAndUsername from "../../component/detail/comp_avatar_and_username_event";
import { ComponentGlobal_AvatarAndUsername } from "@/app_modules/_global/component";

// function Event_DaftarPeserta({ totalPeserta, eventId, isNewPeserta }: {
//   totalPeserta?: number;
//   eventId?: string;
//   isNewPeserta?: boolean | null;
// }) {
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
          moreData={async () => {
            try {
              const respone = await apiGetEventPesertaById({
                id: params.id,
                page: `${activePage + 1}`,
              });

              if (respone) {
                setActivePage((val) => val + 1);

                return respone.data;
              }
            } catch (error) {
              clientLogger.error("Error get data peserta:", error);
            }
          }}
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

        {/* <ComponentEvent_ListPeserta eventId={params.id} total={totalPeserta as any} isNewPeserta={isNewPeserta} /> */}
      </Stack>
    </>
  );
}

export default Event_DaftarPeserta;
