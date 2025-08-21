import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import mqtt_client from "@/util/mqtt_client";
import { Box, Center } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { Investasi_ComponentButtonUpdateBeranda } from "../../_component";
import { Investasi_ComponentCardBeranda } from "../../_component/main/comp_card_beranda";
import { investasi_funGetAllPublish } from "../../fun/get_all_investasi";

export function Investasi_ViewBeranda({
  dataInvestasi,
}: {
  dataInvestasi: any[];
}) {
  const [data, setData] = useState(dataInvestasi);
  const [activePage, setActivePage] = useState(1);
  const [isNewPost, setIsNewPost] = useState(false);

  useShallowEffect(() => {
    mqtt_client.subscribe("Beranda_Investasi");

    mqtt_client.on("message", (topic, message) => {
      const newPost = JSON.parse(message.toString());
      setIsNewPost(newPost);
    });
  }, []);

  return (
    <>
      {isNewPost && (
        <Investasi_ComponentButtonUpdateBeranda
          onLoadData={(val) => {
            setData(val.data);
            setIsNewPost(val.isNewPost);
          }}
        />
      )}

      <Box>
        <ComponentGlobal_CreateButton path={RouterInvestasi_OLD.create} />
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
            setData={setData}
            moreData={async () => {
              const loadData = await investasi_funGetAllPublish({
                page: activePage + 1,
              });
              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => <Investasi_ComponentCardBeranda data={item as any} />}
          </ScrollOnly>
        )}
      </Box>
    </>
  );
}
