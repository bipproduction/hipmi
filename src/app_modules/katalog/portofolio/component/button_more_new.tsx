import { RouterPortofolio } from "@/lib/router_hipmi/router_katalog";
import { RouterMap } from "@/lib/router_hipmi/router_map";
import { UIGlobal_Drawer } from "@/app_modules/_global/ui";
import { ActionIcon } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import {
  IconEdit,
  IconPhotoEdit,
  IconId,
  IconMapPin2,
  IconMapPin,
  IconDotsVertical,
} from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { apiGetOnePortofolioById } from "../lib/api_portofolio";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { MainColor } from "@/app_modules/_global/color";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function ComponentPortofolio_ButtonMoreNew({
  userLoginId,
}: {
  userLoginId: string;
}) {
  const param = useParams<{ id: string }>();
  const [authorId, setAuthorId] = useState("");
  const [mapId, setMapId] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);

  const listPage = [
    {
      id: "1",
      name: "Edit detail ",
      icon: <IconEdit color={MainColor.white} />,
      path: RouterPortofolio.edit_data_bisnis + `${param.id}`,
    },
    {
      id: "2",
      name: "Edit logo ",
      icon: <IconPhotoEdit color={MainColor.white} />,
      path: RouterPortofolio.edit_logo_bisnis + `${param.id}`,
    },
    {
      id: "3",
      name: "Edit sosial media",
      icon: <IconId color={MainColor.white} />,
      path: RouterPortofolio.edit_medsos_bisnis + `${param.id}`,
    },
    {
      id: "4",
      name: "Edit data map",
      icon: <IconMapPin2 color={MainColor.white} />,
      path: RouterMap.edit + `${param.id}`,
    },
    {
      id: "5",
      name: "Custom pin map",
      icon: <IconMapPin color={MainColor.white} />,
      path: RouterMap.custom_pin + `${param.id}`,
    },
  ];

  const listPage2 = [
    {
      id: "1",
      name: "Edit detail ",
      icon: <IconEdit color={MainColor.white} />,
      path: RouterPortofolio.edit_data_bisnis + `${param.id}`,
    },
    {
      id: "2",
      name: "Edit logo ",
      icon: <IconPhotoEdit color={MainColor.white} />,
      path: RouterPortofolio.edit_logo_bisnis + `${param.id}`,
    },
    {
      id: "3",
      name: "Edit sosial media",
      icon: <IconId color={MainColor.white} />,
      path: RouterPortofolio.edit_medsos_bisnis + `${param.id}`,
    },
    {
      id: "4",
      name: "Edit data map",
      icon: <IconMapPin2 color={MainColor.white} />,
      path: RouterMap.create + `${param.id}`,
    },
    {
      id: "5",
      name: "Custom pin map",
      icon: <IconMapPin color={MainColor.white} />,
      path: RouterMap.custom_pin + `${param.id}`,
    },
  ];

  async function funGetPortofolio() {
    try {
      const response = await apiGetOnePortofolioById(param.id, "bisnis");
      const response3 = await apiGetOnePortofolioById(param.id, "lokasi");

      if (response) {
        setAuthorId(response.data.authorId);
        setMapId(
          response3 !== null && response3.data?.mapId !== undefined
            ? true
            : false
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  useShallowEffect(() => {
    funGetPortofolio();
  }, []);

  return (
    <>
      {
        userLoginId === authorId && (
          <ActionIcon variant="transparent" onClick={() => setOpenDrawer(true)}>
            <IconDotsVertical color={MainColor.white} />
          </ActionIcon>
        )
        // : (
        //   <ActionIcon disabled variant="transparent">
        //     <CustomSkeleton h={20} w={20} radius={"100%"} />
        //   </ActionIcon>
        // )
      }

      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={mapId ? listPage : listPage2}
      />
    </>
  );
}
