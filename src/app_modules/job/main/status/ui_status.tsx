"use client";

import { MainColor } from "@/app_modules/_global/color";
import { globalStatusApp } from "@/app_modules/_global/lib";
import { RouterJob } from "@/lib/router_hipmi/router_job";
import { Stack, Tabs } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import Job_NewViewStatus from "./view_status";

export default function Job_UiStatus() {
  const router = useRouter();
  const param = useParams<{ id: string }>();
  const statusId = param.id;

  // const [changeStatus, setChangeStatus] = useState(statusId);
  // const [nameStatus, setNameStatus] = useState<string | undefined>("");

  // async function onChangeStatus({ statusId }: { statusId: string }) {
  //   router.replace(RouterJob.status({ id: statusId }));
  //   const cek = globalStatusApp.find((e) => e.id === statusId);

  //   setNameStatus(cek?.name);
  // }

  return (
    <>
      <Tabs
        color="yellow"
        variant="pills"
        radius={"xl"}
        defaultValue={statusId}
        value={statusId}
        onTabChange={(val: any) => {
          router.replace(RouterJob.status({ id: val }));
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
            {globalStatusApp.map((e) => (
              <Tabs.Tab
                key={e.id}
                value={e.id}
                fw={"bold"}
                color={statusId === e.id ? "black" : MainColor.darkblue}
                style={{
                  transition: "0.5s",
                  backgroundColor:
                    statusId === e.id ? MainColor.yellow : "white",
                  color: MainColor.darkblue,
                }}
              >
                {e.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Job_NewViewStatus />
        </Stack>
      </Tabs>
    </>
  );
}
