import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { PortofolioLayoutNew } from "@/app_modules/katalog/portofolio";

export default async function Layout({ children, }: { children: any;  }) {
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <PortofolioLayoutNew userLoginId={userLoginId}>
        {children}
      </PortofolioLayoutNew>
    </>
  );
}
