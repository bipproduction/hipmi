import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { Card } from "@mantine/core";
import React from "react";

export function Investasi_ComponentStylesCard({
  children,
  backgroundColor,
  border,
  marginBottom,
  onClickHandler,
}: {
  children: React.ReactNode;
  backgroundColor?: string;
  border?: string;
  marginBottom?: string | number;
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
          paddingInline: "15px",
          paddingBlock: "15px",
          borderRadius: "10px",
          color: MainColor.white,
          marginBottom: marginBottom ? marginBottom : "0x",
        }}
        onClick={onClickHandler}
      >
        {children}
      </Card>
    </>
  );
}
