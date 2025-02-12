import { RouterProfile } from "@/lib/router_hipmi/router_katalog";
import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoaderAvatar,
} from "@/app_modules/_global/component";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { funGlobal_CheckProfile } from "@/app_modules/_global/fun/get";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import {
  Grid,
  ActionIcon,
  Avatar,
  Stack,
  Group,
  Badge,
  Text,
} from "@mantine/core";
import { Prisma } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";

type IFontSize = "xs" | "sm" | "md" | "lg" | "xl";

function ComponentEvent_AvatarAndUsername({
  profile,
  component,
  sizeAvatar,
  fontSize,
  tanggalMulai,
  tanggalSelesai,
  isPresent,
}: {
  profile: Prisma.ProfileSelect;
  component?: React.ReactNode;
  sizeAvatar?: number;
  fontSize?: IFontSize | {};
  tanggalMulai?: Date;
  tanggalSelesai?: Date;
  isPresent?: boolean;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  async function onCheckProfile() {
    const res = await funGlobal_CheckProfile({ profileId: profile.id as any });

    if (res !== null) {
      setVisible(true);
      router.push(RouterProfile.katalog({ id: profile.id as any }));
    } else {
      ComponentGlobal_NotifikasiPeringatan("Id tidak ditemukan");
    }
  }

  const tglMulai = moment(tanggalMulai).diff(moment(), "minutes") < 0;

  return (
    <>
      <ComponentGlobal_CardStyles marginBottom={"15px"}>
        <ComponentGlobal_AvatarAndUsername
          profile={profile}
          component={
            tglMulai && (
              <Group position="right">
                <Stack justify="center" h={30}>
                  <Text fw={"bold"} fz={fontSize ? fontSize : "md"}>
                    {isPresent ? (
                      <Badge color="green">Hadir</Badge>
                    ) : (
                      <Badge>-</Badge>
                    )}
                  </Text>
                </Stack>
              </Group>
            )
          }
        />
      </ComponentGlobal_CardStyles>
    </>
  );
}

export default ComponentEvent_AvatarAndUsername;
