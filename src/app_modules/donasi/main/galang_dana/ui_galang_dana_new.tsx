"use client";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { AccentColor, MainColor, } from "@/app_modules/_global/color/color_pallet";
import { MODEL_NEW_DEFAULT_MASTER } from "@/app_modules/model_global/interface";
import { Stack, Tabs } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";

export default function GalangDanaDonasiNew({listStatus,}: {listStatus: MODEL_NEW_DEFAULT_MASTER[]; }) {
  const router = useRouter();
  const param = useParams<{ id: string }>();

  async function onChangeStatus({ statusId }: { statusId: string }) {
    router.replace(RouterDonasi.status_galang_dana({ id: statusId }));
  }

  return (
    <>
      <Tabs
        color="orange"
        variant="pills"
        radius="xl"
        value={param.id}
        onTabChange={(val: any) => {
          onChangeStatus({ statusId: val });
        }}
        styles={{
          tabsList: {
            backgroundColor: MainColor.darkblue,
            position: "sticky",
            top: 0,
            zIndex: 99,
          },
        }}
      >
        <Stack>
          <Tabs.List grow>
            {listStatus.map((e, i) => (
              <Tabs.Tab
                key={e.id}
                value={e.id}
                fw={"bold"}
                c={"black"}
                style={{
                  transition: "0.5s",
                  backgroundColor:
                    param.id === e.id ? MainColor.yellow : "white",
                  border:
                    param.id === e.id
                      ? `1px solid ${AccentColor.yellow}`
                      : `1px solid white`,
                }}
              >
                {e.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {/* {param.id == "1" && <PostingPublishDonasi listPublish={dataStatus} />}

          {param.id == "2" && <PostingReviewDonasi listReview={dataStatus} />}

          {param.id == "3" && <PostingDraftDonasi listDraft={dataStatus} />}

          {param.id == "4" && <PostingRejectDonasi listReject={dataStatus} />} */}
        </Stack>
      </Tabs>
    </>
  );
}
