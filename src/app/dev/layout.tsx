import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { RealtimeProvider } from "../../lib";
import { ServerEnv } from "../../lib/server_env";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  const userId = await funGetUserIdByToken();

  return (
    <>
      <RealtimeProvider
        userId={userId}
        WIBU_REALTIME_TOKEN={
          ServerEnv.value?.NEXT_PUBLIC_WIBU_REALTIME_TOKEN as string
        }
      />

      {children}
    </>
  );
}
