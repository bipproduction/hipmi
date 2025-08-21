import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Box, Center, Group, Skeleton, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { ScrollOnly } from "next-scroll-loader";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ComponentPortofolio_DaftarBoxView } from "../component/card_view_daftar";
import { apiGetPortofolioByProfile } from "../lib/api_portofolio";
import { MODEL_PORTOFOLIO } from "../model/interface";
import _ from "lodash";
import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function Portofolio_UiListDetailNew() {
  const param = useParams<{ id: string }>();
  const profileId = param.id;
  const [data, setData] = useState<MODEL_PORTOFOLIO[] | null>(null);
  const [activePage, setActivePage] = useState(1);

  async function getPortofolio() {
    try {
      const response = await apiGetPortofolioByProfile(
        `?profile=${param.id}&cat=portofolio&page=1`
      );
      if (response) {
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useShallowEffect(() => {
    getPortofolio();
  }, []);

  if (_.isNull(data))
    return (
      <>
        <Stack>
          <CustomSkeleton height={80} radius={"md"} width={"100%"} />
          <CustomSkeleton height={80} radius={"md"} width={"100%"} />
        </Stack>
      </>
    );

  return (
    <>
      <Box py={5}>
        <ScrollOnly
          height="80vh"
          renderLoading={() => (
            <Center mt={"lg"}>
              <ComponentGlobal_Loader />
            </Center>
          )}
          data={data}
          setData={setData as any}
          moreData={async () => {
            // const loadData = await portofolio_funGetAllDaftarByid({
            //   profileId,
            //   page: activePage + 1,
            // });

            try {
              const response = await apiGetPortofolioByProfile(
                `?profile=${param.id}&cat=portofolio&page=${activePage + 1}`
              );
              if (response) {
                setActivePage((val) => val + 1);

                return response.data;
              }
            } catch (error) {
              console.error(error);
            }
          }}
        >
          {(item) => <ComponentPortofolio_DaftarBoxView data={item} />}
        </ScrollOnly>
      </Box>
    </>
  );
}
