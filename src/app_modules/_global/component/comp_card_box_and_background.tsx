import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { Card } from "@mantine/core";
import React from "react";

/**
 * ComponentGlobal_CardStyles
 * 
 * A React component that renders a customizable card element.
 *
 * Props:
 * - children (React.ReactNode): Content to be displayed inside the card.
 * - backgroundColor (string, optional): Background color of the card. Defaults to AccentColor.darkblue.
 * - border (string, optional): Border color of the card. Defaults to AccentColor.blue.
 * - marginBottom (string | number, optional): Margin below the card. Defaults to "15px".
 * - height (string | number, optional): Height of the card. Defaults to "auto".
 * - color (string, optional): Text color inside the card. Defaults to MainColor.white.
 * - onClickHandler (React.MouseEventHandler<HTMLDivElement>, optional): Function to handle click events on the card.
 */
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
