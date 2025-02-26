"use client";

import { RouterJob } from "@/lib/router_hipmi/router_job";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Center, Loader } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import ComponentJob_CardStatus from "../../component/card/card_view";
import job_getAllStatusDraft from "../../fun/get/status/get_list_draft";

export default function Job_Draft({ listDraft }: { listDraft: any }) {
  const [data, setData] = useState(listDraft);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      <>
        {_.isEmpty(data) ? (
          <ComponentGlobal_IsEmptyData />
        ) : (
          // --- Main component --- //
          <ScrollOnly
            height="75vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <Loader color={"yellow"} />
              </Center>
            )}
            data={data}
            setData={setData}
            moreData={async () => {
              const loadData = await job_getAllStatusDraft({
                page: activePage + 1,
              });

              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentJob_CardStatus
                data={item}
                path={RouterJob.detail_draft}
              />
            )}
          </ScrollOnly>
        )}
      </>
    </>
  );
}
