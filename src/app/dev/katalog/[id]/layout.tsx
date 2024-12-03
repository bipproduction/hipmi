import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { KatalogLayout } from "@/app_modules/katalog/main";
import { Profile_getOneProfileAndUserById } from "@/app_modules/katalog/profile/fun/get/get_one_user_profile";

export default async function Layout({
  children,
  params,
}: {
  children: any;
  params: { id: string };
}) {
  const profileId = params.id;
  const dataProfile = await Profile_getOneProfileAndUserById(profileId);
  const authorId = dataProfile?.userId;

  const userLoginId = await funGetUserIdByToken();
  const userRoleId = dataProfile?.User?.masterUserRoleId;

  return (
    <>
      <KatalogLayout
        profileId={profileId}
        userLoginId={userLoginId as string}
        authorId={authorId as any}
        userRoleId={userRoleId as string}
      >
        {children}
      </KatalogLayout>
    </>
  );
}
