import { Login } from "@/app_modules/auth";
import versionUpdate from "../../../../../package.json";
import { funCheckCookies } from "@/app_modules/_global/fun/get/fun_check_cookies";
import { redirect } from "next/navigation";

export default async function Page() {
  const version = versionUpdate.version;

  //  const checkCookies = await funCheckCookies();
  //  console.log(checkCookies, "ini halaman login");
  //   if (!checkCookies) return redirect("/");

  return (
    <>
      <Login version={version} />
    </>
  );
}
