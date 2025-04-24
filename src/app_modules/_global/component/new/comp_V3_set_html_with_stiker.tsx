
export function Comp_V3_SetHtmlWithSticker({
  props,
  className,
  color,
}: {
  props: string;
  className: string;
  color?: string;
}) {
  return (
    <>
      <div className={className} style={{
        color: color ? color : "white"
      }} dangerouslySetInnerHTML={{ __html: props }} />
    </>
  );
}
