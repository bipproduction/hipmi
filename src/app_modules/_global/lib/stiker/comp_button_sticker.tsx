import { ActionIcon, Box, Image, ScrollArea, SimpleGrid, Tooltip } from "@mantine/core";
import { IconMoodSmileFilled } from "@tabler/icons-react";
import { MainColor } from "../../color";
import { UIGlobal_Modal } from "../../ui";
import { listStiker } from "../stiker";
import { insertStickerReactQuill } from "./react_quill_format_for_stiker";

interface Props {
  open: () => void;
  close: () => void;
  opened: boolean;
  quillRef: any;
}
export const Comp_ButtonSticker = ({open, close, opened, quillRef}: Props) => {
  return (
    <>
      <ActionIcon onClick={open} variant="transparent">
        <IconMoodSmileFilled color={MainColor.white} size={30} />
      </ActionIcon>

      <UIGlobal_Modal
        opened={opened}
        close={close}
        title="Pilih Stiker"
        closeButton
      >
        <Box mah={`${400}dvh`}>
          <ScrollArea h={380}>
            <SimpleGrid cols={3} spacing="md">
              {listStiker.map((item) => (
                <Box key={item.id}>
                  <Tooltip label={item.name}>
                    <Image
                      src={item.url}
                      height={100}
                      width={100}
                      alt={item.name}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        insertStickerReactQuill({
                          stickerUrl: item.url,
                          quillRef: quillRef,
                          close: close,
                        })
                      }
                    />
                  </Tooltip>
                </Box>
              ))}
            </SimpleGrid>
          </ScrollArea>
        </Box>
      </UIGlobal_Modal>
    </>
  );
}