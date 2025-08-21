import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import { Stack } from "@mantine/core";
import { Admin_V3_ComponentDetail } from "../../_components_v3/comp_detail_data";
import { ComponentGlobal_TampilanAngkaRatusan, ComponentGlobal_TampilanRupiah } from "@/app_modules/_global/component";

export function AdminInvestasi_ComponentNewDetailData({
  data,
}: {
  data: MODEL_INVESTASI;
}) {
  const listItem = [
    {
      label: "Nama",
      value: data?.author.username,
    },
    {
      label: "Nomor",
      value: `+${data?.author.nomor}`,
    },
    {
      label: "Judul",
      value: data?.title,
    },
    {
      label: "Dana Dibutuhkan",
      value: (
        <ComponentGlobal_TampilanRupiah
          nominal={+data?.targetDana}
          fontWeight={"normal"}
        />
      ),
    },
    {
      label: "Harga Perlembar",
      value: (
        <ComponentGlobal_TampilanRupiah
          nominal={+data?.hargaLembar}
          fontWeight={"normal"}
        />
      ),
    },
    {
      label: "Total Lembar",
      value: (
        <ComponentGlobal_TampilanAngkaRatusan nominal={+data?.totalLembar}  fontWeight={"normal"}  />
      ),
    },
    {
      label: "ROI",
      value: `${data?.roi} %`,
    },
    {
      label: "Pembagian Deviden",
      value: data?.MasterPembagianDeviden.name,
    },
    {
      label: "Jadwal Pembagian",
      value: data?.MasterPeriodeDeviden.name,
    },
    {
      label: "Pencarian Investor",
      value: data?.MasterPencarianInvestor.name,
    },
  ];
  return (
    <>
      <Admin_ComponentBoxStyle>
        <Stack>
          {listItem.map((e, i) => (
            <Admin_V3_ComponentDetail item={e} key={i} />
          ))}
        </Stack>
      </Admin_ComponentBoxStyle>
    </>
  );
}
