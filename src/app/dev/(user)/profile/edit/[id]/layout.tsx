import { EditProfileLayout } from "@/app_modules/katalog/profile";

export default async function Layout({
  children,
  params,
}: {
  children: any;
  params: { id: string };
}) {
  return (
    <>
      <EditProfileLayout>{children}</EditProfileLayout>
    </>
  );
}
