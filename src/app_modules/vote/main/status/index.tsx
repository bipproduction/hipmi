"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { Box, Stack, Tabs } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import Vote_StatusDraft from "./draft";
import Vote_StatusPublish from "./publish";
import Vote_StatusReject from "./reject";
import Vote_StatusReview from "./review";

export default function Vote_Status() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const status = [
    {
      id: "1",
      name: "Publish",
    },
    {
      id: "2",
      name: "Review",
    },
    {
      id: "3",
      name: "Draft",
    },
    {
      id: "4",
      name: "Reject",
    },
  ];

  return (
    <>
      <Tabs
        mt={1}
        variant="pills"
        radius={"xl"}
        value={params.id}
        onTabChange={(val: any) => {
          router.replace(RouterVote.status({ id: val }));
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
            {status.map((e) => (
              <Tabs.Tab
                w={"20%"}
                key={e.id}
                value={e.id}
                fw={"bold"}
                
                style={{
                  transition: "0.5s",
                  color: params.id === e.id ? MainColor.darkblue : MainColor.black,
                  backgroundColor:
                    params.id === e.id ? MainColor.yellow : MainColor.white,
                  border:
                    params.id === e.id
                      ? `1px solid ${AccentColor.yellow}`
                      : `1px solid ${MainColor.white}`,
                }}
              >
                {e.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Box>
            {params.id === "1" && <Vote_StatusPublish />}
            {params.id === "2" && <Vote_StatusReview />}
            {params.id === "3" && <Vote_StatusDraft />}
            {params.id === "4" && <Vote_StatusReject />}
          </Box>
        </Stack>
      </Tabs>
    </>
  );
}
