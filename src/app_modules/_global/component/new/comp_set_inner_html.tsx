import React from "react";
import { MainColor } from "../../color";

export function Component_SetInnerHtml({
  props,
  color,
}: {
  props: string 
  color?: string;
}) {
  return (
    <>
      <div
        style={{
          color: color ? color : MainColor.white,
        }}
        dangerouslySetInnerHTML={{
          __html: props,
        }}
      />
    </>
  );
}
