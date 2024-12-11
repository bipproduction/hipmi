import { UploadFotoProfile } from "@/app_modules/katalog/profile";
import { Profile_getOneById } from "@/app_modules/katalog/profile/fun/get/get_one_profile";

export default async function Page({ params }: { params: { id: string } }) {
  let profileId = params.id;
  const dataProfile = await Profile_getOneById(profileId);

  return (
    <>
      <UploadFotoProfile dataProfile={dataProfile as any} />
    </>
  );
}
