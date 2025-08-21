"use cleint";

import { RouterPortofolio } from "@/lib/router_hipmi/router_katalog";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import {
  ActionIcon,
  Box,
  Center,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconCaretRight, IconPencilPlus } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_PORTOFOLIO } from "../portofolio/model/interface";
import { MODEL_PROFILE } from "../profile/model/interface";

export function Portofolio_UiListView({
  listPorto,
  profile,
  userLoginId,
}: {
  listPorto: MODEL_PORTOFOLIO[];
  profile: MODEL_PROFILE;
  userLoginId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingPorto, setLoadingPorto] = useState(false);
  const [idPorto, setIdPorto] = useState("");
  return (
    <>
      <Box
        style={{
          backgroundColor: AccentColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          borderRadius: "10px ",
          padding: "15px",
          color: "white",
        }}
      >
        <Stack spacing={"sm"}>
          <Group position="center">

            <Title order={4}>Portofolio</Title>
            {/* {profile?.User.id === userLoginId ? (
              <ActionIcon
                variant="transparent"
                onClick={() => {
                  router.push(RouterPortofolio.create + `${profile.id}`, {
                    scroll: false,
                  });
                  setLoading(true);
                }}
              >
                {loading ? (
                  <ComponentGlobal_Loader />
                ) : (
                  <IconPencilPlus color={AccentColor.yellow} />
                )}
              </ActionIcon>
            ) : (
              <ActionIcon variant="transparent" disabled></ActionIcon>
            )} */}
          </Group>

          <Stack
            style={{
              height: "auto",
            }}
          >
            {_.isEmpty(listPorto) ? (
              <Center>
                <Text fs={"italic"} fz={"xs"} c={"gray"}>
                  - Belum Ada Portofolio -
                </Text>
              </Center>
            ) : (
              <Stack>
                {listPorto.map((e, i) => (
                  <Paper
                    shadow="sm"
                    key={i}
                    radius={"md"}
                    onClick={() => {
                      setIdPorto(e?.id);
                      setLoadingPorto(true);
                      router.push(RouterPortofolio.main_detail + e?.id);
                    }}
                    style={{
                      backgroundColor: MainColor.darkblue,
                      border: `2px solid ${AccentColor.blue}`,
                      borderRadius: "10px ",
                      padding: "15px",
                      color: "white",
                    }}
                  >
                    <Group position="apart">
                      <Stack spacing={0} w={"80%"}>
                        <Text fw={"bold"} lineClamp={1}>
                          {e?.namaBisnis}
                        </Text>
                        <Text fz={10} c={MainColor.yellow}>
                          #{e.id_Portofolio}
                        </Text>
                      </Stack>
                      <Stack>
                        {idPorto === e?.id && loadingPorto ? (
                          <ComponentGlobal_Loader />
                        ) : (
                          <IconCaretRight color="white" size={25} />
                        )}
                      </Stack>
                    </Group>
                  </Paper>
                ))}
              </Stack>
            )}
            {_.isEmpty(listPorto) ? (
              ""
            ) : (
              <Group position="right">
                <Text
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    router.push(
                      RouterPortofolio.daftar_portofolio + profile.id,
                      { scroll: false }
                    )
                  }
                  fw={"bold"}
                  fz={"sm"}
                >
                  Lihat semua
                </Text>
              </Group>
            )}
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
