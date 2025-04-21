import { MODEL_EVENT } from "@/app_modules/event/_lib/interface";
import { Button, Grid, Stack, Text } from "@mantine/core";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import AdminEvent_ComponentDetailData from "./comp_detail_data";
import QRCode from "react-qr-code";
import { Admin_V3_ComponentDetail } from "../../_components_v3/comp_detail_data";

function AdminEvent_ComponentDetailPublish({ data }: { data: MODEL_EVENT }) {
  const handleDownloadQR = () => {
    const svg: any = document.getElementById(data.id);
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx: any = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `QRCode ${data.title}`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const donwloadButton = () => {
    return (
      <>
        <Admin_V3_ComponentDetail
          item={{
            title: "QR Code",
            value: (
              <QRCode
                id={data.id}
                style={{ height: 100, width: 100 }}
                value={`${origin}/dev/event/konfirmasi/${data.id}`}
              />
            ),
          }}
        />
        {/* <Grid>
          <Grid.Col span={3}>
            <Text fw={"bold"}>QR Code</Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Text>:</Text>
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <QRCode
              id={data.id}
              style={{ height: 100, width: 100 }}
              value={`${origin}/dev/event/konfirmasi/${data.id}`}
            />
          </Grid.Col>
        </Grid> */}
      </>
    );
  };

  return (
    <>
      <Admin_ComponentBoxStyle>
        <Stack>
          <AdminEvent_ComponentDetailData data={data} />
          {donwloadButton()}
        </Stack>
      </Admin_ComponentBoxStyle>
      {/* <ComponentEvent_DetailDataEvent data={data} /> */}
    </>
  );
}

export default AdminEvent_ComponentDetailPublish;
