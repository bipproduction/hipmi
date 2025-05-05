import { ProfileLayout } from "@/app_modules/katalog/profile";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <ProfileLayout>{children}</ProfileLayout>
    </>
  );
}

