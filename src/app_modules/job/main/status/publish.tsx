"use client";

import { RouterJob } from "@/lib/router_hipmi/router_job";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Center, Loader } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import ComponentJob_CardStatus from "../../component/card/card_view";
import job_getAllStatusPublish from "../../fun/get/status/get_list_publish";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetJobByStatus } from "../../lib/api_fetch_job";

export default function Job_Publish({ nameStatus }: { nameStatus: string }) {
  const [data, setData] = useState<any[] | null>(null);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      // const response = await apiGetJobByStatus({ status: nameStatus });
      // if (response.success) {
      //   console.log(response.data);
      // }
    } catch (error) {}
  };

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        "Publish"
        // <ScrollOnly
        //   height="75vh"
        //   renderLoading={() => (
        //     <Center mt={"lg"}>
        //       <Loader color={"yellow"} />
        //     </Center>
        //   )}
        //   data={data}
        //   setData={setData}
        //   moreData={async () => {
        //     const loadData = await job_getAllStatusPublish({
        //       page: activePage + 1,
        //     });

        //     setActivePage((val) => val + 1);

        //     return loadData;
        //   }}
        // >
        //   {(item) => (
        //     <ComponentJob_CardStatus
        //       data={item}
        //       path={RouterJob.detail_publish}
        //     />
        //   )}
        // </ScrollOnly>
      )}
    </>
  );
}
