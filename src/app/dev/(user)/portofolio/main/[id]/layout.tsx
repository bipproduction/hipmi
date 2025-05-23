import { PortofolioLayoutNew } from "@/app_modules/katalog/portofolio";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <PortofolioLayoutNew>{children}</PortofolioLayoutNew>
    </>
  );
}
