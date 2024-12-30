"use client";

import { ComponentGlobal_ErrorInput } from "@/app_modules/_global/component";
import { Select, Stack, TextInput } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { useState } from "react";
import { gmailRegex } from "../../component/regular_expressions";
import { Profile_ComponentCreateNewProfile } from "../_component";
import Profile_ViewUploadBackground from "./view_upload_background";
import Profile_ViewUploadFoto from "./view_upload_foto";

export default function CreateProfile() {
  const [imgPP, setImgPP] = useState<any | null>();
  const [imgBG, setImgBG] = useState<any | null>();
  const [fotoProfileId, setFotoProfileId] = useState("");
  const [backgroundProfileId, setBackgroundProfileId] = useState("");

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
          fotoProfileId={fotoProfileId}
          onSetFotoProfileId={setFotoProfileId}
        />

        <Profile_ViewUploadBackground
          imgBG={imgBG}
          backgroundProfileId={backgroundProfileId}
          onSetImgBG={setImgBG}
          onSetBackgroundProfileId={setBackgroundProfileId}
        />

        <Stack mb={"lg"}>
          <TextInput
            styles={{
              label: { color: "white" },
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
              label: { color: "white" },
            }}
            withAsterisk
            icon={<IconAt size={15} />}
            label="Email"
            maxLength={100}
            placeholder="Contoh: User@gmail.com"
            error={
              value.email.length > 0 && !value.email.match(gmailRegex) ? (
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
              label: { color: "white" },
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
              label: { color: "white" },
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
            fotoProfileId={fotoProfileId}
            backgroundProfileId={backgroundProfileId}
          />
        </Stack>
      </Stack>
    </>
  );
}
