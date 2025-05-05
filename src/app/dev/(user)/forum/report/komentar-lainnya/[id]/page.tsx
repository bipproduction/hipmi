import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Forum_ReportKomentarLainnya } from "@/app_modules/forum";

export default async function Page() {
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <Forum_ReportKomentarLainnya
        userLoginId={userLoginId as string}
      />
    </>
  );
}
