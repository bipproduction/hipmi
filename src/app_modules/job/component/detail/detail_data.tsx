"use client";

import {
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoadImage,
} from "@/app_modules/_global/component";
import { Center, Stack, Text } from "@mantine/core";
import { MODEL_JOB } from "../../model/interface";
import { Job_SkeletonDetailJob } from "../skeleton/comp_skeleton_beranda";

export default function ComponentJob_DetailData({ data }: { data: MODEL_JOB }) {
  return (
    <>
      {data ? (
        <ComponentGlobal_CardStyles>
          <Stack spacing={"xl"}>
            {data.imageId && (
              <ComponentGlobal_LoadImage fileId={data?.imageId} />
            )}

            <Stack>
              <Center>
                <Text fz={20} fw={"bold"}>
                  {data.title}
                </Text>
              </Center>
              <Stack spacing={0}>
                <Text>
                  <div dangerouslySetInnerHTML={{ __html: data.content }} />
                </Text>
                <Text>
                  <div dangerouslySetInnerHTML={{ __html: data.deskripsi }} />
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </ComponentGlobal_CardStyles>
      ) : (
        <Job_SkeletonDetailJob />
      )}
    </>
  );
}
