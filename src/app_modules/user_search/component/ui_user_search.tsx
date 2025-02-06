"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { ComponentGlobal_LoaderAvatar } from "@/app_modules/_global/component";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import { clientLogger } from "@/util/clientLogger";
import {
  ActionIcon,
  Box,
  Center,
  Grid,
  Group,
  Loader,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconChevronRight, IconSearch } from "@tabler/icons-react";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { userSearch_getAllUser } from "../fun/get/get_all_user";
import { apiGetUserSearch } from "./api_fetch_user_search";

export function UserSearch_UiView() {
  const [data, setData] = useState<MODEL_USER[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useShallowEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        const response = await apiGetUserSearch({
          page: "1", // Selalu mulai dari page 1 untuk search baru
          search: searchQuery,
        });

        if (response?.data) {
          // Reset allData dan mulai dengan data baru
          setData(response.data);
          setActivePage(1);
          // Jika data yang diterima kosong atau kurang dari yang diharapkan,
          // berarti tidak ada data lagi
          setHasMore(response.data.length > 0);
        }
      } catch (error) {
        clientLogger.error("Error initializing data", error);
        setData([]);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [searchQuery]); // Dependency hanya pada searchQuery

  function handleSearch(value: string) {
    setSearchQuery(value);
    // Reset state pagination
    setActivePage(1);
    setHasMore(true);
  }

  // Function untuk load more data (infinite scroll)
  async function loadMoreData() {
    if (!hasMore || isLoading) return null;

    try {
      const nextPage = activePage + 1;
      const response = await apiGetUserSearch({
        page: `${nextPage}`,
        search: searchQuery,
      });

      if (response?.data && response.data.length > 0) {
        setActivePage(nextPage);
        // Update hasMore berdasarkan apakah ada data yang diterima
        setHasMore(response.data.length > 0);
        return response.data;
      } else {
        setHasMore(false);
        return null;
      }
    } catch (error) {
      clientLogger.error("Error loading more data", error);
      setHasMore(false);
      return null;
    }
  }

  return (
    <>
      <Stack spacing={"xl"}>
        <TextInput
          radius={"xl"}
          style={{ zIndex: 99 }}
          icon={<IconSearch size={20} />}
          placeholder="Masukan nama pengguna "
          onChange={(val) => handleSearch(val.target.value)}
          // disabled={isLoading}
        />
        {!data && isLoading ? (
          <CustomSkeleton height={40} width={"100%"} />
        ) : (
          <Box >
            {_.isEmpty(data) ? (
              <ComponentGlobal_IsEmptyData text="Pengguna tidak ditemukan" />
            ) : (
              <ScrollOnly
                height="5vh"
                renderLoading={() => (
                  <Center mt={"lg"}>
                    <Loader color={"yellow"} />
                  </Center>
                )}
                data={data}
                setData={setData as any}
                moreData={loadMoreData}
              >
                {(item) => <CardView data={item} />}
              </ScrollOnly>
            )}
          </Box>
        )}
      </Stack>
    </>
  );
}

function CardView({ data }: { data: MODEL_USER }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Grid
        w={"100%"}
        onClick={() => {
          setLoading(true);
          router.push(RouterProfile.katalog({ id: data.Profile.id }));
        }}
      >
        <Grid.Col span={2}>
          <Group h={"100%"} align="center">
            <ComponentGlobal_LoaderAvatar
              fileId={data.Profile.imageId as any}
              imageSize="100"
            />
          </Group>
        </Grid.Col>
        <Grid.Col span={"auto"} c={"white"}>
          <Stack spacing={0}>
            <Text fw={"bold"} lineClamp={1}>
              {data?.Profile.name}
            </Text>
            <Text fz={"sm"} fs={"italic"}>
              +{data?.nomor}
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={2}>
          <Group position="right" align="center" h={"100%"}>
            <Center>
              <ActionIcon variant="transparent">
                {/* PAKE LOADING */}
                {/* {loading ? (
                  <ComponentGlobal_Loader />
                ) : (
                  <IconChevronRight color="white" />
                )} */}

                {/* GA PAKE LOADING */}
                <IconChevronRight color="white" />
              </ActionIcon>
            </Center>
          </Group>
        </Grid.Col>
      </Grid>

      {/* <Stack
        spacing={"xs"}
        c="white"
        py={"xs"}
        onClick={() => {
          setLoading(true);
          router.push(RouterProfile.katalogOLD + `${data?.Profile?.id}`);
        }}
      >

        <Group position="apart" grow>
          <Group position="left" bg={"blue"}>
            <ComponentGlobal_LoaderAvatar
              fileId={data.Profile.imageId as any}
              imageSize="100"
            />

            <Stack spacing={0}>
              <Text fw={"bold"} lineClamp={1}>
                {data?.Profile.name}d sdasd sdas 
              </Text>
              <Text fz={"sm"} fs={"italic"}>
                +{data?.nomor}
              </Text>
            </Stack>
          </Group>

          <Group position="right">
            <Center>
              <ActionIcon variant="transparent">
                {loading ? (
                  <ComponentGlobal_Loader />
                ) : (
                  <IconChevronRight color="white" />
                )}
              </ActionIcon>
            </Center>
          </Group>
        </Group>
      </Stack> */}
    </>
  );
}
