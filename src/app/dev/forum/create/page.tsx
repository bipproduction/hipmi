import { Forum_Create } from "@/app_modules/forum";
import Forum_NewCreate from "@/app_modules/forum/create/new_create";
import { Forum_V3_Create } from "@/app_modules/forum/create/V3_create";


export default async function Page() {
  return (
    <>
      {/* <Forum_Create /> */}
      {/* <Forum_NewCreate/> */}
      <Forum_V3_Create/>
    </>
  );
}
