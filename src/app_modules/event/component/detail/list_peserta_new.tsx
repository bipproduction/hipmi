import { AccentColor, MainColor } from '@/app_modules/_global/color';
import { Avatar, Badge, Box, Card, Flex, Group, Stack, Text } from '@mantine/core';

function ComponentEvent_ListPesertaNew({ backgroundColor, border, marginBottom, height, color }: {
  backgroundColor?: string;
  border?: string;
  marginBottom?: string | number;
  height?: string | number;
  color?: string;
}) {
  return (
    <>
      <Box>
        <Card
          style={{
            backgroundColor: backgroundColor
              ? backgroundColor
              : AccentColor.darkblue,
            border: `2px solid ${border ? border : AccentColor.blue}`,
            paddingInline: "16px",
            paddingBlock: "16px",
            borderRadius: "10px",
            color: color ? color : MainColor.white,
            height: height ? height : "auto",
            marginBottom: marginBottom ? marginBottom : "15px",
          }}

        >
          <Flex gap={"md"} align={"center"} justify={"space-between"}>
            <Group>
            <Avatar radius={"xl"} size={40}>
            </Avatar>
              <Text fz={"md"}>Nico Arya Putra Laksana</Text>
            </Group>
            <Badge style={{ color: "white" }} bg={"blue"}>HADIR</Badge>
          </Flex>
        </Card>
      </Box>
    </>
  );
}

export default ComponentEvent_ListPesertaNew;
