import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Forum_ReportPostingLainnya } from "@/app_modules/forum";

export default async function Page() {
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <Forum_ReportPostingLainnya userLoginId={userLoginId as string} />
    </>
  );
}
