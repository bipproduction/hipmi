import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useShallowEffect } from "@mantine/hooks";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Paper, ScrollArea } from "@mantine/core";
import { MainColor } from "../../color";
import { maxInputLength } from "../../lib/maximal_setting";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


export function Component_V3_TextEditor({
  data,
  onSetData,
}: {
  data: string;
  onSetData: (value: string) => void;
}) {
  const [isReady, setIsReady] = useState<boolean>(false);

  useShallowEffect(() => {
    setIsReady(true); // Set ready on client-side mount
  }, []);

  const handleChange = (input: string) => {
    const text = input.replace(/<[^>]+>/g, "").trim(); // Remove HTML tags and trim
    // if (text.length <= maxInputLength) {
    // }
    onSetData(input);
    // Input diabaikan jika panjang > maxLength
  };

  return (
    <>
      {isReady ? (
        <Paper p={5} withBorder shadow="lg" mah={300} bg={MainColor.white} >
          <ScrollArea h={280}>
            <ReactQuill
              placeholder="Apa yang sedang ingin dibahas ?"
              style={{
                color: "black",
                backgroundColor: MainColor.white,
                border: "none",
              }}
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  ["bold", "italic", "underline", "link"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["clean"],
                ],
              }}
              theme="snow"
              value={data}
              onChange={handleChange}
            />
          </ScrollArea>
        </Paper>
      ) : (
        <CustomSkeleton height={200} />
      )}
    </>
  );
}
