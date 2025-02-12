"use client";

import { RouterJob } from "@/lib/router_hipmi/router_job";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { MODEL_NEW_DEFAULT_MASTER } from "@/app_modules/model_global/interface";
import { Stack, Tabs } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Job_Draft from "./draft";
import Job_Publish from "./publish";
import Job_Reject from "./reject";
import Job_Review from "./review";

export default function Job_ViewStatus({
  statusId,
  dataJob,
  listStatus,
}: {
  statusId: string;
  dataJob: any[];
  listStatus: MODEL_NEW_DEFAULT_MASTER[];
}) {
  const router = useRouter();
  const [changeStatus, setChangeStatus] = useState(statusId);

  // const listTabs = [
  //   {
  //     id: 1,
  //     path: <Job_Publish listPublish={listPublish} />,
  //     value: "Publish",
  //   },
  //   {
  //     id: 2,
  //     path: <Job_Review listReview={listReview} />,
  //     value: "Review",
  //   },
  //   {
  //     id: 3,
  //     path: <Job_Draft listDraft={listDraft} />,
  //     value: "Draft",
  //   },
  //   {
  //     id: 4,
  //     path: <Job_Reject listReject={listReject} />,
  //     value: "Reject",
  //   },
  // ];

  async function onChangeStatus({ statusId }: { statusId: string }) {
    router.replace(RouterJob.status({ id: statusId }));
  }

  return (
    <>
      <Tabs
        mt={1}
        color="yellow"
        variant="pills"
        radius={"xl"}
        value={changeStatus}
        onTabChange={(val: any) => {
          setChangeStatus(val);
          onChangeStatus({ statusId: val });
        }}
        styles={{
          tabsList: {
            backgroundColor: MainColor.darkblue,
            position: "sticky",
            top: 0,
            zIndex: 99,
          },
          panel: {
            paddingTop: 10,
          },
        }}
      >
        <Stack>
          <Tabs.List grow>
            {listStatus.map((e) => (
              <Tabs.Tab
                key={e.id}
                value={e.id}
                fw={"bold"}
                color={statusId === e.id ? "black" : "white"}
                style={{
                  transition: "0.5s",
                  backgroundColor:
                    statusId === e.id ? MainColor.yellow : "white",
                  border:
                    statusId === e.id
                      ? `1px solid ${AccentColor.yellow}`
                      : `1px solid white`,
                }}
              >
                {e.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {statusId === "1" && <Job_Publish listPublish={dataJob} />}
          {statusId === "2" && <Job_Review listReview={dataJob} />}
          {statusId === "3" && <Job_Draft listDraft={dataJob} />}
          {statusId === "4" && <Job_Reject listReject={dataJob} />}
        </Stack>
      </Tabs>
    </>
  );
}
