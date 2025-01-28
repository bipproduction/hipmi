'use server';

import { prisma } from "@/app/lib";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { revalidatePath } from "next/cache";

export default async function funDeleteDonasi(id: string) {
    const res = await prisma.donasi.delete({
        where: {
            id: id,
        },
    });

    if (!res) return { status: 400, message: "Gagal Hapus Data" };

    revalidatePath(RouterDonasi.status_galang_dana({ id: "3" }));
    revalidatePath(RouterDonasi.status_galang_dana({ id: "4" }));
    return {
        status: 200,
        message: "Berhasil Hapus",
    };
}
