import { LayoutKatalogNew } from "@/app_modules/katalog/main";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <LayoutKatalogNew>{children}</LayoutKatalogNew>
    </>
  );
}
