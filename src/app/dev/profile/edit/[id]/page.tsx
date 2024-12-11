import EditProfile from "@/app_modules/katalog/profile/edit/view";
import { Profile_getOneProfileAndUserById } from "@/app_modules/katalog/profile/fun/get/get_one_user_profile";

export default async function Page({ params }: { params: { id: string } }) {
  let profileId = params.id;
  const dataProfile = await Profile_getOneProfileAndUserById(profileId);

  return (
    <>
      <EditProfile data={dataProfile as any} />
    </>
  );
}
