"use client";
import { useParams } from "next/navigation";
import ComponentEvent_ListSponsor from "../../component/detail/list_sponsor";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetEventSponsorListById } from "../../_lib/api_event";
import { IEventSponsor, MODEL_EVENT } from "../../_lib/interface";
import { Component, useState } from "react";
import { clientLogger } from "@/util/clientLogger";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { ScrollOnly } from "next-scroll-loader";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { ComponentDonasi_CardInvoice } from "@/app_modules/donasi/component/card_view/card_invoice";
import { donasi_funGetAllInvoiceByAuthorId } from "@/app_modules/donasi/fun/get/get_all_invoice_by_author_id";
import { Box, Center, Stack } from "@mantine/core";
import _ from "lodash";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";

function Event_DaftarSponsor() {
  const params = useParams<{ id: string }>();
  const eventId = params.id;
  const [data, setData] = useState<IEventSponsor[] | null>(null);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetEventSponsorListById({
        id: eventId,
        page: `${activePage}`,
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get data sponsor", error);
    }
  }

  if (!data) {
    return (
      <>
        <Stack spacing={0}>
          <CustomSkeleton height={100} width={"100%"} />;
          <CustomSkeleton height={100} width={"100%"} />;
        </Stack>
      </>
    );
  }

  return (
    <>
      {/* <ComponentEvent_ListSponsor /> */}
      <Box>
        {_.isEmpty(data) ? (
          <ComponentGlobal_IsEmptyData />
        ) : (
          <ScrollOnly
            height="82vh"
            renderLoading={() => (
              <Center>
                <ComponentGlobal_Loader size={25} />
              </Center>
            )}
            data={data}
            setData={setData as any}
            moreData={async () => {
              try {
                const respone = await apiGetEventSponsorListById({
                  id: eventId,
                  page: `${activePage + 1}`,
                });

                if (respone) {
                  setActivePage((val) => val + 1);
                  return respone.data;
                }
              } catch (error) {
                clientLogger.error("Error get data sponsor", error);
              }
            }}
          >
            {(item) => (
              <ComponentEvent_ListSponsor
                profile={item?.Author?.Profile}
                data={item}
              />
            )}
          </ScrollOnly>
        )}
      </Box>
    </>
  );
}

export default Event_DaftarSponsor;
