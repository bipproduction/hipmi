import { DetailKabarDonasi } from "@/app_modules/donasi";
import { Donasi_getOneKabar } from "@/app_modules/donasi/fun/get/get_one_kabar";

export default async function Page({params}: {params: {id: string}}) {

    let kabarId = params.id
    const dataDonasi = await Donasi_getOneKabar(kabarId)

    return <DetailKabarDonasi dataDonasi={dataDonasi as any}/>
}