import { MainColor } from "../../color";

export function Comp_DangerouslySetInnerHTML({
  props,
  color,
}: {
  props: string;
  color?: string;
}) {
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
