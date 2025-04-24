import { Box, NavLink, Text } from "@mantine/core";
import _ from "lodash";
import { newListAdminPage } from "../new_list_page";

export function Admin_V3_SkeletonNavbar() {
  const listPage = newListAdminPage.slice(0, -1);
  return (
    <>
      {listPage.map((parent) => (
        <Box key={parent.id}>
          <NavLink
            disabled
            style={{
              color: "gray",
              transition: "0.5s",
            }}
            sx={{
              ":hover": {
                backgroundColor: "transparent",
              },
            }}
            label={<Text>{parent.name}</Text>}
            icon={parent.icon}
          >
            {!_.isEmpty(parent.child) &&
              parent.child.map((child) => <Box key={child.id} />)}
          </NavLink>
        </Box>
      ))}
    </>
  );
}
