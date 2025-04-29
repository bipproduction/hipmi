export function Comp_V3_SetHtmlWithSticker({
  props,
  className,
  color,
  style,
}: {
  props: string;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <>
      <div
        className={className}
        style={{ ...style, color: color ? color : "white" }}
        dangerouslySetInnerHTML={{ __html: props }}
      />
    </>
  );
}
