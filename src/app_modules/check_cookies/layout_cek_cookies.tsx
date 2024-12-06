"use client";

import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
import { useShallowEffect } from "@mantine/hooks";
import { redirect, useRouter } from "next/navigation";
import { MODEL_USER } from "../home/model/interface";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { RouterAdminDashboard } from "@/app/lib/router_hipmi/router_admin";

export function CheckCookies_UiLayout({
  children,
  dataUser,
}: {
  children: React.ReactNode;
  dataUser: MODEL_USER;
}) {
  const router = useRouter();

  // if (dataUser.active == false){
  //   router.push(RouterHome.home_user_non_active, { scroll: false });
  //   return children
  // }
  

  // useShallowEffect(() => {
  //   onCheckCookies();
  // }, []);

  // async function onCheckCookies() {
  //   const cek = await fetch("/api/check-cookies");

  //   const result = await cek.json();

  //   if (result.success === false) {
  //     router.push(RouterAuth.login, { scroll: false });
  //   }
  // }

  // if (dataUser.masterUserRoleId === "1") {
  //   router.push(RouterHome.main_home, { scroll: false });
  // }

  // if (dataUser.masterUserRoleId !== "1") {
  //   router.push(RouterAdminDashboard.splash_admin, { scroll: false });
  // }

  return <>{children}</>;
}
