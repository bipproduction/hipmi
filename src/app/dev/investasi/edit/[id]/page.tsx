import { EditInvestasi } from "@/app_modules/investasi";


export default async function Page({params}: {params: {id: string}}) {
  return (
    <>

      <EditInvestasi id={params.id} />
    </>
  );
}
