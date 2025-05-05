import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Job_Create } from "@/app_modules/job";

export default async function Page() {
    const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <Job_Create userLoginId={userLoginId} />
    </>
  );
}
