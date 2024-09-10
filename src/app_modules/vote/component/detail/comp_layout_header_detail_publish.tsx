import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import { AccentColor } from "@/app_modules/_global/color";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { UIGlobal_Modal } from "@/app_modules/_global/ui";
import UIGlobal_Drawer from "@/app_modules/_global/ui/ui_drawer";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import {
  ActionIcon,
  Button,
  Drawer,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { IconArchive, IconUsersGroup, IconX } from "@tabler/icons-react";
import { IconDots, IconDotsVertical } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { voting_funGetOneVotingbyId } from "../../fun/get/fun_get_one_by_id";
import { useShallowEffect } from "@mantine/hooks";
import { MODEL_VOTING } from "../../model/interface";
import { voting_funUpdateIsArsipById } from "../../fun";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";

export function Voting_ComponentLayoutHeaderDetailPublish({
  votingId,
  title,
  userLoginId,
}: {
  votingId: string;
  title: string;
  userLoginId: string;
}) {
  const [data, setData] = useState<MODEL_VOTING>();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useShallowEffect(() => {
    onLoadData({ onSetData: setData });
  }, [setData]);

  async function onLoadData({ onSetData }: { onSetData: any }) {
    const dataVoting = await voting_funGetOneVotingbyId(votingId);
    onSetData(dataVoting);
  }

  async function onUpdateStatusArsip({ isArsip }: { isArsip: boolean }) {
    const res = await voting_funUpdateIsArsipById({
      votingId,
      isArsip: isArsip,
    });
    if (res.status === 200) {
      setOpenModal(false);
      ComponentGlobal_NotifikasiBerhasil(res.message);
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  }

  return (
    <>
      <UIGlobal_LayoutHeaderTamplate
        title={title}
        customButtonRight={
          <ActionIcon
            variant="transparent"
            onClick={() => {
              setOpenDrawer(true);
            }}
          >
            <IconDotsVertical color="white" />
          </ActionIcon>
        }
      />

      {/* Drawer */}
      <Drawer
        opened={openDrawer}
        onClose={() => setOpenDrawer(false)}
        position={"bottom"}
        size={"auto"}
        withCloseButton={false}
        styles={{
          content: {
            padding: 0,
            position: "absolute",
            margin: "auto",
            backgroundColor: "transparent",
            left: 0,
            right: 0,
            width: 500,
          },
          body: {
            backgroundColor: AccentColor.darkblue,
            borderTop: `2px solid ${AccentColor.blue}`,
            borderRight: `1px solid ${AccentColor.blue}`,
            borderLeft: `1px solid ${AccentColor.blue}`,
            borderRadius: "20px 20px 0px 0px",
            color: "white",
            paddingBottom: "5%",
          },
        }}
      >
        <Stack spacing={"xs"}>
          <Group position="right">
            <ActionIcon
              onClick={() => setOpenDrawer(false)}
              variant="transparent"
            >
              <IconX color="white" />
            </ActionIcon>
          </Group>

          {/* Check Author */}
          {data?.authorId === userLoginId ? (
            <BoxIsAuthor
              votingId={votingId}
              onSetDrawer={(val: any) => {
                setOpenDrawer(val.drawer);
                setOpenModal(val.modal);
              }}
            />
          ) : (
            <BoxNotAuthor votingId={votingId} />
          )}
        </Stack>
      </Drawer>

      {/* Modal */}
      <UIGlobal_Modal
        opened={openModal}
        close={() => setOpenModal(false)}
        title={`Anda yakin ingin ${data?.isArsip ? "mempublish" : "mengarsipkan"} voting?`}
        buttonKanan={
          <Button
            onClick={() => {
              data?.isArsip
                ? onUpdateStatusArsip({ isArsip: false })
                : onUpdateStatusArsip({ isArsip: true });

              // ON UPDATE DISINI
            }}
            radius={"xl"}
            color="green"
          >
            Iya
          </Button>
        }
        buttonKiri={
          <Button onClick={() => setOpenModal(false)} radius={"xl"}>
            Batal
          </Button>
        }
      />
    </>
  );
}

function BoxIsAuthor({
  votingId,
  onSetDrawer,
}: {
  votingId: string;
  onSetDrawer: (vaL: any) => void;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <SimpleGrid cols={2}>
        <Stack align="center" spacing={"xs"}>
          {/* Daftar Kontributor */}
          <ActionIcon
            variant="transparent"
            c="white"
            onClick={() => {
              setIsLoading(true);
              router.push(RouterVote.daftar_kontributor + votingId, {
                scroll: false,
              });
            }}
          >
            {isLoading ? <ComponentGlobal_Loader /> : <IconUsersGroup />}
          </ActionIcon>
          <Text fz={"sm"} align="center" color="white">
            Daftar Kontributor
          </Text>
        </Stack>
        <Stack align="center" spacing={"xs"}>
          {/* Arsip button */}
          <ActionIcon
            variant="transparent"
            c="white"
            onClick={() => {
              onSetDrawer({
                drawer: false,
                modal: true,
              });
              //   setOpenModal(true);
            }}
          >
            <IconArchive />
          </ActionIcon>
          <Text fz={"sm"} align="center" color="white">
            Update Arsip
          </Text>
        </Stack>
      </SimpleGrid>
    </>
  );
}

function BoxNotAuthor({ votingId }: { votingId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [pageId, setPageId] = useState("");

  return (
    <>
      <SimpleGrid cols={1}>
        <Stack align="center" spacing={"xs"}>
          <ActionIcon
            variant="transparent"
            c="white"
            onClick={() => {
              setIsLoading(true);
              router.push(RouterVote.daftar_kontributor + votingId, {
                scroll: false,
              });
            }}
          >
            {isLoading ? <ComponentGlobal_Loader /> : <IconUsersGroup />}
          </ActionIcon>
          <Text fz={"sm"} align="center" color="white">
            Daftar Kontributor
          </Text>
        </Stack>
      </SimpleGrid>
    </>
  );
}
