"use client";

import { RouterAdminDonasi_OLD } from "@/app/lib/router_hipmi/router_admin";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_TampilanRupiah } from "@/app_modules/_global/component";
import { MODEL_DONASI } from "@/app_modules/donasi/model/interface";
import {
  Button,
  Center,
  Modal,
  Pagination,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { IconEyeEdit, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import adminDonasi_getListReject from "../fun/get/get_list_reject";
import { IconEyeCheck } from "@tabler/icons-react";
import { clientLogger } from "@/util/clientLogger";
import { apiGetAdminDonasiByStatus } from "../lib/api_fetch_admin_donasi";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function AdminDonasi_TableReject() {
  return (
    <>
      <Stack h={"100%"}>
        <ComponentAdminGlobal_HeaderTamplate name="Donasi" />
        <TableStatus />
      </Stack>
    </>
  );
}

function TableStatus() {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setLoading] = useState(false);
  const [idData, setIdData] = useState("");
  const [data, setData] = useState<MODEL_DONASI[] | null>(null);
  const [isNPage, setNPage] = useState<number>(1);
  const [isActivePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");


  useShallowEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await apiGetAdminDonasiByStatus({
          status: "Reject",
          page: `${isActivePage}`,
          search: isSearch
        })

        if (response?.success && response?.data.data) {
          setData(response.data.data);
          setNPage(response.data.nPage || 1);
        } else {
          console.error("Invalid data format recieved:", response);
          setData([]);
        }
      } catch (error) {
        clientLogger.error("Invalid data format recieved:", error);
        setData([]);
      }
    }
    loadInitialData();
  }, [isActivePage, isSearch])


  const onSearch = (searchTerm: string) => {
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
    return data.map((e, i) => (
      <tr key={i}>
        <td>
          <Center c={AccentColor.white}>{e?.Author?.username}</Center>
        </td>
        <td>
          <Center c={AccentColor.white}>{e?.title}</Center>
        </td>
        <td>
          <Center c={AccentColor.white}>
            <ComponentGlobal_TampilanRupiah  nominal={+e.target} />
          </Center>
        </td>
        <td>
          <Center c={AccentColor.white}>{e?.DonasiMaster_Ketegori.name}</Center>
        </td>
        <td>
          <Center c={AccentColor.white}>{e?.DonasiMaster_Durasi.name} hari</Center>
        </td>
        <td>
          <Center>
            <Button
              style={{ backgroundColor: MainColor.green }}
              color={AccentColor.white}
              leftIcon={<IconEyeCheck />}
              radius={"xl"}
              onClick={() =>
                router.push(RouterAdminDonasi_OLD.detail_reject + `${e.id}`)
              }
            >
              Lihat Alasan
            </Button>
          </Center>

          {/* <ModalReject opened={opened} close={close} /> */}
        </td>
      </tr>
    ));
  }


  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        {/* <pre>{JSON.stringify(listUser, null, 2)}</pre> */}
        <ComponentAdminGlobal_TitlePage
          name="Reject"
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
        {/* <Group
          position="apart"
          bg={"red.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Reject</Title>
          <TextInput
            icon={<IconSearch size={20} />}
            radius={"xl"}
            placeholder="Masukan judul"
            onChange={(val) => {
              onSearch(val.currentTarget.value);
            }}
          />
        </Group> */}

        {!data ? (
          <CustomSkeleton height={"80vh"} width={"100%"} />
        ) : (


          <Paper p={"md"} bg={AdminColor.softBlue} shadow="lg" h={"80vh"}>
            <ScrollArea w={"100%"} h={"90%"}>
              <Table
                verticalSpacing={"md"}
                horizontalSpacing={"md"}
                p={"md"}
                w={1500}

              >
                <thead>
                  <tr>
                    <th>
                      <Center c={AccentColor.white}>Username</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Judul</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Target</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Ketegori</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Durasi</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Alasan</Center>
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTableBody()}</tbody>
              </Table>
            </ScrollArea>
            {/* <ScrollArea>
          </ScrollArea> */}
            <Center mt={"xl"}>
              <Pagination
                value={isActivePage}
                total={isNPage}
                onChange={(val) => {
                  onPageClick(val);
                }}
              />
            </Center>
          </Paper>
        )}
      </Stack>
      {/* {data.map((e, i) => (
        <Modal
          key={e.id}
          opened={opened}
          onClose={close}
          centered
          withCloseButton={false}
        >
          <Stack>
            <Title order={6}>Alasan penolakan</Title>
            <Text>{i}</Text>
          </Stack>
        </Modal>
      ))} */}
    </>
  );
}

async function ModalReject(opened: any, close: any) {
  return (
    <>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Stack>
          <Title order={6}>Alasan penolakan</Title>
          <Text>{"test"}</Text>
        </Stack>
      </Modal>
    </>
  );
}
