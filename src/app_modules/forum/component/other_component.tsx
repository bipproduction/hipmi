import { Stack, Text } from "@mantine/core";
import { IconSearchOff } from "@tabler/icons-react";

export { Forum_ComponentIsDataEmpty };

function Forum_ComponentIsDataEmpty() {
  return (
    <>
      <Stack align="center" justify="center" h={"80vh"}>
        <IconSearchOff size={80} color="white" />
        <Stack spacing={0} align="center">
          <Text color="white" fw={"bold"} fz={"xs"}>
            Tidak ada data
          </Text>
        </Stack>
      </Stack>
    </>
  );
}
