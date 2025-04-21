import { APIs } from "@/lib";
import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { MODEL_INVESTASI_DOKUMEN } from "@/app_modules/investasi/_lib/interface";
import {
  SimpleGrid,
  Paper,
  Stack,
  Title,
  Grid,
  Group,
  Button,
  Text,
  Box,
} from "@mantine/core";
import { IconFileTypePdf } from "@tabler/icons-react";
import _ from "lodash";
import Link from "next/link";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import { Admin_V3_ComponentDetail } from "../../_components_v3/comp_detail_data";

export function ComponentAdminInvestasi_UIDetailFile({
  title,
  dataProspektus,
  listDokumen,
  prospektusFileId,
}: {
  title: string;
  dataProspektus: any;
  listDokumen: any[];
  prospektusFileId: string;
}) {
  const listItem = [
    {
      label: "File ",
      value: (
        <Stack align="center">
          <Text lineClamp={1}>Prospek {title}</Text>
          <Link target="_blank" href={APIs.GET({ fileId: prospektusFileId })}>
            <Button leftIcon={<IconFileTypePdf color="white" />} radius={50}>
              Lihat
            </Button>
          </Link>
        </Stack>
      ),
    },
    {
      label: "Dokumen",
      value: _.isEmpty(listDokumen) ? (
        <Text>-</Text>
      ) : (
        listDokumen.map((e: MODEL_INVESTASI_DOKUMEN) => (
          <Box key={e.id}>
            <Group>
              <Text>{e.title}</Text>
              <Link target="_blank" href={APIs.GET({ fileId: e.fileId })}>
                <Button
                  leftIcon={<IconFileTypePdf color="white" />}
                  radius={50}
                >
                  Lihat
                </Button>
              </Link>
            </Group>
          </Box>
        ))
      ),
    },
  ];

  return (
    <>
      <Admin_ComponentBoxStyle>
        <Stack c={AdminColor.white}>
          <Title order={3}>File & Dokumen</Title>

          <Stack>
            {listItem.map((e, i) => (
              <Admin_V3_ComponentDetail key={i} item={e} />
            ))}
          </Stack>
        </Stack>
      </Admin_ComponentBoxStyle>
    </>
  );
}
