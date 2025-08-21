import AdminAppInformation_Layout from "@/app_modules/admin/app_info/ui/ui_layout_admin_app";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminAppInformation_Layout>{children}</AdminAppInformation_Layout>
    </>
  );
}
