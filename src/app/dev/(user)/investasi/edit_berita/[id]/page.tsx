import { EditBeritaInvestasi } from "@/app_modules/investasi";
import getOneBeritaInvestasiById from "@/app_modules/investasi/fun/get_one_berita_by_id";

export default async function Page({params}: {params: {id: string}}) {
    const dataBerita = await getOneBeritaInvestasiById(params.id)
    // console.log(dataBerita)
    return<>
    <EditBeritaInvestasi dataBerita={dataBerita as any}/>
    </>
}