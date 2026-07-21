"use server";

import prisma from "@/lib/prisma";
import backendLogger from "@/util/backendLogger";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export default async function adminUserAccess_funEditAccess(
  userId: string,
  value: boolean,
  nomor?: string
) {
  try {
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

    if (value === true && nomor) {
      // Notifikasi WA bersifat best-effort: kegagalan kirim tidak boleh
      // menggagalkan update akses user yang sudah sukses di atas.
      try {
        const message = `Hallo rekan HIPMI, Anda telah diberikan akses ke HIPMI Apps. Silakan mulai jelajahi fitur-fitur yang tersedia melalui link berikut: ${baseUrl}`;
        const encodedMessage = encodeURIComponent(message);

        const res = await fetch(
          `https://wa.wibudev.com/code?nom=${nomor}&text=${encodedMessage}`
        );

        // Server WA membalas plain text (mis. "Unknown subdomain") saat gagal,
        // bukan JSON. Baca sebagai teks agar res.json() tidak melempar
        // SyntaxError dan menggagalkan seluruh operasi.
        const raw = await res.text();

        if (!res.ok) {
          backendLogger.error("Error send message", {
            status: res.status,
            body: raw,
          });
        } else {
          backendLogger.info("Success send message", { body: raw });
        }
      } catch (waError) {
        backendLogger.error("Error send message", {
          message: (waError as Error).message,
        });
      }
    }

    if (!updt) return { status: 400, message: "Update gagal" };
    revalidatePath("/dev/admin/user-access");
    return { status: 200, message: "Update berhasil" };
  } catch (error) {
    backendLogger.error("Error update user", error);
    return {
      status: 500,
      message: "Error udpate user",
      error: (error as Error).message,
    };
  }
}
