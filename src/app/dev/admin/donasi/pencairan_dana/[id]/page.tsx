import { AdminDonasi_PencairanDana } from "@/app_modules/admin/donasi";
import { AdminDonasi_getOneById } from "@/app_modules/admin/donasi/fun/get/get_one_by_id";

export default async function Page() {

  return (
    <AdminDonasi_PencairanDana
    />
  );
}

// import { AdminDonasi_PencairanDana } from "@/app_modules/admin/donasi";
// import { AdminDonasi_getOneById } from "@/app_modules/admin/donasi/fun/get/get_one_by_id";

// export default async function Page({ params }: { params: { id: string } }) {
//   let donasiId = params.id;
//   const dataDonasi = await AdminDonasi_getOneById(donasiId);
//   const danaTerkumpul = dataDonasi?.terkumpul;
//   const totalPencairan = dataDonasi?.totalPencairan


//   return (
//     <AdminDonasi_PencairanDana
//       donasiId={donasiId}
//       danaTerkumpul={danaTerkumpul as any}
//       totalPencairan={totalPencairan as any}
//     />
//   );
// }
