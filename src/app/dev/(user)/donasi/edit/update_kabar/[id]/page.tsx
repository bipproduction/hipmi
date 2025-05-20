import { UpdateKabarDonasi } from "@/app_modules/donasi";
import { Donasi_getOneKabar } from "@/app_modules/donasi/fun/get/get_one_kabar";

export default async function Page({params}: {params: {id: string}}) {
    let kabarId = params.id
    const dataKabar = await Donasi_getOneKabar(kabarId)

    return<>
    <UpdateKabarDonasi dataKabar={dataKabar as any}/>
    </>
}