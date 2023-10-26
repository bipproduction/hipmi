"use client";

import { RouteInvestasi } from "@/app/lib/app_route";
import { Center, Grid, Group, Paper, Text, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function EditInvestasi({id}:{id:string}) {
  const router = useRouter();
  const listEdit = [
    {
      id: 1,
      name: "Intro",
      route: RouteInvestasi.edit_intro,
    },
    {
      id: 2,
      name: "Prospektus",
      route: RouteInvestasi.edit_prospektus,
    },
    {
      id: 3,
      name: "Dokumen",
      route: RouteInvestasi.edit_dokumen,
    },
    {
      id: 4,
      name: "Berita",
      route: RouteInvestasi.edit_berita,
    },
  ];
  return (
    <>
      {listEdit.map((e) => (
        <Paper
          key={e.id}
          w={"100%"}
          h={50}
          bg={"gray"}
          mb={"md"}
          onClick={() => router.push(e.route + `${id}`)}
        >
          <Grid align="center" justify="center" h={50} px={"sm"}>
            <Grid.Col span={10}>
              <Text>{e.name}</Text>
            </Grid.Col>
            <Grid.Col span={2}>
              <Center>
                <IconChevronRight />
              </Center>
            </Grid.Col>
          </Grid>
        </Paper>
      ))}
    </>
  );
}