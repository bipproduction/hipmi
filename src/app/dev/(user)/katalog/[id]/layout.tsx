import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { LayoutKatalogNew } from "@/app_modules/katalog/main";

export default async function Layout({ children }: { children: any }) {
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <LayoutKatalogNew userLoginId={userLoginId}>{children}</LayoutKatalogNew>
    </>
  );
}
