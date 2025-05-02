import { MainColor } from "../../color";

export function Comp_V3_SetInnerHTMLWithStiker({
  props,
  className,
  color,
  style,
}: {
  props: string | undefined;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}) {
  const baseStyle: React.CSSProperties = {
    color: color ?? MainColor.white,
  };

  return (
    <>
      <div
        // className={className}
        style={{ ...baseStyle, ...style }}
        dangerouslySetInnerHTML={{ __html: props ?? "" }}
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

      img {
        max-width: 70px !important;
        max-height: 70px !important;
      }
    `}
      </style>
    </>
  );
}
