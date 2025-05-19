import { APIs } from "@/lib";
import {
  ActionIcon,
  Box,
  Button,
  CloseButton,
  Image,
  Loader,
  ScrollArea,
  SimpleGrid,
  Tooltip,
} from "@mantine/core";
import { IconMoodSmileFilled } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { MainColor } from "../../color";
import { UIGlobal_Modal } from "../../ui";
import { insertStickerReactQuill } from "./react_quill_format_for_stiker";
import { ISticker } from "../interface/stiker";

interface Props {
  open: () => void;
  close: () => void;
  opened: boolean;
  quillRef: any;
  dataSticker: ISticker[] | null;
  // listEmotions: any[];
  // onEmotionSelect?: (val: string | null) => void;
}

export const Comp_ButtonSticker = ({
  open,
  close,
  opened,
  quillRef,
  dataSticker,
  // listEmotions,
  // onEmotionSelect,
}: Props) => {

  const scrollRef = useRef<HTMLDivElement>(null);

  // Menyimpan id emosi yang dipilih
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

  // Menyimpan urutan awal
  // const [originalOrder] = useState(listEmotions);

  // const handleEmotionClick = (value: string) => {
  //   setSelectedEmotions(
  //     (prev) =>
  //       prev.includes(value)
  //         ? prev.filter((v) => v !== value) // batal pilih
  //         : [...prev, value] // tambah pilih
  //   );
  // };

  // Urutkan emosi: yang dipilih muncul di depan
  // const orderedEmotions = [
  //   ...selectedEmotions.map((val) => listEmotions.find((e: any) => e.value === val)),
  //   ...originalOrder.filter((e: any) => !selectedEmotions.includes(e.value)),
  // ];

  return (
    <>
      <ActionIcon
        onClick={open}
        variant="transparent"
        disabled={!dataSticker}
      >
        <IconMoodSmileFilled
          color={
            !dataSticker
              ? "gray"
              : MainColor.yellow
          }
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
          {/* <ScrollArea type="never" viewportRef={scrollRef}>
            <Box
              p="sm"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5rem",
                overflowX: "auto",
                overflowY: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {orderedEmotions.map((item: any) => {
                const isSelected = selectedEmotions.includes(item.value);

                return (
                  <Button
                    key={item.id}
                    variant={isSelected ? "filled" : "light"}
                    color={isSelected ? "blue" : "gray"}
                    radius="xl"
                    style={{ flexShrink: 0, position: "relative" }}
                    onClick={() => handleEmotionClick(item.value)}
                  >
                    {item.label}
                    {isSelected && (
                      <CloseButton
                        onClick={(e) => {
                          e.stopPropagation(); // agar tidak trigger lagi handleEmotionClick
                          handleEmotionClick(item.value);
                        }}
                        style={{
                          position: "absolute",
                          top: -6,
                          right: -6,
                          backgroundColor: "white",
                          borderRadius: "50%",
                          boxShadow: "0 0 2px rgba(0,0,0,0.3)",
                        }}
                        size="sm"
                      />
                    )}
                  </Button>
                );
              })}
            </Box>
          </ScrollArea> */}

          <ScrollArea h={480}>
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
          </ScrollArea>
        </Box>
      </UIGlobal_Modal>
    </>
  );
};
