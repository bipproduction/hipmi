"use client";

import {
  NEW_RouterInvestasi,
  RouterInvestasi_OLD,
} from "@/lib/router_hipmi/router_investasi";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import {
  BackgroundImage,
  Box,
  Center,
  Container,
  Group,
  Modal,
  Paper,
  rem,
  Text,
  Title,
} from "@mantine/core";
import { IconChevronRight, IconFileTypePdf } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { MODEL_INVESTASI } from "../_lib/interface";
import { RouterAdminInvestasi } from "@/lib/router_admin/router_admin_investasi";
import { RouterAdminInvestasi_OLD } from "@/lib/router_hipmi/router_admin";
import { useRouter } from "next/navigation";
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import "@cyntler/react-doc-viewer/dist/index.css";

export default function DetailPropektus({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_INVESTASI;
}) {
  const [data, setData] = useState(dataInvestasi);
  const router = useRouter();

  return (
    <>
      <Paper
        style={{
          padding: "15px",
          backgroundColor: AccentColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          borderRadius: "10px",
          color: "white",
          cursor: "pointer",
        }}
        onClick={() =>
          router.push(
            NEW_RouterInvestasi.OLD_file_view_prospektus +
              `${data.ProspektusInvestasi.id}`,
            { scroll: false }
          )
        }
      >
        <Group position="apart">
          <Text w={"80%"} lineClamp={1}>
            Prospektus_{data?.title}
          </Text>
          <Center>
            <IconFileTypePdf style={{ color: MainColor.yellow }} />
          </Center>
        </Group>
      </Paper>
    </>
  );
}
