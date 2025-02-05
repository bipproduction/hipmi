import { AdminDonasi_TablePublish } from "@/app_modules/admin/donasi";
import adminDonasi_getListPublish from "@/app_modules/admin/donasi/fun/get/get_list_publish";

export default async function Page() {
    // const listPublish = await adminDonasi_getListPublish({
    //   page: 1,
    // });
    // console.log(listPublish)
    return<>
    <AdminDonasi_TablePublish />
    </>
}