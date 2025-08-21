import { Text } from "@mantine/core";
import moment from "moment";
import "moment/locale/id";
import { MainColor } from "../../color/color_pallet";

export const Component_V3_MomentDateAndTime = ({
  dateTime,
  color,
}: {
  dateTime: Date | string | undefined
  color?: string;
}) => {
  return (
    <>
      <Text c={color ?? MainColor.white}>
        {dateTime
          ? moment(
              dateTime.toLocaleString("id-ID", {
                dateStyle: "full",
              })
            ).format("dddd, DD MMMM YYYY, LT")
          : "-"}
      </Text>
    </>
  );
};
