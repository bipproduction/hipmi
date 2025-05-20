import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Forum_ReportKomentar } from "@/app_modules/forum";

export default async function Page() {
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <Forum_ReportKomentar userLoginId={userLoginId as any} />
    </>
  );
}
