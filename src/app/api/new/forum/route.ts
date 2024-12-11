import { prisma } from "@/app/lib"
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

// GET  ALL DATA PORTOFOLIO BY PROFILE ID
export async function GET(request: Request) {
   try {
      const { searchParams } = new URL(request.url)
      const page = searchParams.get("page")
      const search = searchParams.get("search")
      const dataSkip = Number(page) * 5 - 5;

      const data = await prisma.forum_Posting.findMany({
         take: 5,
         skip: dataSkip,
         orderBy: {
            createdAt: "desc",
         },
         where: {
            isActive: true,
            diskusi: {
               mode: "insensitive",
               contains: (search == undefined || search == "null") ? "" : search,
            },
         },
         select: {
            id: true,
            diskusi: true,
            createdAt: true,
            isActive: true,
            authorId: true,
            Author: {
               select: {
                  id: true,
                  username: true,
                  Profile: {
                     select: {
                        id: true,
                        name: true,
                        imageId: true,
                     },
                  },
               },
            },
            Forum_Komentar: {
               where: {
                  isActive: true,
               },
            },
            ForumMaster_StatusPosting: {
               select: {
                  id: true,
                  status: true,
               },
            },
            forumMaster_StatusPostingId: true,
         },
      });

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan data", data }, { status: 200 });

   }
   catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan data, coba lagi nanti ", reason: (error as Error).message, }, { status: 500 });
   }
}