"use client";

import { useRouter } from "next/navigation";
import { MODEL_DONASI } from "../../model/interface";
import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import {
  Stack,
  Title,
  Paper,
  Group,
  ActionIcon,
  Text,
  Box,
} from "@mantine/core";
import { IconCircleChevronRight } from "@tabler/icons-react";
import moment from "moment";
import { useState } from "react";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Comp_V3_SetInnerHTMLWithStiker } from "@/app_modules/_global/component/new/comp_V3_set_html_with_stiker";
import { funReplaceHtml } from "@/app_modules/_global/fun/fun_replace_html";

export default function ComponentDonasi_CeritaPenggalangMain({
  donasi,
}: {
  donasi: MODEL_DONASI;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  return (
    <>
      <Stack
        spacing={"xs"}
        style={{
          color: MainColor.white,
        }}
      >
        <Title order={4}>Cerita Penggalang Dana</Title>
        <Paper
          style={{
            padding: "15px",
            backgroundColor: AccentColor.darkblue,
            border: `2px solid ${AccentColor.blue}`,
            borderRadius: "10px",
            color: MainColor.white,
          }}
        >
          <Stack>
            <Group position="apart">
              <Text>
                {new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(
                  donasi?.createdAt
                )}
              </Text>
              <ActionIcon
                variant="transparent"
                onClick={() => {
                  setLoading(true);
                  router.push(RouterDonasi.cerita_penggalang + `${donasi?.id}`);
                }}
              >
                {isLoading ? (
                  <ComponentGlobal_Loader />
                ) : (
                  <IconCircleChevronRight
                    style={{
                      color: MainColor.yellow,
                    }}
                  />
                )}
              </ActionIcon>
            </Group>
            <Text lineClamp={4}>
              {funReplaceHtml({ html: donasi?.CeritaDonasi.cerita })}
            </Text>
            {/* <Text c={"blue"}>Baca selengkapnya</Text> */}
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
