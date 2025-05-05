import { DetailRejectDonasi } from "@/app_modules/donasi";
import { Donasi_getOneById } from "@/app_modules/donasi/fun/get/get_one_donasi_by_id";

export default async function Page({params}: {params: {id: string}}) {
    let donasiId= params.id
    const dataReject = await Donasi_getOneById(donasiId)
    const fileIdImageCerita = dataReject?.CeritaDonasi?.imageId

    return (
      <>
        <DetailRejectDonasi dataReject={dataReject as any} fileIdImageCerita={fileIdImageCerita as any}/>
      </>
    );
}