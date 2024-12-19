import { MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_BoxInformation, ComponentGlobal_BoxUploadImage, ComponentGlobal_LoadImage, } from "@/app_modules/_global/component";
import { AspectRatio, Box, Button, FileButton, Group, Image, Select, Stack, Text, TextInput, } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconCamera } from "@tabler/icons-react";
import _ from "lodash";
import { useState } from "react";
import { Investasi_ComponentButtonUpdateDataInvestasi } from "../../_component";
import { apiGetMasterInvestasi, apiGetOneInvestasiById } from "../../_lib/api_interface";
import { IDataInvestasi } from "../../_lib/type_investasi";
import { useParams } from "next/navigation";
import SkeletonEditInvestasi from "./skeleton_edit_investasi";

export function Investasi_ViewEditInvestasiNew() {
   const param = useParams<{ id: string }>()
   const [loading, setLoading] = useState(true)
   const [loadingMasterInvestor, setLoadingMasterInvestor] = useState(true)
   const [loadingMasterPeriodeDeviden, setLoadingMasterPeriodeDeviden] = useState(true)
   const [loadingMasterPembagianDeviden, setLoadingMasterPembagianDeviden] = useState(true)
   const [periodeDeviden, setPeriodeDeviden] = useState<any[]>([]);
   const [pembagianDeviden, setPembagianDeviden] = useState<any[]>([]);
   const [pencarianInvestor, setPencarianInvestor] = useState<any[]>([]);
   const [data, setData] = useState<IDataInvestasi>();
   const [file, setFile] = useState<File | null>(null);
   const [img, setImg] = useState<any | null>();
   const [target, setTarget] = useState("");
   const [harga, setHarga] = useState("");
   const [totalLembar, setTotalLembar] = useState<any>("");


   async function onGetOneInvestasiById() {
      try {
         setLoading(true)
         const response = await apiGetOneInvestasiById(param.id)
         if (response.success) {
            setData(response.data)
            setTotalLembar(response.data.totalLembar)
         }
      } catch (error) {
         console.error(error)
      } finally {
         setLoading(false)
      }
   }

   async function onGetMasterInvestor() {
      try {
         setLoadingMasterInvestor(true)
         const response = await apiGetMasterInvestasi("?cat=pencarian-investor")
         if (response.success) {
            setPencarianInvestor(response.data)
         }
      } catch (error) {
         console.log(error)
      } finally {
         setLoadingMasterInvestor(false)
      }
   }

   async function onGetMasterPeriodeDeviden() {
      try {
         setLoadingMasterPeriodeDeviden(true)
         const response = await apiGetMasterInvestasi("?cat=periode-deviden")
         if (response.success) {
            setPeriodeDeviden(response.data)
         }
      } catch (error) {
         console.log(error)
      } finally {
         setLoadingMasterPeriodeDeviden(false)
      }
   }


   async function onGetMasterPembagianDeviden() {
      try {
         setLoadingMasterPembagianDeviden(true)
         const response = await apiGetMasterInvestasi("?cat=pembagian-deviden")
         if (response.success) {
            setPembagianDeviden(response.data)
         }
      } catch (error) {
         console.log(error)
      } finally {
         setLoadingMasterPembagianDeviden(false)
      }
   }

   useShallowEffect(() => {
      onGetOneInvestasiById()
      onGetMasterInvestor()
      onGetMasterPeriodeDeviden()
      onGetMasterPembagianDeviden()
   }, [])

   async function onTotalLembar({ target, harga, }: { target?: number | any; harga?: number | any; }) {
      if (target !== 0 && harga !== 0) {
         const hasil: any = target / harga;
         const result = _.floor(hasil === Infinity ? 0 : hasil);
         setTotalLembar(result.toString());
      }
   }

   return (
      <>
         <Stack px={"sm"}>
            {
               loading ?
                  <SkeletonEditInvestasi />
                  :
                  <>
                     <Stack spacing={0}>
                        <Box mb={"sm"}>
                           <ComponentGlobal_BoxInformation informasi="Gambar investasi bisa berupa ilustrasi, poster atau foto terkait investasi" />
                        </Box>
                        <ComponentGlobal_BoxUploadImage>
                           {img ? (
                              <AspectRatio ratio={1 / 1} mt={5} maw={300} mx={"auto"}>
                                 <Image style={{ maxHeight: 250 }} alt="Avatar" src={img} />
                              </AspectRatio>
                           ) : (
                              <ComponentGlobal_LoadImage maw={300} fileId={String(data?.imageId)} />
                           )}
                        </ComponentGlobal_BoxUploadImage>
                        {/* Upload Foto */}
                        <Group position="center">
                           <FileButton
                              onChange={async (files: any) => {
                                 try {
                                    const buffer = URL.createObjectURL(
                                       new Blob([new Uint8Array(await files.arrayBuffer())])
                                    );
                                    setImg(buffer);
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
                                    leftIcon={<IconCamera color="black" />}
                                    radius={50}
                                    bg={MainColor.yellow}
                                    color="yellow"
                                    c={"black"}
                                 >
                                    Upload Gambar
                                 </Button>
                              )}
                           </FileButton>
                        </Group>
                     </Stack>


                     <TextInput
                        styles={{
                           label: {
                              color: "white",
                           },
                        }}
                        withAsterisk
                        label="Judul Investasi"
                        placeholder="Judul investasi"
                        maxLength={100}
                        value={data?.title}
                        onChange={(val) => {
                           setData({
                              ...data as any,
                              title: val.target.value,
                           });
                        }}
                     />

                     <TextInput
                        styles={{
                           label: {
                              color: "white",
                           },
                        }}
                        icon={<Text fw={"bold"}>Rp.</Text>}
                        min={0}
                        withAsterisk
                        label="Dana Dibutuhkan"
                        placeholder="0"
                        value={target ? target : data?.targetDana}
                        onChange={(val) => {
                           const match = val.currentTarget.value
                              .replace(/\./g, "")
                              .match(/^[0-9]+$/);

                           if (val.currentTarget.value === "") return setTarget(0 + "");
                           if (!match?.[0]) return null;

                           const nilai = val.currentTarget.value.replace(/\./g, "");
                           const targetNilai = Intl.NumberFormat("id-ID").format(+nilai);

                           onTotalLembar({
                              target: +nilai,
                              harga: +Number(data?.hargaLembar),
                           });

                           setTarget(targetNilai);
                           setData({
                              ...data as any,
                              targetDana: nilai as string,
                           });
                        }}
                     />

                     <TextInput
                        styles={{
                           label: {
                              color: "white",
                           },
                        }}
                        icon={<Text fw={"bold"}>Rp.</Text>}
                        min={0}
                        withAsterisk
                        label="Harga Per Lembar"
                        placeholder="0"
                        value={harga ? harga : data?.hargaLembar}
                        onChange={(val) => {
                           try {
                              const match = val.currentTarget.value
                                 .replace(/\./g, "")
                                 .match(/^[0-9]+$/);

                              if (val.currentTarget.value === "") return setHarga(0 + "");

                              if (!match?.[0]) return null;

                              const nilai = val.currentTarget.value.replace(/\./g, "");
                              const targetNilai = Intl.NumberFormat("id-ID").format(+nilai);

                              onTotalLembar({
                                 harga: +nilai,
                                 target: +Number(data?.targetDana),
                              });

                              setHarga(targetNilai);
                              setData({
                                 ...data as any,
                                 hargaLembar: nilai as string,
                              });
                           } catch (error) {
                              console.log(error);
                           }
                        }}
                     />

                     <TextInput
                        description="*Total lembar dihitung dari, Target Dana / Harga Perlembar"
                        label="Total Lembar"
                        value={harga === "0" ? "0" : target === "0" ? "0" : totalLembar}
                        readOnly
                        styles={{
                           label: {
                              color: "white",
                           },

                           input: {
                              backgroundColor: "whitesmoke",
                           },
                        }}
                     />

                     <TextInput
                        styles={{
                           label: {
                              color: "white",
                           },
                        }}
                        rightSection={
                           <Text fw={"bold"} c={"gray"}>
                              %
                           </Text>
                        }
                        withAsterisk
                        type="number"
                        label={"Rasio Keuntungan / ROI %"}
                        placeholder="Masukan rasio keuntungan"
                        value={data?.roi}
                        onChange={(val) => {
                           setData({
                              ...data as any,
                              roi: val.target.value,
                           });
                        }}
                     />

                     <Select
                        styles={{
                           label: {
                              color: "white",
                           },
                        }}
                        withAsterisk
                        label="Pencarian Investor"
                        placeholder={loadingMasterInvestor ? "Loading..." : "Pilih batas waktu"}
                        data={pencarianInvestor.map((e) => ({
                           value: e.id,
                           label: e.name + " " + "hari",
                        }))}
                        value={data?.masterPencarianInvestorId}
                        onChange={(val) => {
                           setData({
                              ...(data as any),
                              masterPencarianInvestorId: val,
                           });
                        }}
                     />

                     <Select
                        styles={{
                           label: {
                              color: "white",
                           },
                        }}
                        withAsterisk
                        label="Periode Deviden"
                        placeholder={loadingMasterPeriodeDeviden ? "Loading..." : "Pilih batas waktu"}
                        data={periodeDeviden.map((e) => ({ value: e.id, label: e.name }))}
                        value={data?.masterPeriodeDevidenId}
                        onChange={(val) => {
                           setData({
                              ...(data as any),
                              masterPeriodeDevidenId: val,
                           });
                        }}
                     />

                     <Select
                        styles={{
                           label: {
                              color: "white",
                           },
                        }}
                        withAsterisk
                        label="Pembagian Deviden"
                        placeholder={loadingMasterPembagianDeviden ? "Loading..." : "Pilih batas waktu"}
                        data={pembagianDeviden.map((e) => ({
                           value: e.id,
                           label: e.name + " " + "bulan",
                        }))}
                        value={data?.masterPembagianDevidenId}
                        onChange={(val) => {
                           setData({
                              ...(data as any),
                              masterPembagianDevidenId: val,
                           });
                        }}
                     />

                     <Investasi_ComponentButtonUpdateDataInvestasi
                        data={data as any}
                        file={file as any}
                        totalLembar={totalLembar}
                     />
                  </>
            }
         </Stack>
      </>
   );
}
