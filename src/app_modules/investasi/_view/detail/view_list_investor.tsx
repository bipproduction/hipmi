"use client";

import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardStyles,
  ComponentGlobal_TampilanRupiah,
} from "@/app_modules/_global/component";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Box, Center, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useParams } from "next/navigation";
import { useState } from "react";
import { apiGetInvestorById } from "../../_lib/api_fetch_new_investasi";

export function Investasi_ViewListInvestor() {
  const param = useParams<{ id: string }>();
  const investasiId = param.id;

  const [data, setData] = useState<any | null>(null);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    handleGetListInvestor();
  }, []);

  const handleGetListInvestor = async () => {
    try {
      const response = await apiGetInvestorById({
        id: investasiId,
        page: String(activePage),
      });

      if (response) {
        setData(response.data);
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Error get list investor", error);
      setData(null);
    }
  };

  if (!data) return <CustomSkeleton height={100} width={"100%"} />;

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        <Box>
          <ScrollOnly
            height="85vh"
            renderLoading={() => (
              <Center>
                <ComponentGlobal_Loader size={25} />
              </Center>
            )}
            data={data}
            setData={setData as any}
            moreData={async () => {
              const nextPage = activePage + 1;
              const loadData = await apiGetInvestorById({
                id: investasiId,
                page: String(nextPage),
              });
              setActivePage(nextPage);
              return loadData.data;
            }}
          >
            {(item) => (
              <ComponentGlobal_CardStyles key={item}>
                <Stack>
                  <ComponentGlobal_AvatarAndUsername profile={item.Profile} />
                  <ComponentGlobal_TampilanRupiah
                    nominal={item.nominal}
                    fontSize={"lg"}
                  />
                </Stack>
              </ComponentGlobal_CardStyles>
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
