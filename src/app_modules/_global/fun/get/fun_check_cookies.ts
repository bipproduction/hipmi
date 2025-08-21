"use server";

import { ServerEnv } from "@/lib/server_env";
import { unsealData } from "iron-session";
import _ from "lodash";
import { cookies } from "next/headers";

export async function funCheckCookies() {
  const c = cookies().get("mySession");

  if (!c || !c?.value || _.isEmpty(c?.value) || _.isUndefined(c?.value)) {
    // console.log("return pertama");
    return false;
  }

  const token = JSON.parse(
    await unsealData(c?.value as string, {
      password: ServerEnv.value?.WIBU_PWD as string,
    })
  );

  if (_.isEmpty(token)) {
    // console.log("return kedua");
    return false;
  }

  return true;
}
