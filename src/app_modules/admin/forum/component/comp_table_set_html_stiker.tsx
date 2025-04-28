import { Comp_V3_SetHtmlWithSticker } from "@/app_modules/_global/component/new/comp_V3_set_html_with_stiker";
import { Box, Spoiler } from "@mantine/core";

export const AdminForum_CompTableSetHtmlStiker = ({
  data,
  classname,
  maxHeight,
  boxWidth,
}: {
  data: string;
  classname: string;
  maxHeight?: number;
  boxWidth?: number;
}) => {
  return (
    <>
      <Box w={boxWidth ?? 250}>
        <Spoiler
          maxHeight={maxHeight ?? 50}
          hideLabel="sembunyikan"
          showLabel="tampilkan"
        >
          <Comp_V3_SetHtmlWithSticker props={data} className={classname} />
        </Spoiler>
      </Box>
    </>
  );
};
