import { ActionIcon, Box, Group, Title, Loader } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import { AccentColor, MainColor } from "../../color";

export function Component_Header({
  title,
  posotion,
  // left button
  hideButtonLeft,
  iconLeft,
  routerLeft,
  customButtonLeft,
  // right button
  iconRight,
  routerRight,
  customButtonRight,
  backgroundColor,
}: {
  title: string;
  posotion?: any;
  // left button
  hideButtonLeft?: boolean;
  iconLeft?: any;
  routerLeft?: any;
  customButtonLeft?: React.ReactNode;
  // right button
  iconRight?: any;
  routerRight?: any;
  customButtonRight?: React.ReactNode;
  backgroundColor?: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRightLoading, setRightLoading] = useState(false);

  return (
    <>
      <Group
        w={"100%"}
        h={"100%"}
        position={posotion ? posotion : "apart"}
        px={"md"}
      >
        {hideButtonLeft ? (
          <ActionIcon disabled variant="transparent"></ActionIcon>
        ) : customButtonLeft ? (
          customButtonLeft
        ) : (
          <ActionIcon
            c={MainColor.white}
            variant="transparent"
            radius={"xl"}
            onClick={() => {
              setIsLoading(true);
              routerLeft === undefined
                ? router.back()
                : router.push(routerLeft, { scroll: false });
            }}
          >
            {/* PAKE LOADING SAAT KLIK BACK */}
            {/* {isLoading ? (
                       <Loader color={AccentColor.yellow} size={20} />
                     ) : iconLeft ? (
                       iconLeft
                     ) : (
                       <IconChevronLeft />
                     )} */}

            {/* GA PAKE LOADING SAAT KLIK BACK */}
            {iconLeft ? iconLeft : <IconChevronLeft />}
          </ActionIcon>
        )}

        <Title order={5} c={MainColor.yellow}>
          {title}
        </Title>

        {customButtonRight ? (
          customButtonRight
        ) : iconRight === undefined ? (
          <ActionIcon disabled variant="transparent"></ActionIcon>
        ) : routerRight === undefined ? (
          <Box>{iconRight}</Box>
        ) : (
          <ActionIcon
            c={"white"}
            variant="transparent"
            onClick={() => {
              setRightLoading(true);
              router.push(routerRight);
            }}
          >
            {isRightLoading ? (
              <Loader color={AccentColor.yellow} size={20} />
            ) : (
              iconRight
            )}
          </ActionIcon>
        )}
      </Group>
    </>
  );
}
