import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { Badge, Group, Stack, Text } from "@mantine/core";
import { Prisma } from "@prisma/client";
import moment from "moment";

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
