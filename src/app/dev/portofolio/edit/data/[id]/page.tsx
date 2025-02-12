import { Portofolio_EditDataBisnis } from "@/app_modules/katalog/portofolio";
import { portofolio_getOneById } from "@/app_modules/katalog/portofolio/fun/get/get_one_portofolio";
import { Portofolio_getMasterBidangBisnis } from "@/app_modules/katalog/portofolio/fun/master/get_bidang_bisnis";
import _ from "lodash";

export default async function Page({ params }: { params: { id: string } }) {
  let portoId = params.id;
  const data = await portofolio_getOneById(portoId);
  const dataPorto = _.omit(data, [
    "Logo",
    "Portofolio_MediaSosial",
    "Portofolio_MediaSosial",
    "logoId",
    "profileId",
  ]);

  const listBidang = await Portofolio_getMasterBidangBisnis()

  return (
    <>
      <Portofolio_EditDataBisnis />
    </>
  );
}
