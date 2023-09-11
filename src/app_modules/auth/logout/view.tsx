"use client";
import { ActionIcon, Button, Center, Group, Modal } from "@mantine/core";
import toast from "react-simple-toasts";
import { redirect, useRouter } from "next/navigation";
import { s_getOneUser } from "@/app_modules/home/state/s_get_one";
import { useAtom } from "jotai";
import { deleteCookies } from "../fun/fun-logout";
import { IconLogout } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Warna } from "@/app/lib/warna";



export default function Logout() {
  const router = useRouter();
  const [dataUser, setDataUser] = useAtom(s_getOneUser);
  const [open, setOpen] = useDisclosure(false);

  async function onOut() {
    await fetch("/api/auth/logout").then((res) =>
      res.json().then((val) => {
        // console.log(val);
        if (val.status == 200) {
          toast("Logout")
          router.push("/dev/auth/login");
        }
      })
    )
    // await deleteCookies()
  }
  return (
    <>
      <ActionIcon>
        <IconLogout color="red" onClick={setOpen.open} />
      </ActionIcon>
      <Modal
        opened={open}
        onClose={setOpen.close}
        centered
        withCloseButton={false}
        title="Anda ingin keluar ?"
      >
        <Center>
          <Group align="center">
            <Button
              compact
              radius={"xl"}
              bg={Warna.hijau_muda}
              color="green"
              onClick={() => setOpen.close()}
            >
              Tidak
            </Button>
            <Button
              compact
              radius={"xl"}
              bg={Warna.merah}
              color="red"
              onClick={() => onOut()}
            >
              Keluar
            </Button>
          </Group>
        </Center>
      </Modal>
    </>
  );
}
