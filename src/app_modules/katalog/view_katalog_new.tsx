'use client'
import { Stack } from "@mantine/core";
import ProfileDetail from "./ui/profile_detail";
import ListPortofolioProfileNew from "./ui/list_portolio_new";

export default function ViewKatalogNew() {
   return (
      <>
         <Stack mb={"lg"}>
            <ProfileDetail />
            <ListPortofolioProfileNew />
         </Stack>
      </>
   )
}