import { MODEL_EVENT } from "@/app_modules/event/_lib/interface";
import { Badge, Grid, Stack, Text } from "@mantine/core";
import moment from "moment";
import "moment/locale/id";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import { Admin_V3_ComponentDetail } from "../../_components_v3/comp_detail_data";

function AdminEvent_ComponentDetailData({
  data,
}: {
  data: MODEL_EVENT | null;
}) {
  const listData = [
    {
      label: "Nama",
      value: data?.Author.Profile.name,
    },
    {
      label: "Username",
      value: data?.Author.username,
    },
    {
      label: "Nomor",
      value: `+ ${data?.Author.nomor}`,
    },
    {
      label: "Status",
      value: (
        <Badge>
          {data?.EventMaster_Status.name === "Publish" &&
          moment(data.tanggalSelesai).diff(new Date(), "minutes") < 0
            ? "Riwayat"
            : data?.EventMaster_Status.name}
        </Badge>
      ),
    },
    {
      label: "Judul",
      value: data?.title,
    },
    {
      label: "Lokasi",
      value: data?.lokasi,
    },
    {
      label: "Tipe acara",
      value: data?.EventMaster_TipeAcara.name,
    },
    {
      label: "Tanggal & Waktu mulai",
      value: moment(data?.tanggal).format("LLLL"),
    },
    {
      label: "Tanggal & Waktu selesai",
      value: moment(data?.tanggalSelesai).format("LLLL"),
    },
    {
      label: "Deskripsi",
      value: data?.deskripsi,
    },
  ];

  return (
    <>
      {listData.map((item, index) => (
        <Admin_V3_ComponentDetail item={item} key={index} />
      ))}
    </>
  );
}

export default AdminEvent_ComponentDetailData;
