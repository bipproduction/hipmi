import { MainColor } from "../../color";

export const Comp_DangerouslySetInnerHTML= ({
  props,
  color,
}: {
  props: string | undefined;
  color?: string;
}) =>  {
  return (
    <>
      <div
        style={{
          color: color ? color : MainColor.white,
        }}
        // className="chat-content"
        dangerouslySetInnerHTML={{
          __html: props ?? "",
        }}
      />
    </>
  );
}
