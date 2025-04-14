import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";
import {
  Box,
  Button,
  Center,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import adminNotifikasi_getByUserId from "../../notifikasi/fun/get/get_notifikasi_by_user_id";
import { useState } from "react";
import {
  apiGetNotifikasiByUserId,
  apiPostIsReadNotifikasi,
} from "../../notifikasi/lib/api_fetch_notifikasi";
import AdminNotifikasi_ViewCardDrawer from "../../notifikasi/view_card_drawer";
import Admin_V3_ComponentCardNotifikasi from "./comp_card_notifikasi";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import {
  IAdmin_ActivePage,
  IAdmin_ActiveChildId,
} from "../../notifikasi/route_setting/type_of_select_page";

export function Admin_V3_ViewDrawerNotifikasi({
  userLoginId,
  openedDrawer,
  onChangeNavbar,
  onToggleNavbar,
}: {
  userLoginId: string;
  openedDrawer: boolean;
  onChangeNavbar: (val: {
    id: IAdmin_ActivePage;
    childId: IAdmin_ActiveChildId;
  }) => void;
  onToggleNavbar: (val: any) => void;
}) {
  //   newAdminNtf,
  //   listNotifikasi,
  //   onChangeNavbar,

  // }: {
  //   newAdminNtf: number;
  //   listNotifikasi: MODEL_NOTIFIKASI[];
  //   onChangeNavbar: (val: {
  //     id: IAdmin_ActivePage;
  //     childId: IAdmin_ActiveChildId;
  //   }) => void;

  const [data, setData] = useState<MODEL_NOTIFIKASI[] | null>(null);
  const [activePage, setActivePage] = useState<number>(1);

  // Action Button
  const [isRead, setIsRead] = useState<boolean>(false);
  const [isUnRead, setIsUnRead] = useState<boolean>(false);

  useShallowEffect(() => {
    if (openedDrawer || isRead || isUnRead) {
      handleLoadtData();
    }
  }, [openedDrawer, isRead, isUnRead]);

  async function handleLoadtData() {
    try {
      const response = await apiGetNotifikasiByUserId({
        id: userLoginId,
        page: `${activePage}`,
      });
      if (response && response.success) {
        setData(response.data);
        setIsRead(false);
        setIsUnRead(false);
      } else {
        console.error("Failed to fetch user data", response);
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData(null);
    }
  }

  async function handleMoreData() {
    try {
      const nextPage = activePage + 1;
      const response = await apiGetNotifikasiByUserId({
        id: userLoginId,
        page: `${nextPage}`,
      });
      if (response && response.success) {
        setActivePage(nextPage);
        return response.data;
      } else {
        console.error("Failed to fetch user data", response);
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  async function handleUpdateReadAll() {
    try {
      const response = await apiPostIsReadNotifikasi({
        id: userLoginId,
        isRead: true,
      });
      if (response && response.success) {
        console.log("Berhasil tandai baca semua");
        setIsRead(true);
      } else {
        console.error("Failed to update notification", response);
        return null;
      }
    } catch (error) {
      console.error("Error updating notification:", error);
      return null;
    }
  }

  async function handleUpdateUnRead() {
    try {
      const response = await apiPostIsReadNotifikasi({
        id: userLoginId,
        isRead: false,
      });
      if (response && response.success) {
        console.log("Berhasil tandai belum baca");
        setIsUnRead(true);
      } else {
        console.error("Failed to update notification", response);
        return null;
      }
    } catch (error) {
      console.error("Error updating notification:", error);
      return null;
    }
  }

  if (!data) {
    return (
      <>
        <Stack pt="sm">
          {Array.from({ length: 3 }, (_, i) => (
            <CustomSkeleton key={i} height={150} />
          ))}
        </Stack>
      </>
    );
  }

  return (
    <>
      <Stack pt={"sm"} pb={"xl"}>
        <Group>
          <Button
            radius={"xl"}
            onClick={() => {
              handleUpdateReadAll();
            }}
          >
            Tandai baca semua
          </Button>
          <Button
            radius={"xl"}
            onClick={() => {
              handleUpdateUnRead();
            }}
          >
            Tandai belum baca
          </Button>
        </Group>

        {_.isEmpty(data) ? (
          <Center>
            <Text c={"gray"} fz={"xs"}>
              Tidak ada notifikasi
            </Text>
          </Center>
        ) : (
          <ScrollOnly
            height="80vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <Loader color={"yellow"} />
              </Center>
            )}
            data={data}
            setData={setData as any}
            moreData={handleMoreData}
          >
            {(item) => (
              <Admin_V3_ComponentCardNotifikasi
                data={item}
                activePage={activePage}
                onChangeNavbar={(val) => onChangeNavbar(val)}
                onToggleNavbar={(val) => onToggleNavbar(val)}
                // onLoadCountNotif={(val) => onLoadCountNotif(val)}
                // onLoadDataNotifikasi={(val) => setData(val)}
              />
            )}
          </ScrollOnly>
        )}
      </Stack>
    </>
  );
}
