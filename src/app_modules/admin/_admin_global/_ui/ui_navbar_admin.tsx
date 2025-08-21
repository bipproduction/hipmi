import { MainColor } from "@/app_modules/_global/color";
import { Box, NavLink, Text } from "@mantine/core";
import { IconCircleDot, IconCircleDotFilled } from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { newListAdminPage } from "../../new_list_page";
import { gs_admin_navbar_isActive_dropdown } from "../new_global_state";

export default function Admin_UiNavbar({
  userRoleId,
  activeId,
  activeChildId,
  setActiveId,
  setActiveChildId,
}: {
  userRoleId: string | null;
  activeId: string;
  activeChildId: string;
  setActiveId: (val: any) => void;
  setActiveChildId: (val: any) => void;
}) {
  const router = useRouter();
  //   global state
  const [openDropdown, setOpenDropdown] = useAtom(
    gs_admin_navbar_isActive_dropdown
  );

  // const [activeId, setActiveId] = useAtom(gs_admin_navbar_menu);
  // const [activeChildId, setActiveChildId] = useAtom(gs_admin_navbar_subMenu);

  //   Kalau fix developer navbar, fix juga navbar admin, dan berlaku sebaliknya
  const developerNavbar = newListAdminPage.map((parent) => (
    <Box key={parent.id}>
      <NavLink
        opened={openDropdown && activeId === parent.id}
        styles={{
          icon: {
            color: activeId === parent.id ? MainColor.yellow : "white",
          },
          label: {
            color: activeId === parent.id ? MainColor.yellow : "white",
          },
        }}
        style={{
          color: "white",
          transition: "0.5s",
        }}
        sx={{
          ":hover": {
            backgroundColor: "transparent",
          },
        }}
        fw={activeId === parent.id ? "bold" : "normal"}
        label={<Text>{parent.name}</Text>}
        icon={parent.icon}
        onClick={() => {
          setActiveId(parent.id);
          setActiveChildId("");

          parent.path == "" ? setActiveChildId(parent.child[0].id) : "";
          parent.path == ""
            ? router.push(parent.child[0].path)
            : router.push(parent.path);

          openDropdown && activeId === parent.id
            ? setOpenDropdown(false)
            : setOpenDropdown(true);
        }}
        // active={activeId === parent.id}
      >
        {/* Navlink Children */}
        {!_.isEmpty(parent.child) &&
          parent.child.map((child) => (
            <Box key={child.id}>
              <NavLink
                styles={{
                  icon: {
                    color:
                      activeChildId === child.id ? MainColor.yellow : "white",
                  },
                  label: {
                    color:
                      activeChildId === child.id ? MainColor.yellow : "white",
                  },
                }}
                style={{
                  color: "white",
                  transition: "0.5s",
                }}
                sx={{
                  ":hover": {
                    backgroundColor: "transparent",
                  },
                }}
                fw={activeChildId === child.id ? "bold" : "normal"}
                label={<Text>{child.name}</Text>}
                icon={
                  activeChildId === child.id ? (
                    <IconCircleDotFilled size={10} />
                  ) : (
                    <IconCircleDot size={10} />
                  )
                }
                onClick={() => {
                  setActiveChildId(child.id);
                  router.push(child.path);
                }}
                active={activeId === child.id}
              />
            </Box>
          ))}
      </NavLink>
    </Box>
  ));

  const bukanDeveloper = newListAdminPage.slice(0, -1);
  const adminNavbar = bukanDeveloper.map((parent) => (
    <Box key={parent.id}>
      <NavLink
        opened={openDropdown && activeId === parent.id}
        styles={{
          icon: {
            color: activeId === parent.id ? MainColor.yellow : "white",
          },
          label: {
            color: activeId === parent.id ? MainColor.yellow : "white",
          },
        }}
        style={{
          color: "white",
          transition: "0.5s",
        }}
        sx={{
          ":hover": {
            backgroundColor: "transparent",
          },
        }}
        fw={activeId === parent.id ? "bold" : "normal"}
        label={<Text>{parent.name}</Text>}
        icon={parent.icon}
        onClick={() => {
          setActiveId(parent.id);
          setActiveChildId("");

          parent.path == "" ? setActiveChildId(parent.child[0].id) : "";
          parent.path == ""
            ? router.push(parent.child[0].path)
            : router.push(parent.path);

          openDropdown && activeId === parent.id
            ? setOpenDropdown(false)
            : setOpenDropdown(true);
        }}
        // active={activeId === parent.id}
      >
        {/* Navlink Children */}
        {!_.isEmpty(parent.child) &&
          parent.child.map((child) => (
            <Box key={child.id}>
              <NavLink
                styles={{
                  icon: {
                    color:
                      activeChildId === child.id ? MainColor.yellow : "white",
                  },
                  label: {
                    color:
                      activeChildId === child.id ? MainColor.yellow : "white",
                  },
                }}
                style={{
                  color: "white",
                  transition: "0.5s",
                }}
                sx={{
                  ":hover": {
                    backgroundColor: "transparent",
                  },
                }}
                fw={activeChildId === child.id ? "bold" : "normal"}
                label={<Text>{child.name}</Text>}
                icon={
                  activeChildId === child.id ? (
                    <IconCircleDotFilled size={10} />
                  ) : (
                    <IconCircleDot size={10} />
                  )
                }
                onClick={() => {
                  setActiveChildId(child.id);
                  router.push(child.path);
                }}
                active={activeId === child.id}
              />
            </Box>
          ))}
      </NavLink>
    </Box>
  ));

  return userRoleId == "3" ? developerNavbar : adminNavbar;
}
