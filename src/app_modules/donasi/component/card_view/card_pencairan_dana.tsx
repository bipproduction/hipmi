import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { Button, Center, Spoiler, Stack, Text, Title } from "@mantine/core";
import { IconImageInPicture } from "@tabler/icons-react";
import moment from "moment";

import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { RouterImagePreview } from "@/lib";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_DONASI_PENCAIRAN_DANA } from "../../model/interface";

export function ComponentDonasi_CardPencairanDana({
  data,
}: {
  data: MODEL_DONASI_PENCAIRAN_DANA;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <ComponentGlobal_CardStyles>
        <Text fz={"xs"}>{moment(data.createdAt).format("ll")}</Text>
        <Stack spacing={"lg"}>
          <Title order={5}>{data.title}</Title>
          <Spoiler
            maxHeight={50}
            hideLabel="Sembunyikan"
            showLabel="Baca Selengkapnya"
          >
            {data.deskripsi}
          </Spoiler>
          <Center>
            <Button
              loaderPosition="center"
              loading={isLoading}
              radius={"xl"}
              leftIcon={<IconImageInPicture />}
              onClick={() => {
                setLoading(true);
                router.push(RouterImagePreview.main({ id: data.imageId }), {
                  scroll: false,
                });
              }}
              bg={MainColor.yellow}
              color="yellow"
              c={"black"}
            >
              Bukti Transfer
            </Button>
          </Center>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
