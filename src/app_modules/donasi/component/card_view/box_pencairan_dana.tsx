import { MainColor, AccentColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { Paper, Stack, Grid, Title, Text } from "@mantine/core";
import { MODEL_DONASI } from "../../model/interface";
import TampilanRupiahDonasi from "../tampilan_rupiah";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import { apiGetOneDonasiById } from "../../lib/api_donasi";

export function ComponentDonasi_BoxPencariranDana() {
  const param = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_DONASI | null>(null);
  const [loading, setLoading] = useState(true);

  useShallowEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true); 
      const response = await apiGetOneDonasiById(param.id, "semua");

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !data) {
    return <CustomSkeleton height={300} />;
  }
  
  return (
    <>
      <Paper
        style={{
          backgroundColor: MainColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          padding: "15px",
          cursor: "pointer",
          borderRadius: "10px",
          color: "white",
          marginBottom: "10px",
        }}
      >
        <Stack>
          <Grid>
            <Grid.Col span={6}>
              <Title order={5}>
                <TampilanRupiahDonasi nominal={data.totalPencairan} />
              </Title>
              <Text fz={"xs"}>Dana sudah dicairkan</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Title order={5}>{data.akumulasiPencairan} kali</Title>
              <Text fz={"xs"}>Pencairan dana</Text>
            </Grid.Col>
          </Grid>
          <ComponentGlobal_BoxInformation
            informasi=" Pencairan dana akan dilakukan oleh Admin HIPMI tanpa campur tangan
            pihak manapun, jika berita pencairan dana dibawah tidak sesuai
            dengan kabar yang diberikan oleh PENGGALANG DANA. Maka pegguna lain
            dapat melaporkannya pada Admin HIPMI !"
          />
        </Stack>
      </Paper>
    </>
  );
}