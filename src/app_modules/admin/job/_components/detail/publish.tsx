"use client";

import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Admin_ComponentBoxStyle } from "@/app_modules/admin/_admin_global/_component/comp_admin_boxstyle";
import { MODEL_JOB } from "@/app_modules/job/model/interface";
import { APIs } from "@/lib";
import { Badge, Center, Grid, Image, SimpleGrid, Text } from "@mantine/core";
import { IconImageInPicture } from "@tabler/icons-react";
import { useState } from "react";
import { AdminJob_ComponentImageView } from "./image_view";

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
      value: <div dangerouslySetInnerHTML={{ __html: data.content }} />,
    },
    {
      title: "Deskripsi",
      value: <div dangerouslySetInnerHTML={{ __html: data.deskripsi }} />,
    },
  ];

  return (
    <>
      <SimpleGrid cols={2}>
        <Admin_ComponentBoxStyle>
          {listData.map((item, index) => (
            <Grid key={index}>
              <Grid.Col span={2}>
                <Text>{item.title}</Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text>:</Text>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text>{item.value}</Text>
              </Grid.Col>
            </Grid>
          ))}
        </Admin_ComponentBoxStyle>

        {data.imageId && (
         <AdminJob_ComponentImageView imageId={data.imageId}/>
        )}
      </SimpleGrid>
    </>
  );
}
