"use client";

import { Admin_ComponentBoxStyle } from "@/app_modules/admin/_admin_global/_component/comp_admin_boxstyle";
import { Admin_V3_ComponentBreakpoint } from "@/app_modules/admin/_components_v3/comp_simple_grid_breakpoint";
import { MODEL_JOB } from "@/app_modules/job/model/interface";
import { Badge, Grid, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { AdminJob_ComponentImageView } from "./image_view";
import { MainColor } from "@/app_modules/_global/color";
import { Admin_V3_ComponentDetail } from "@/app_modules/admin/_components_v3/comp_detail_data";

export function AdminJob_DetailPublish({ data }: { data: MODEL_JOB }) {
  const [isLoading, setLoading] = useState(false);

  const listData = [
    {
      title: "Username",
      value: data.Author.username,
    },
    {
      title: "Judul",
      value: data.title,
    },
    {
      title: "Status",
      value: data.isArsip ? (
        <Badge variant="light">Arsip</Badge>
      ) : (
        <Badge color="green">Publish</Badge>
      ),
    },

    {
      title: "Konten",
      value: <div  dangerouslySetInnerHTML={{ __html: data.content }} />,
    },
    {
      title: "Deskripsi ",
      value: <div dangerouslySetInnerHTML={{ __html: data.deskripsi }} />,
    },
  ];

  return (
    <>
      <Admin_V3_ComponentBreakpoint>
        <Admin_ComponentBoxStyle>
          <Stack>
            {listData.map((item, index) => (
              <Admin_V3_ComponentDetail key={index} item={item}/>
            ))}
          </Stack>
        </Admin_ComponentBoxStyle>

        {data.imageId && <AdminJob_ComponentImageView imageId={data.imageId} />}
      </Admin_V3_ComponentBreakpoint>
    </>
  );
}


