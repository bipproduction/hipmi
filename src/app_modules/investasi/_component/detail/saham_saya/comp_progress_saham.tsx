import { MainColor } from "@/app_modules/_global/color";
import { Stack, Progress, Text } from "@mantine/core";
import { Investasi_ComponentStylesCard } from "../../comp_card_border_and_background";

export function Investasi_ComponentBoxProgress({
  progress,
}: {
  progress: string;
}) {
  return (
    <>
      <Investasi_ComponentStylesCard>
        <Stack>
          <Text c={MainColor.white} fw={"bold"}>Progres Saham</Text>
          <Progress
            styles={{ label: { color: "black" } }}
            color={MainColor.yellow}
            size={"xl"}
            value={+progress}
            label={progress + "%"}
            radius={"xl"}
            bg={MainColor.white}
          />
        </Stack>
      </Investasi_ComponentStylesCard>
    </>
  );
}
