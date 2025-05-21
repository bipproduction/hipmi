import { APIs } from "@/lib";
import {
  ActionIcon,
  Box,
  Center,
  Image,
  Loader,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Tooltip
} from "@mantine/core";
import { IconMoodSmileFilled } from "@tabler/icons-react";
import _ from "lodash";
import { MainColor } from "../../color";
import { UIGlobal_Modal } from "../../ui";
import { ISticker } from "../interface/stiker";
import { insertStickerReactQuill } from "./react_quill_format_for_stiker";

interface Props {
  open: () => void;
  close: () => void;
  opened: boolean;
  quillRef: any;
  dataSticker: ISticker[] | null;
}

export const Comp_ButtonSticker = ({
  open,
  close,
  opened,
  quillRef,
  dataSticker,
}: Props) => {
  return (
    <>
      <ActionIcon onClick={open} variant="transparent" disabled={!dataSticker}>
        <IconMoodSmileFilled
          color={!dataSticker ? "gray" : MainColor.yellow}
          size={30}
        />
      </ActionIcon>

      <UIGlobal_Modal
        opened={opened}
        close={close}
        title="Pilih Stiker"
        closeButton
        closeOnClickOutside={false}
      >
        <Box mah={`${500}dvh`}>
          <ScrollArea h={480}>
            {_.isEmpty(dataSticker) ? (
              <Center h={300}>
                <Stack spacing={0} h="100%" align="center" justify="center">
                  <Text fw={"bold"} color="gray">
                    Sticker belum tersedia
                  </Text>
                  <Text color="gray" fw={"bold"} align="center">
                    Silahkan hubungi admin
                  </Text>
                </Stack>
              </Center>
            ) : (
              <SimpleGrid cols={3} spacing="md">
                {dataSticker?.map((item: any) => (
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
            )}
          </ScrollArea>
        </Box>
      </UIGlobal_Modal>
    </>
  );
};
