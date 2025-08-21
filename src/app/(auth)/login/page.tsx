
import { Login } from "@/app_modules/auth";
import versionUpdate from "../../../../package.json";

export default async function Page() {
  const version = versionUpdate.version;

  return (
    <>
      <Login version={version} />
    </>
  );
}
