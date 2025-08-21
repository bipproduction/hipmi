"use client";

import {
  AspectRatio,
  Center,
  Image,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { MODEL_JOB } from "../model/interface";

import {
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_ButtonUploadFileImage,
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoadImage,
} from "@/app_modules/_global/component";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { IconPhoto } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Job_ComponentButtonUpdate } from "../component";
import { clientLogger } from "@/util/clientLogger";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { apiGetJobById } from "../lib/api_fetch_job";
import { Job_SkeletonEdit } from "../component/skeleton/comp_skeleton_beranda";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

export default function Job_Edit() {
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();

  const param = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_JOB | null>(null);

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      const response = await apiGetJobById({
        id: param.id,
      });

      if (response.success) {
        setData(response.data);
      } else {
        setData(null);
      }
    } catch (error) {
      clientLogger.error("Error get data job", error);
      setData(null);
    }
  };

  if (!data) return <Job_SkeletonEdit />;

  return (
    <>
      <Stack>
        <Stack spacing={0}>
          <ComponentGlobal_BoxUploadImage>
            {img ? (
              <AspectRatio ratio={1 / 1} mt={5} maw={300} mx={"auto"}>
                <Image
                  style={{ maxHeight: 250 }}
                  alt="Foto"
                  height={250}
                  src={img}
                />
              </AspectRatio>
            ) : data.imageId ? (
              <ComponentGlobal_LoadImage fileId={data.imageId} />
            ) : (
              <Stack justify="center" align="center" h={"100%"}>
                <IconPhoto size={100} />
              </Stack>
            )}
          </ComponentGlobal_BoxUploadImage>

          <Center>
            <ComponentGlobal_ButtonUploadFileImage
              onSetFile={setFile}
              onSetImage={setImg}
            />
          </Center>
        </Stack>

        <ComponentGlobal_CardStyles color="black">
          <Stack>
            <TextInput
              styles={{
                label: {
                  color: "white",
                },
              }}
              withAsterisk
              label="Judul"
              placeholder="Masukan judul lowongan kerja"
              value={data.title}
              maxLength={100}
              onChange={(val) => {
                setData({
                  ...data,
                  title: val.currentTarget.value,
                });
              }}
            />

            <Stack spacing={3}>
              <Text fz={"sm"} c={"white"}>
                Syarat & Ketentuan
                <Text inherit span c={"red"}>
                  {" "}
                  *
                </Text>
              </Text>
              <Stack spacing={5}>
                <ReactQuill
                  style={{
                    backgroundColor: "white",
                  }}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      ["bold", "italic", "underline", "link"],
                      // [{ align: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["clean"],
                    ],
                  }}
                  theme="snow"
                  value={data.content}
                  onChange={(val) => {
                    setData({
                      ...data,
                      content: val,
                    });
                  }}
                />
                <ComponentGlobal_InputCountDown
                  maxInput={500}
                  lengthInput={data.content.length}
                />
              </Stack>
            </Stack>
            <Stack spacing={3}>
              <Text fz={"sm"} c={"white"}>
                Deskripsi
                <Text inherit span c={"red"}>
                  {" "}
                  *
                </Text>
              </Text>
              <Stack spacing={5}>
                <ReactQuill
                  style={{
                    backgroundColor: "white",
                  }}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      ["bold", "italic", "underline", "link"],
                      // [{ align: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["clean"],
                    ],
                  }}
                  theme="snow"
                  value={data.deskripsi}
                  onChange={(val) => {
                    setData({
                      ...data,
                      deskripsi: val,
                    });
                  }}
                />
                <ComponentGlobal_InputCountDown
                  maxInput={500}
                  lengthInput={data.deskripsi.length}
                />
              </Stack>
            </Stack>
          </Stack>
        </ComponentGlobal_CardStyles>

        <Job_ComponentButtonUpdate value={data as any} file={file as any} />
      </Stack>
    </>
  );
}
