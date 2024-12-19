import { DIRECTORY_ID } from "@/app/lib";
import { TokenStorage } from "@/app/lib/token";
import {
  Button,
  Center,
  FileButton,
  Image,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconCamera, IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import { AccentColor, MainColor } from "../_global/color";
import { funGlobal_UploadToStorage } from "../_global/fun";
import { ComponentGlobal_NotifikasiPeringatan } from "../_global/notif_global";

export default function Coba_UploadFile() {
  const [data, setData] = useState<any>();
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<any | null>();

  async function loadListDir(setData: any) {
    const rootDirEndPoint = await fetch(
      "https://wibu-storage.wibudev.com/api/dir/root/list",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TokenStorage.value}`,
        },
      }
    );
    const dataDir = await rootDirEndPoint.json();
    // console.log(dataDir);

    const dirHipmiEndPoint = await fetch(
      `https://wibu-storage.wibudev.com/api/dir/${dataDir.dirs[0].id}/list`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TokenStorage.value}`,
        },
      }
    );

    const hipmiDir = await dirHipmiEndPoint.json();
    // console.log(hipmiDir.dirs[0]);
    setData(hipmiDir.dirs[0]);
  }

  // async function CcekToken() {
  //    const rootDirEndPoint = await fetch(
  //      "https://wibu-storage.wibudev.com/api/dir/root/list",
  //      {
  //        method: "GET",
  //        headers: {
  //          "Content-Type": "application/json",
  //          Authorization: `Bearer ${process.env.WS_APIKEY}`,
  //        },
  //      }
  //    );
  //    const dataDir = await rootDirEndPoint.json();
  //    console.log(dataDir);
  // }

  useShallowEffect(() => {
    loadListDir(setData);
    // CekToken()
  }, [setData]);

  const [imagesId, setImagesId] = useState("");
  return (
    <Stack bg={"gray"} h={"100vh"}>
      <Stack p={"lg"} bg={"gray"}>
        <Stack align="center" spacing={"xs"}>
          {images ? (
            <Image alt="" src={images} height={300} width={200} />
          ) : (
            <Paper h={300} w={200} withBorder shadow="lg" bg={"gray.1"}>
              <Stack justify="center" align="center" h={"100%"}>
                <IconUpload color="gray" />
                <Text fz={10} fs={"italic"} c={"gray"} fw={"bold"}>
                  Upload Gambar
                </Text>
              </Stack>
            </Paper>
          )}

          <FileButton
            onChange={async (files: any | null) => {
              try {
                const buffer = URL.createObjectURL(
                  new Blob([new Uint8Array(await files.arrayBuffer())])
                );
                setImages(buffer);
                setFile(files);
              } catch (error) {
                console.log(error);
              }
            }}
            accept="image/png,image/jpeg"
          >
            {(props) => (
              <Button
                {...props}
                radius={"xl"}
                w={100}
                style={{
                  backgroundColor: MainColor.yellow,
                  border: `1px solid ${AccentColor.yellow}`,
                }}
              >
                <IconCamera />
              </Button>
            )}
          </FileButton>
        </Stack>

        <Center>
          <Button
            onClick={async () => {
              const res = await funGlobal_UploadToStorage({
                file: file as any,
                dirId: DIRECTORY_ID.job_image,
              });

              console.log(res?.data?.id);
            }}
          >
            Simpan
          </Button>
        </Center>
      </Stack>
      {/* <Stack p={"lg"}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Stack> */}

      {/* <Card>
        <Image
          height={200}
          width={150}
          mah={300}
          maw={200}
          alt="Foto"
          src={
            "https://wibu-storage.wibudev.com/api/files/cm0xihezt000nacbb89k2zo1j"
          }
        />
      </Card> */}
    </Stack>
  );
}

async function coba_ButtonFileUpload({
  file,
  dirId,
  onDone,
}: {
  file: File;
  dirId: string;
  onDone: () => void;
}) {
  if (!file) return ComponentGlobal_NotifikasiPeringatan("Tidak ada file");

  const allowedMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/gif",
    "text/csv",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
  ];

  if (!allowedMimeTypes.includes(file.type))
    return ComponentGlobal_NotifikasiPeringatan("File tidak sesuai");

  if (file.size > 100 * 1024 * 1024)
    return ComponentGlobal_NotifikasiPeringatan("File terlalu besar");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("dirId", dirId);

  try {
    const res = await fetch("https://wibu-storage.wibudev.com/api/image/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${TokenStorage.value}`,
      },
    });

    const dataRes = await res.json();

    if (res.ok) {
      console.log("File Sukses Di Upload");
      console.log(dataRes);
    } else {
      const errorText = await res.text();
      console.log("jika error", errorText);
    }
  } catch (error) {
    console.error("Upload error:", error);
  } finally {
    onDone();
  }
}
