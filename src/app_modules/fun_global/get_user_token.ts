"use server";

import { RouterAuth } from "@/lib/router_hipmi/router_auth";
import { ServerEnv } from "@/lib/server_env";
import { unsealData } from "iron-session";
import _ from "lodash";
import { cookies } from "next/headers";


export async function user_funGetOneUserId(): Promise<string | null> {
  try {
    const kukis = cookies();
    const c = kukis.get("mySession");
    // if (!c || !c?.value || _.isEmpty(c?.value) || _.isUndefined(c?.value))
    //   return re-di-re-ct(RouterAuth.login);

    const token = JSON.parse(
      await unsealData(c?.value as string, {
        password: ServerEnv.value?.WIBU_PWD as string,
      })
    );

    return token.id;
  } catch (error) {
    console.log(error);
    return null;
  }
}
