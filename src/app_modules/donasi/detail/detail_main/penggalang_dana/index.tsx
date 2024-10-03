"use client";

import { pathAssetImage, RouterImagePreview } from "@/app/lib";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoaderAvatar,
} from "@/app_modules/_global/component";
import ComponentDonasi_CardPublish from "@/app_modules/donasi/component/card_view/card_publish";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import {
  MODEL_DONASI,
  MODEL_DONASI_INFO_PENGGALANG,
} from "@/app_modules/donasi/model/interface";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import {
  ActionIcon,
  AspectRatio,
  Box,
  Center,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconBrandGmail, IconMoodSmile, IconPhone } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PenggalangDanaDonasi({
  dataPenggalang,
}: {
  dataPenggalang: MODEL_DONASI_INFO_PENGGALANG;
}) {
  const [data, setData] = useState(dataPenggalang);

  return (
    <>
      <Stack>
        <InformasiPenggalang value={data as any} />
        <Stack spacing={0}>
          {data.Donasi.map((e, i) => (
            <Box key={i}>
              <ComponentDonasi_CardPublish
                data={e}
                path={RouterDonasi.detail_publish}
              />
            </Box>
          ))}
        </Stack>
      </Stack>
    </>
  );
}

function InformasiPenggalang({ value }: { value: MODEL_USER }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack spacing={"xl"}>
          <Stack align="center" spacing={0}>
            <Box h={100}>
              <ActionIcon
                size={100}
                radius={"100%"}
                style={{
                  borderColor: "white",
                  borderStyle: "solid",
                  borderWidth: "1px",
                }}
                opacity={isLoading ? 0.5 : 1}
                onClick={() => {
                  router.push(
                    RouterImagePreview.main({
                      id: value.Profile.imageId as any,
                    }),
                    { scroll: false }
                  );
                  setIsLoading(true);
                }}
              >
                <ComponentGlobal_LoaderAvatar
                  fileId={value.Profile.imageId as any}
                  sizeAvatar={100}
                />

                {isLoading && (
                  <Image
                    pos={"absolute"}
                    height={50}
                    width={50}
                    alt="Photo"
                    src={pathAssetImage.new_loader}
                  />
                )}
              </ActionIcon>
            </Box>
            <Title order={3}>@ {value?.username}</Title>
          </Stack>
          <Stack>
            <Group>
              <IconMoodSmile />
              <Text>{value?.Profile.name}</Text>
            </Group>
            <Group>
              <IconPhone />
              <Text>+{value?.nomor}</Text>
            </Group>
            <Group>
              <IconBrandGmail />
              <Text>{value?.Profile?.email}</Text>
            </Group>
          </Stack>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
