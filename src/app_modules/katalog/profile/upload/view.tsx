"use client";
import {
  ActionIcon,
  AspectRatio,
  Box,
  Button,
  Center,
  FileButton,
  FileInput,
  Group,
  Header,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { Dropzone } from "@mantine/dropzone";
import _ from "lodash";
import toast from "react-simple-toasts";
import { funUploadFoto } from "../fun/upload_foto";
import { useRouter } from "next/navigation";
import { IconChevronLeft } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { gs_Profile } from "../state/s_profile";
import { useShallowEffect } from "@mantine/hooks";
import { getFotoProfile } from "../fun/get-foto";
import { MyConsole } from "@/app_modules/fun";

export default function UploadFoto() {
  const [file, setFile] = useState<File | null>(null);
  const openRef: any = useRef<() => void>(null);
  const [loading, setLoading] = useState(false);
  const [hasilGambar, setHasilGambar] = useState<string | null>(null);
  const router = useRouter();

  const [valProfile, setProfile] = useAtom(gs_Profile);
  const [foto, setFoto] = useState<any | null>(null);

  useShallowEffect(() => {
    if (valProfile?.imagesId != null) {
      getFotoProfile(valProfile?.imagesId).then((res) => setFoto(res?.url));
    }
  }, [valProfile?.imagesId]);

  return (
    <>
      {/* {JSON.stringify(foto)} */}
      {/* <Image alt="Foto" src={`/api/profile/foto/${imgId}`}  /> */}

      <Paper radius={"md"}>
        <AspectRatio ratio={16 / 10} maw={500} mah={500} mx="auto">
          {foto && (
            <Image
              alt="Foto"
              src={foto ? `/api/profile/foto/${foto}` : `/aset/avatar.png`}
              height={200}
              radius={"lg"}
            />
          )}
        </AspectRatio>
      </Paper>
    </>
  );
}
