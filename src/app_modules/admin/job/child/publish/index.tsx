"use client";

import { RouterAdminJob } from "@/lib/router_admin/router_admin_job";
import { ComponentAdminGlobal_TitlePage } from "@/app_modules/admin/_admin_global/_component";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import { MODEL_JOB } from "@/app_modules/job/model/interface";
import {
  Badge,
  Button,
  Center,
  Pagination,
  Paper,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { IconPhotoCheck, IconSearch, IconSettingsSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import adminJob_getListPublish from "../../fun/get/get_list_publish";
import { RouterAdminGlobal } from "@/lib";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetAdminJobByStatus } from "../../lib/api_fetch_admin_job";
import { clientLogger } from "@/util/clientLogger";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function AdminJob_TablePublish() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Job Vacancy" />
        <TableStatus />
      </Stack>
    </>
  );
}

function TableStatus() {
  const router = useRouter();

  const [data, setData] = useState<MODEL_JOB[] | null>(null);
  const [nPage, setNPage] = useState<number>(1);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");
  const [isLoadingShowImage, setLoadingShowImage] = useState(false);
  const [dataId, setDataId] = useState("");

  useShallowEffect(() => {
    loadInitialData();
  }, [activePage, isSearch])

  const loadInitialData = async () => {
    try {
      const response = await apiGetAdminJobByStatus({
        name: "Publish",
        page: `${activePage}`,
        search: isSearch
      })

      if (response?.success && response?.data.data) {
        setData(response.data.data);
        setNPage(response.data.nPage || 1);
      } else {
        console.error("Invalid data format recieved", response)
        setData([])
      }
    } catch (error) {
      clientLogger.error("Invalid data format recieved:", error)
      setData([])
    }
  }
  const onSearch = async (searchTerm: string) => {
    setSearch(searchTerm);
    setActivePage(1);
  }

  const onPageClick = (page: number) => {
    setActivePage(page);
  }

  const renderTableBody = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return (
        <tr>
          <td colSpan={12}>
            <Center>
              <Text color="gray">Tidak ada data</Text>
            </Center>
          </td>
        </tr>
      )
    }
    return data?.map((e, i) => (
      <tr key={i}>
        <td>
          <Center w={150}>
            <Text c={AdminColor.white}>{e?.Author?.username}</Text>
          </Center>
        </td>
        <td>
          <Center w={150}>
            <Text>
              {e?.isArsip ? (
                <Badge variant="light">Arsip</Badge>
              ) : (
                <Badge color="green">Publish</Badge>
              )}
            </Text>
          </Center>
        </td>
        <td>
          <Spoiler
            c={AdminColor.white}
            w={300}
            maxHeight={50}
            hideLabel="sembunyikan"
            showLabel="tampilkan"
          >
            {e.title}
          </Spoiler>
        </td>
        <td>
          <Center w={200}>
            {e.imageId ? (
              <Button
                loaderPosition="center"
                loading={isLoadingShowImage && e.id === dataId}
                color="green"
                radius={"xl"}
                leftIcon={<IconPhotoCheck />}
                onClick={() => {
                  setLoadingShowImage(true);
                  setDataId(e.id);
                  router.push(RouterAdminGlobal.preview_image({ id: e.imageId }));
                }}
              >
                Lihat
              </Button>
            ) : (
              <Center w={200}>
                <Text c={AdminColor.white} fw={"bold"} fz={"xs"} fs={"italic"}>
                  Tidak ada poster
                </Text>
              </Center>
            )}
          </Center>
        </td>
        <td>
          <Spoiler
            c={AdminColor.white}
            hideLabel="sembunyikan"
            w={400}
            maxHeight={50}
            showLabel="tampilkan"
          >
            <div dangerouslySetInnerHTML={{ __html: e.content }} />
          </Spoiler>
        </td>
        <td>
          <Spoiler
            c={AdminColor.white}
            hideLabel="sembunyikan"
            w={400}
            maxHeight={50}
            showLabel="tampilkan"
          >
            <div dangerouslySetInnerHTML={{ __html: e.deskripsi }} />
          </Spoiler>
        </td>
      </tr>
    ));
  }

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        {/* <pre>{JSON.stringify(listUser, null, 2)}</pre> */}
        <ComponentAdminGlobal_TitlePage
          name="Publish"
          color={AdminColor.softBlue}
          component={
            <TextInput
              icon={<IconSearch size={20} />}
              radius={"xl"}
              placeholder="Masukan judul"
              onChange={(val) => {
                onSearch(val.currentTarget.value);
              }}
            />
          }
        />
        {!data ? (
          <CustomSkeleton height={"80vh"} width="100%" />
        ) : (
          <Paper p={"md"} bg={AdminColor.softBlue} h={"80vh"}>
            <ScrollArea w={"100%"} h={"90%"}>
              <Table
                verticalSpacing={"md"}
                horizontalSpacing={"md"}
                p={"md"}
                w={"100%"}
                h={"100%"}

              >
                <thead>
                  <tr>
                    <th>
                      <Center c={AdminColor.white}>Author</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Status</Center>
                    </th>
                    <th>
                      <Text c={AdminColor.white}>Judul</Text>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Poster</Center>
                    </th>
                    <th>
                      <Text c={AdminColor.white}>Syarat Ketentuan</Text>
                    </th>
                    <th>
                      <Text c={AdminColor.white}>Deskripsi</Text>
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTableBody()}</tbody>
              </Table>
            </ScrollArea>
            <Center mt={"xl"}>
              <Pagination
                value={activePage}
                total={nPage}
                onChange={(val) => {
                  onPageClick(val);
                }}
              />
            </Center>
          </Paper>
        )}
      </Stack>
    </>
  );
}
