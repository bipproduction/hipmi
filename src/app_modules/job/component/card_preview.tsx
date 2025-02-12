"use client";

import { RouterJob } from "@/lib/router_hipmi/router_job";
import { Card, Center, Grid, Image, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function ComponentJob_CardPreview({ path }: { path: string }) {
  const router = useRouter();
  return (
    <>
      <Card
        shadow="lg"
        withBorder
        radius={"md"}
        p={20}
        onClick={() => {
          router.push(path);
        }}
      >
        <Card.Section px={"sm"}>
          <Grid>
            <Grid.Col span={"content"}>
              <Image
                height={100}
                width={80}
                alt="foto"
                src={"/aset/no-file.png"}
              />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Center h={"100%"}>
                <Text fw={"bold"}>Judul Lowongan kerja</Text>
              </Center>
            </Grid.Col>
          </Grid>
        </Card.Section>
      </Card>
    </>
  );
}
