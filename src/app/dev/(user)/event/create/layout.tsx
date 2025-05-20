import { LayoutEvent_Create } from "@/app_modules/event";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutEvent_Create>{children}</LayoutEvent_Create>
    </>
  );
}
