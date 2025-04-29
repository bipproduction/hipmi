import { MainColor } from "../../color";

export const Comp_DangerouslySetInnerHTML = ({
  props,
  color,
  style,
}: {
  props: string | undefined;
  color?: string;
  style?: React.CSSProperties;
}) => {
  const baseStyle: React.CSSProperties = {
    color: color ?? MainColor.white,
  };

  return (
    <>
      <div
        style={{
          ...baseStyle,
          ...style,
          // wordBreak: "break-word",
        }}
        dangerouslySetInnerHTML={{
          __html: props ?? "",
        }}
      />
    </>
  );
};
