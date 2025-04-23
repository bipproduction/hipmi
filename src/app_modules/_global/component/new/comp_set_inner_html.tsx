import React from "react";
import { MainColor } from "../../color";
import { useShallowEffect } from "@mantine/hooks";

export function Comp_DangerouslySetInnerHTML({
  props,
  color,
}: {
  props: string;
  color?: string;
}) {
  // useShallowEffect(() => {
  //   // Add custom style for stickers inside Quill editor
  //   const style = document.createElement("style");
  //   style.textContent = `
  //     .chat-content img {
  //     max-width: 100px !important;
  //     max-height: 100px !important;
  //   }
  // `;
  //   document.head.appendChild(style);

  //   return () => {
  //     // Clean up when component unmounts
  //     document.head.removeChild(style);
  //   };
  // }, []);

  return (
    <>
      <div
        style={{
          color: color ? color : MainColor.white,
        }}
        // className="chat-content"
        dangerouslySetInnerHTML={{
          __html: props,
        }}
      />
    </>
  );
}
