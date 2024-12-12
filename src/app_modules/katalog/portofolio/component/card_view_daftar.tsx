import { Group, Paper, Stack, Text } from "@mantine/core";
import { MODEL_PORTOFOLIO } from "../model/interface";
import { AccentColor, MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { IconCaretRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RouterPortofolio } from "@/app/lib/router_hipmi/router_katalog";

export function ComponentPortofolio_DaftarBoxView({
  data,
}: {
  data: MODEL_PORTOFOLIO;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Paper
        shadow="sm"
        radius={"md"}
        mb={"lg"}
        onClick={() => {
          setIsLoading(true);
          router.push(RouterPortofolio.main_detail + data.id);
        }}
        style={{
          backgroundColor: AccentColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          borderRadius: "10px ",
          padding: "15px",
          color: "white",
        }}
      >
        <Group position="apart">
          <Stack spacing={0} w={"80%"}>
            <Text fw={"bold"} lineClamp={1} w={"80%"}>
              {data?.namaBisnis}
            </Text>
            <Text fz={10} c={MainColor.yellow}>
              #{data?.id_Portofolio}
            </Text>
          </Stack>

          <Stack>
            {/* PAKE LOADING */}
            {/* {isLoading ? (
              <ComponentGlobal_Loader />
            ) : (
              <IconCaretRight color="white" size={25} />
            )} */}


            {/* GA PAKE LOADING */}
            <IconCaretRight color="white" size={25} />
          </Stack>
        </Group>
      </Paper>
    </>
  );
}
