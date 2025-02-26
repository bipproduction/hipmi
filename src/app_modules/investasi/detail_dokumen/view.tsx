"use client";

import { Paper, Grid, Center, Text, Title } from "@mantine/core";
import { IconChevronRight, IconFileTypePdf } from "@tabler/icons-react";
import Link from "next/link";
import { MODEL_INVESTASI } from "../_lib/interface";
import { useState } from "react";
import _ from "lodash";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { useRouter } from "next/navigation";
import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";

export default function DetailDokumenInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_INVESTASI;
}) {
  const router = useRouter();
  const [dokumen, setDokumen] = useState(dataInvestasi);

  return (
    <>
      {!_.isEmpty(dokumen.DokumenInvestasi) ? (
        dokumen.DokumenInvestasi.map((e) => (
          <Paper
            key={e.id}
            style={{
              padding: "15px",
              backgroundColor: AccentColor.darkblue,
              border: `2px solid ${AccentColor.blue}`,
              borderRadius: "10px",
              color: "white",
              marginBottom: "15px",
            }}
            onClick={() => {
              router.push(NEW_RouterInvestasi.OLD_file_view_dokumen + e.id, {
                scroll: false,
              });
            }}
          >
            <Grid
              align="center"
              justify="center"
              h={50}
              px={"sm"}
              onClick={() => ""}
            >
              <Grid.Col span={10}>
                <Text>{e.title}</Text>
              </Grid.Col>
              <Grid.Col span={2}>
                <Center>
                  <IconFileTypePdf style={{ color: MainColor.yellow }} />
                </Center>
              </Grid.Col>
            </Grid>
          </Paper>
        ))
      ) : (
        <ComponentGlobal_IsEmptyData />
      )}
    </>
  );
}
