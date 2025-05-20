import { Portofolio_EditMedsosBisnis } from "@/app_modules/katalog/portofolio";
import { Portofolio_geOnetMedsosById } from "@/app_modules/katalog/portofolio/fun/get/get_one_medsos_by_id";
import _ from "lodash";

export default async function Page() {
  // let portoId = params.id;
  // const dataMedsos = await Portofolio_geOnetMedsosById(portoId).then((res) =>
  //   _.omit(res, ["active", "createdAt", "updatedAt", "portofolioId"])
  // );

  return (
    <>
      <Portofolio_EditMedsosBisnis />
    </>
  );
}
