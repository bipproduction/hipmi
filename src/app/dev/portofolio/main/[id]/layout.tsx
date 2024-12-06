import { PortofolioLayoutNew } from "@/app_modules/katalog/portofolio";

export default async function Layout({ children, params, }: { children: any; params: { id: string }; }) {
  // let portoId = params.id;
  // const getPorto = await portofolio_getOneById(portoId);
  // const userLoginId = await funGetUserIdByToken();

  return (
    <>
      {/* <PortofolioLayout
        portoId={portoId}
        userLoginId={userLoginId as string}
        authorId={getPorto?.Profile?.User?.id as any}
      >
        {children}
      </PortofolioLayout> */}
      <PortofolioLayoutNew>{children}</PortofolioLayoutNew>
    </>
  );
}
