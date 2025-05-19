import {
  ActionIcon,
  Box,
  Image,
  ScrollArea,
  SimpleGrid,
  Tooltip,
  Loader,
  Group,
} from "@mantine/core";
import { IconMoodSmileFilled } from "@tabler/icons-react";
import { MainColor } from "../../color";
import { UIGlobal_Modal } from "../../ui";
import { insertStickerReactQuill } from "./react_quill_format_for_stiker";
import { APIs } from "@/lib";

interface Props {
  open: () => void;
  close: () => void;
  opened: boolean;
  quillRef: any;
  dataSticker: any;
  listEmotions: any
}
export const Comp_ButtonSticker = ({
  open,
  close,
  opened,
  quillRef,
  dataSticker,
  listEmotions,
}: Props) => {
  
  return (
    <>
      <ActionIcon onClick={open} variant="transparent" disabled={dataSticker.length === 0}>
        <IconMoodSmileFilled color={dataSticker.length === 0 ? "gray" : MainColor.white} size={30} />
      </ActionIcon>

      <UIGlobal_Modal
        opened={opened}
        close={close}
        title="Pilih Stiker"
        closeButton
        closeOnClickOutside={false}

      >
        <Box mah={`${500}dvh`}>
          {/* <Group position="center">
            {listEmotions.map((item: any) => (
              <ActionIcon key={item.id} onClick={() => open()}>
                <IconMoodSmileFilled color={item.value} size={30} />
              </ActionIcon>
            ))}
          </Group> */}
          <ScrollArea h={380}>
            <SimpleGrid cols={3} spacing="md">
              {dataSticker.map((item: any) => (
                <Box key={item.id}>
                  <Tooltip label={item.name}>
                    <Image
                      onLoad={() => <Loader />}
                      src={APIs.GET({ fileId: item.fileId })}
                      height={100}
                      width={100}
                      alt={item.name}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        insertStickerReactQuill({
                          stickerUrl: APIs.GET({ fileId: item.fileId }),
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
};
