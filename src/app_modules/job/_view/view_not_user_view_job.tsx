import {
  ComponentGlobal_CardStyles,
  ComponentGlobal_NotUserLoadImage,
} from "@/app_modules/_global/component";
import { apiGetNotUserForJob } from "@/app_modules/_global/lib/api_fetch_not_user";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Center, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";

export function Job_ViewNotUserJobVacany() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);

  useShallowEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiGetNotUserForJob({ id: id as string });
        setData(data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {data ? (
        <ComponentGlobal_CardStyles>
          <Stack spacing={"xl"}>
            {data.imageId && (
              <ComponentGlobal_NotUserLoadImage fileId={data?.imageId} />
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
        <CustomSkeleton height={400} />
      )}
    </>
  );
}
