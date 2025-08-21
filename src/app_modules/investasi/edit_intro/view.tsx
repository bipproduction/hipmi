"use client";

import {
  AspectRatio,
  Button,
  Center,
  Divider,
  FileButton,
  Group,
  Image,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import { MODEL_DEFAULT_MASTER_OLD } from "@/app_modules/model_global/model_default_master";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";
import { MODEL_INVESTASI } from "../_lib/interface";
import funEditInvestasi from "../fun/fun_edit_investasi";

export default function EditIntroInvestasi({
  dataInvestasi,
  listPencarian,
  listPeriode,
  listPembagian,
}: {
  dataInvestasi: MODEL_INVESTASI;
  listPencarian: MODEL_DEFAULT_MASTER_OLD[];
  listPeriode: MODEL_DEFAULT_MASTER_OLD[];
  listPembagian: MODEL_DEFAULT_MASTER_OLD[];
}) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [scroll, scrollTo] = useWindowScroll();

  const [edit_inves, setEdit_inves] = useState(dataInvestasi);
  const [img, setImg] = useState<any | null>();
  const [fl, setFl] = useState<File | null>(null);
  const [totalLembar, setTotalLembar] = useState<number | any>(
    edit_inves.totalLembar
  );

  async function onTotalLembar(target: any, harga: any) {
    const hasil: any = target / harga;
    setTotalLembar(_.floor(hasil === Infinity ? 0 : hasil));
  }

  async function onUpdate() {
    const body = edit_inves;
    if (_.values(edit_inves).includes(""))
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi data");

    const fd = new FormData();
    fd.append("file", fl as any);

    await funEditInvestasi(fd, body).then(async (res) => {
      res.status === 200
        ? (ComponentGlobal_NotifikasiBerhasil(res.message), router.back())
        : ComponentGlobal_NotifikasiGagal(res.message);
    });
  }

  return (
    <>
      <UIGlobal_Modal
        title={"Anda yakin ingin menyimpan perubahan ini?"}
        opened={opened}
        close={close}
        buttonKiri={
          <Button radius={"xl"} onClick={close} bg={"red"} color="red">
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            radius={"xl"}
            onClick={onUpdate}
            bg={MainColor.yellow}
            color="yellow"
            c={"black"}
          >
            Simpan
          </Button>
        }
      />

      <Stack spacing={"xs"} px={"md"}>
        {img ? (
          <Center>
            <Paper h={300} w={200} withBorder shadow="lg" bg={"gray.1"}>
              <Stack justify="center" align="center" h={"100%"}>
                <IconUpload color="gray" />
                <Text fz={10} fs={"italic"} c={"gray"} fw={"bold"}>
                  Upload Gambar
                </Text>
              </Stack>
            </Paper>
          </Center>
        ) : (
          <AspectRatio ratio={1 / 1} mah={300}>
            <Paper
              style={{
                border: `2px solid ${AccentColor.softblue}`,
                backgroundColor: AccentColor.blue,
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <Image
                alt="Foto"
                src={RouterInvestasi_OLD.api_gambar + `${edit_inves.imagesId}`}
                maw={200}
              />
            </Paper>
          </AspectRatio>
        )}

        {/* <AspectRatio ratio={16 / 9}>
          <Paper withBorder radius={"md"}>
            {img ? (
              <Image alt="" src={img} />
            ) : (
              <Image
                alt=""
                src={RouterInvestasi.api_gambar + `${edit_inves.imagesId}`}
              />
            )}
          </Paper>
        </AspectRatio> */}

        <Group position="center" mb={"md"}>
          <FileButton
            onChange={async (files: any) => {
              try {
                const buffer = URL.createObjectURL(
                  new Blob([new Uint8Array(await files.arrayBuffer())])
                );

                setImg(buffer);
                setFl(files);
              } catch (error) {
                console.log(error);
              }
            }}
            accept="image/png,image/jpeg"
          >
            {(props) => (
              <Button
                {...props}
                radius={50}
                leftIcon={<IconUpload size={12} />}
                bg={MainColor.yellow}
                color="yellow"
                c={"black"}
              >
                Upload Gambar
              </Button>
            )}
          </FileButton>
        </Group>

        <TextInput
          styles={{
            label: {
              color: "white",
            },
          }}
          label="Judul Proyek"
          placeholder={"Masukan Judul"}
          value={edit_inves.title}
          maxLength={100}
          error={
            edit_inves.title === "" ? (
              <ComponentGlobal_ErrorInput text="Masukan judul" />
            ) : (
              ""
            )
          }
          onChange={(val) => {
            setEdit_inves({
              ...edit_inves,
              title: val.target.value,
            });
          }}
        />

        <NumberInput
          styles={{
            label: {
              color: "white",
            },
          }}
          label="Dana Dibutuhan"
          type="number"
          value={+edit_inves.targetDana}
          onChange={(val) => {
            setEdit_inves({
              ...edit_inves,
              targetDana: val as any,
            });
          }}
        />

        <NumberInput
          styles={{
            label: {
              color: "white",
            },
          }}
          label="Harga Per Lember"
          type="number"
          value={+edit_inves.hargaLembar}
          onChange={(val) => {
            setEdit_inves({
              ...edit_inves,
              hargaLembar: val as any,
            });
            onTotalLembar(edit_inves.targetDana, val);
          }}
        />

        {/* Total Lembar */}
        <Stack
          spacing={3}
          style={{
            color: "white",
          }}
        >
          <Text fz={"sm"} fw={500}>
            Total Lembar
          </Text>
          <Stack spacing={0}>
            <Text>{totalLembar}</Text>
            <Divider />
          </Stack>
          <Text fz={10}>
            *Total lembar dihitung dari, Target Dana : Harga Perlembar
          </Text>
        </Stack>

        <NumberInput
          styles={{
            label: {
              color: "white",
            },
          }}
          label="Rasio Keuntungan / ROI"
          type="number"
          value={+edit_inves.roi}
          onChange={(val) => {
            setEdit_inves({
              ...edit_inves,
              roi: val as any,
            });
          }}
        />

        {/* Select Start */}
        <Select
          styles={{
            label: {
              color: "white",
            },
          }}
          label="Pencarian Investor"
          data={listPencarian.map((e) => ({
            value: e.id,
            label: e.name + " " + "hari",
          }))}
          value={edit_inves.MasterPencarianInvestor.id}
          onChange={(val) => {
            setEdit_inves({
              ...(edit_inves as any),
              MasterPencarianInvestor: {
                id: val,
              },
            });
          }}
        />
        <Select
          styles={{
            label: {
              color: "white",
            },
          }}
          label="Periode Deviden"
          data={listPeriode.map((e) => ({
            value: e.id,
            label: e.name,
          }))}
          value={edit_inves.MasterPeriodeDeviden.id}
          onChange={(val) => {
            setEdit_inves({
              ...(edit_inves as any),
              MasterPeriodeDeviden: {
                id: val,
              },
            });
          }}
        />

        <Select
          styles={{
            label: {
              color: "white",
            },
          }}
          label="Pembagian Deviden"
          data={listPembagian.map((e) => ({
            value: e.id,
            label: e.name + " " + `${"bulan"}`,
          }))}
          value={edit_inves.MasterPembagianDeviden.id}
          onChange={(val) => {
            setEdit_inves({
              ...(edit_inves as any),
              MasterPembagianDeviden: {
                id: val,
              },
            });
          }}
        />
        {/* Select End */}
        <Button
          my={"xl"}
          radius={50}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
          onClick={() => {
            scrollTo({ y: 0 });
            open();
          }}
        >
          Update
        </Button>
      </Stack>
    </>
  );
}
