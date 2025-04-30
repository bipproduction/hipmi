import { MainColor } from "../../color";

export const Comp_DangerouslySetInnerHTML = ({
  props,
  color,
  style: styleInput,
}: {
  props: string | undefined;
  color?: string;
  style?: React.CSSProperties;
}) => {
  const baseStyle: React.CSSProperties = {
    color: color ?? MainColor.white,
    // wordBreak: "break-word",
    // overflow: "hidden",
  };
 
  return (
    <>
      <div
        style={{
          ...baseStyle,
          ...styleInput,
        }}
        dangerouslySetInnerHTML={{
          __html: props ?? "",
        }}
      />

      <style>
        {`
      div p {
        margin: 0 0 8px 0;
      }

      div ul, div ol {
        margin: 0 0 8px 20px;
        padding-left: 16px;
      }

      div h1, div h2, div h3 {
        margin: 0 0 12px 0;
      }

      div li {
        margin-bottom: 4px;
      }
    `}
      </style>
    </>
  );
};
