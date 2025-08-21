import {
  ComponentGlobal_TampilanRupiah,
  ComponentGlobal_TampilanAngkaRatusan,
} from "@/app_modules/_global/component";
import { Stack, Grid, Text } from "@mantine/core";
import { data } from "autoprefixer";
import { Investasi_ComponentStylesCard } from "../../comp_card_border_and_background";
import { MODEL_INVOICE_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import { MainColor } from "@/app_modules/_global/color";

export function Investasi_ComponentBoxHargaDanLembarSaham({
  data,
}: {
  data: MODEL_INVOICE_INVESTASI;
}) {
  return (
    <>
      <Investasi_ComponentStylesCard>
        <Stack>
          <Stack spacing={5}>
            <Grid>
              <Grid.Col span={6}>
                <Text c={MainColor.white} fw={"bold"}>Transaksi Saham</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <ComponentGlobal_TampilanRupiah
                  fontWeight={"bold"}
                  nominal={+data?.nominal}
                />
              </Grid.Col>
            </Grid>

            <Grid>
              <Grid.Col span={6}>
                <Text c={MainColor.white} fw={"bold"}>Saham Terbeli</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <ComponentGlobal_TampilanAngkaRatusan
                  fontWeight={"bold"}
                  nominal={+data?.lembarTerbeli}
                  textAfter="Lembar"
                />
              </Grid.Col>
            </Grid>
          </Stack>
        </Stack>
      </Investasi_ComponentStylesCard>
    </>
  );
}
