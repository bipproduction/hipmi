import { Styles } from "@mantine/core";
import { BaseSelectStylesNames } from "@mantine/core/lib/Select/types";
import { MainColor } from "../color";

export const baseStylesTextInput: Styles<
  BaseSelectStylesNames,
  Record<string, any>
> = {
  label: {
    color: MainColor.white,
  },
  input: {
    backgroundColor: MainColor.white,
  },
};
