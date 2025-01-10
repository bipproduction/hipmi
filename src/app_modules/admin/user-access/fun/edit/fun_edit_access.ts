"use server";

import prisma from "@/app/lib/prisma";
import backendLogger from "@/util/backendLogger";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export default async function adminUserAccess_funEditAccess(
  userId: string,
  value: boolean,
  nomor?: string
) {
  const updt = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      active: value,
    },
  });

  const headersList = headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const path = headersList.get("x-invoke-path");
  const baseUrl = `${protocol}://${host}`;
  // const fullUrl = `${protocol}://${host}${path}`;

  if (value === true) {
    const message = `Hallo rekan HIPMI, Anda telah diberikan akses ke HIPMI Apps. Silakan mulai jelajahi fitur-fitur yang tersedia melalui link berikut: ${baseUrl}`;
    const encodedMessage = encodeURIComponent(message);

    const res = await fetch(
      `https://wa.wibudev.com/code?nom=${nomor}&text=${encodedMessage}
      `
    );

    if (!res.ok) {
      backendLogger.error("Error send message", res);
    }

    const result = await res.json();

    backendLogger.info("Success send message", result);
  }

  if (!updt) return { status: 400, message: "Update gagal" };
  revalidatePath("/dev/admin/user-access");
  return { status: 200, message: "Update berhasil" };
}
