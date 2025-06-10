import { DetailKabarDonasi } from "@/app_modules/donasi";
import { Donasi_getOneKabar } from "@/app_modules/donasi/fun/get/get_one_kabar";

export default async function Page({params}: {params: {id: string}}) {
    return <DetailKabarDonasi />
}