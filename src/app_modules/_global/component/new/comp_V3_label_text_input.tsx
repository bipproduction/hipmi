import { Text } from "@mantine/core";
import { MainColor } from "../../color";

export default function Component_V3_Label_TextInput({
  text,
}: {
  text: string;
}) {
  return (
    <>
      <Text c={MainColor.white} fz={"sm"} fw={500}>
        {text}
        <Text inherit span c={"red"} px={5}>
          *
        </Text>
      </Text>
    </>
  );
}
