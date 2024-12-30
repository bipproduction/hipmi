import { UIGlobal_LayoutHeaderTamplate } from "@/app_modules/_global/ui";
import { Notifikasi_UiNewLayout } from "@/app_modules/notifikasi/_ui";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Notifikasi_UiNewLayout
        header={<UIGlobal_LayoutHeaderTamplate title="Notifikasi" />}
      >
        {children}
      </Notifikasi_UiNewLayout>
    </>
  );
}
