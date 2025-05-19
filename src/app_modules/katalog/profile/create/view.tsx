"use client";

import { MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_ErrorInput } from "@/app_modules/_global/component";
import { Select, Stack, TextInput } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { useState } from "react";
import { emailRegex } from "../../component/regular_expressions";
import { Profile_ComponentCreateNewProfile } from "../_component";
import Profile_ViewUploadBackground from "./view_upload_background";
import Profile_ViewUploadFoto from "./view_upload_foto";
import { masterJenisKelamin } from "@/app_modules/_global/lib/master_jenis_kelamin";

export default function CreateProfile() {
  const [filePP, setFilePP] = useState<File | null>(null);
  const [imgPP, setImgPP] = useState<any | null>();
  const [fileBG, setFileBG] = useState<File | null>(null);
  const [imgBG, setImgBG] = useState<any | null>();

  const [value, setValue] = useState({
    name: "",
    email: "",
    alamat: "",
    jenisKelamin: "",
  });

  return (
    <>
      <Stack px={"sm"} spacing={40}>
        <Profile_ViewUploadFoto
          imgPP={imgPP}
          onSetImgPP={setImgPP}
          filePP={filePP}
          onSetFilePP={setFilePP}
        />

        <Profile_ViewUploadBackground
          imgBG={imgBG}
          onSetImgBG={setImgBG}
          fileBG={fileBG}
          onSetFileBG={setFileBG}
        />

        <Stack mb={"lg"}>
          <TextInput
            styles={{
              label: { color: MainColor.white },
              input: { backgroundColor: MainColor.white },
              required: { color: MainColor.red },
            }}
            withAsterisk
            label={"Nama"}
            maxLength={50}
            placeholder="Nama lengkap"
            onChange={(val) => {
              setValue({
                ...value,
                name: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              label: { color: MainColor.white },
              input: { backgroundColor: MainColor.white },
              required: { color: MainColor.red },
            }}
            withAsterisk
            icon={<IconAt size={15} />}
            label="Email"
            maxLength={100}
            placeholder="Contoh: User@gmail.com"
            error={
              value.email.length > 0 && !value.email.match(emailRegex) ? (
                <ComponentGlobal_ErrorInput text="Invalid Email" />
              ) : (
                ""
              )
            }
            onChange={(val) => {
              setValue({
                ...value,
                email: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              label: { color: MainColor.white },
              input: { backgroundColor: MainColor.white },
              required: { color: MainColor.red },
            }}
            withAsterisk
            label="Alamat"
            maxLength={100}
            placeholder="Alamat lengkap"
            onChange={(val) => {
              setValue({
                ...value,
                alamat: val.target.value,
              });
            }}
          />

          <Select
            styles={{
              label: { color: MainColor.white },
              input: { backgroundColor: MainColor.white },
              required: { color: MainColor.red },
              dropdown: { backgroundColor: MainColor.white },
            }}
            withAsterisk
            label="Jenis Kelamin"
            placeholder="Pilih satu"
            data={[
              { value: "Laki-laki", label: "Laki-laki" },
              { value: "Perempuan", label: "Perempuan" },
            ]}
            onChange={(val) => {
              setValue({
                ...value,
                jenisKelamin: val as string,
              });
            }}
          />

          <Profile_ComponentCreateNewProfile
            value={value as any}
            filePP={filePP as File}
            fileBG={fileBG as File}
          />
        </Stack>
      </Stack>
    </>
  );
}
