import { Center, Grid, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { AccentColor, MainColor } from "../color/color_pallet";

export default function ComponentGlobal_BoxInformation({
  informasi,
  isReport,
  fonsize,
}: {
  informasi: string;
  isReport?: boolean;
  fonsize?: number | string;
}) {
  return (
    <>
      <Paper
        bg={"blue.3"}
        p={10}
        style={{
          backgroundColor: AccentColor.blue,
          border: `2px solid ${AccentColor.softblue}`,
          borderRadius: "10px",
        }}
      >
        {isReport ? (
          <Stack spacing={0}>
            <Text
              fz={fonsize ? fonsize : 12}
              fs={"italic"}
              c={"orange"}
              fw={"bold"}
            >
              * Report
            </Text>
            <Text fz={fonsize ? fonsize : 12} c={MainColor.white}>
              {informasi}
            </Text>
          </Stack>
        ) : (
          <Group>
            <Text fz={fonsize ? fonsize : 12} c={"red"} fw={"bold"}>
              *{" "}
              <Text span inherit c={MainColor.white} fw={"normal"}>
                {informasi}
              </Text>
            </Text>
          </Group>
        )}
      </Paper>
    </>
  );

  
}
