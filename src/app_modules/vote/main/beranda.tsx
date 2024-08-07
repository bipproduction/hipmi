"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Box, Center, Loader } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import ComponentVote_CardViewPublish from "../component/card_view_publish";
import { vote_getAllListPublish } from "../fun/get/get_all_list_publish";
import { MODEL_VOTING } from "../model/interface";

export default function Vote_Beranda({
  dataVote,
}: {
  dataVote: MODEL_VOTING[];
}) {
  const [data, setData] = useState(dataVote);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    onLoad({
      setData(val) {
        setData(val);
      },
    });
  }, [setData]);

  async function onLoad({ setData }: { setData: (val: any) => void }) {
    const loadData = await vote_getAllListPublish({ page: 1 });
    setData(loadData);
  }

  return (
    <Box>
      <ComponentGlobal_CreateButton path={RouterVote.create} />

      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        <Box>
          <ScrollOnly
            height="82vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <Loader color={"yellow"} />
              </Center>
            )}
            data={data}
            setData={setData}
            moreData={async () => {
              const loadData = await vote_getAllListPublish({
                page: activePage + 1,
              });

              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentVote_CardViewPublish
                data={item}
                path={RouterVote.main_detail}
                authorName={true}
              />
            )}
          </ScrollOnly>
        </Box>
        // --- Main component --- //
      )}
    </Box>
  );
}
