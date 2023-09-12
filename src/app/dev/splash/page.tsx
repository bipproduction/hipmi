import { SplashScreen } from "@/app_modules/splash";
import { cookies } from "next/headers";

export  default async function Page() {
    const c = cookies().get("session")
    const token = !c ? null : c.value



    return <>
    {/* {JSON.stringify(token)} */}
    <SplashScreen token={token}/>
    </>
    
}