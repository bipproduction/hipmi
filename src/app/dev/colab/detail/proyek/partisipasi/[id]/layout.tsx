import { LayoutColab_DetailPartisipasiProyek } from "@/app_modules/colab";

export default async function Layout({ children }: { children: any }) {
  return (
    <>
      <LayoutColab_DetailPartisipasiProyek>
        {children}
      </LayoutColab_DetailPartisipasiProyek>
    </>
  );
}
