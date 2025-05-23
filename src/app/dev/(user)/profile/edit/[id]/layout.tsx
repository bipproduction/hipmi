import { EditProfileLayout } from "@/app_modules/katalog/profile";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <EditProfileLayout>{children}</EditProfileLayout>
    </>
  );
}
