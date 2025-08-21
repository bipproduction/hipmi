"use client";

import { Text } from "@mantine/core";
import { useState } from "react";

export default function ComponentGlobal_InputCountDown({
  maxInput,
  lengthInput,
}: {
  maxInput: number;
  lengthInput: number;
}) {
  return (
    <>
      <Text fz={"sm"} fs={"italic"} color="gray">
        {maxInput - lengthInput} /
        <Text
          span
          inherit
          c={maxInput - lengthInput < 0 ? "red" : ""}
          style={{ transition: " all0.5s" }}
        >
          {maxInput}
        </Text>
      </Text>
    </>
  );
}
