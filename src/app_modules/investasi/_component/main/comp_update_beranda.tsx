import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { Affix, Button, Center, rem } from "@mantine/core";
import { useState } from "react";
import { apiGetAllInvestasi } from "../../_lib/api_interface";

export function Investasi_ComponentButtonUpdateBeranda({
  onLoadData,
}: {
  onLoadData: (val: any) => void;
}) {
  const [isLoading, setLoading] = useState(false);

  async function onLoaded() {
    try {
      setLoading(true);
      const response = await apiGetAllInvestasi(`?cat=bursa&page=1`);
      if (response.success) {
        onLoadData(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Affix position={{ top: rem(100) }} w={"100%"}>
        <Center>
          <Button
            style={{
              transition: "0.5s",
              border: `1px solid ${AccentColor.skyblue}`,
            }}
            bg={AccentColor.blue}
            loaderPosition="center"
            loading={isLoading ? true : false}
            radius={"xl"}
            onClick={() => onLoaded()}
          >
            Update beranda
          </Button>
        </Center>
      </Affix>
    </>
  );
}
