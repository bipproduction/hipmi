import { Event_StatusPage } from "@/app_modules/event";

async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Event_StatusPage />
    </>
  );
}

export default Page;
