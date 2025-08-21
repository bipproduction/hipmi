import { DetailKabarDonasi } from "@/app_modules/donasi";

export default async function Page({params}: {params: {id: string}}) {
    return <DetailKabarDonasi />
}