import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Forum_Create } from "@/app_modules/forum";
import Forum_NewCreate from "@/app_modules/forum/create/new_create";
import { Forum_V3_Create } from "@/app_modules/forum/create/V3_create";


export default async function Page() {
  const userLoginId = await funGetUserIdByToken();
  return (
    <>
      {/* <Forum_Create /> */}
      {/* <Forum_NewCreate/> */}
      <Forum_V3_Create userLoginId={userLoginId as string}/>
    </>
  );
}
