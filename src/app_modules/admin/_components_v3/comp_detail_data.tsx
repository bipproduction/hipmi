import { MainColor } from "@/app_modules/_global/color";
import { Grid, Paper, Text } from "@mantine/core";

export function Admin_V3_ComponentDetail({
  item,
}: {
  item: Record<string, any>;
}) {
  return (
    <>
      <Paper
        bg={MainColor.soft_darkblue}
        style={{
          color: MainColor.white,
        }}
      >
        <Grid m={0}>
          <Grid.Col lg={3} md={3} sm={3} xs={3} span={4}>
            <Text fw={"bold"}>{item.title || item.label}</Text>
          </Grid.Col>

          <Grid.Col span={"auto"}>
            <Text>{item.value}</Text>
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
}
