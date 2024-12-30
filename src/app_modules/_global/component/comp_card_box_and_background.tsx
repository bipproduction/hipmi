import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { Card } from "@mantine/core";
import React from "react";

export function ComponentGlobal_CardStyles({
  children,
  backgroundColor,
  border,
  marginBottom,
  height,
  color,
  onClickHandler,
}: {
  children: React.ReactNode;
  backgroundColor?: string;
  border?: string;
  marginBottom?: string | number;
  height?: string | number;
  color?: string;
  onClickHandler?: React.MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <>
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
        onClick={onClickHandler}
      >
        {children}
      </Card>
    </>
  );
}
