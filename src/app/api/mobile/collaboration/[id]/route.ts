import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export { GET, POST, PUT };
async function GET(request: Request, { params }: { params: { id: string } }) {
  let fixData;
  const { id } = params;

  try {
    fixData = await prisma.projectCollaboration.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        isActive: true,
        title: true,
        lokasi: true,
        purpose: true,
        benefit: true,
        createdAt: true,
        projectCollaborationMaster_IndustriId: true,
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
        ProjectCollaborationMaster_Industri: {
          select: {
            name: true,
          },
        },
        ProjectCollaboration_Partisipasi: {
          where: {
            isActive: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil Mendapatkan Data",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal Mendapatkan Data",
        reason: (error as Error).message || error,
      },
      { status: 500 }
    );
  }
}

// Buat grup
async function POST(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();

  // NEED : authorId, listSelected, nameGroup

  console.log("[ID]", id);
  console.log("[DATA]", data);

  try {
    const createRoom = await prisma.projectCollaboration_RoomChat.create({
      data: {
        name: data.nameGroup,
        userId: data.authorId,
        projectCollaborationId: id,
      },
    });

    if (!createRoom) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Gagal Membuat Room",
      });
    }

    for (let v of data.listSelect) {
      console.log("[LIST SELECTED]", v);
      const createAnggota =
        await prisma.projectCollaboration_AnggotaRoomChat.create({
          data: {
            userId: v,
            projectCollaboration_RoomChatId: createRoom.id,
          },
        });

      if (!createAnggota)
        return NextResponse.json({
          status: 400,
          success: false,
          message: "Gagal Menambah Anggota",
        });

      //   const createdNotifikasi = await prisma.notifikasi.create({
      //     data: {
      //       userId: v,
      //       appId: createRoom.id,
      //       status: "Collaboration Group",
      //       title: "Grup Kolaborasi Baru",
      //       pesan: createRoom.name,
      //       kategoriApp: "COLLABORATION",
      //       userRoleId: "1",
      //     },
      //   });
      //   if (!createdNotifikasi)
      //     return { status: 400, message: "Gagal mengirim notifikasi" };
    }

    const createForAuthor =
      await prisma.projectCollaboration_AnggotaRoomChat.create({
        data: {
          userId: data.authorId,
          projectCollaboration_RoomChatId: createRoom.id,
        },
      });

    if (!createForAuthor)
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Gagal Menambahkan Author",
      });

    const hideProyek = await prisma.projectCollaboration.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
      },
    });

    if (!hideProyek)
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Gagal Menyimpan Proyek",
      });

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Berhasil Membuat Room",
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal Membuat Room",
        reason: (error as Error).message || error,
      },
      { status: 500 }
    );
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();

  console.log("[ID]", id);
  console.log("[DATA]", data);

  try {
    const updt = await prisma.projectCollaboration.update({
      where: {
        id: id,
      },
      data: {
        title: data.title,
        lokasi: data.lokasi,
        purpose: data.purpose,
        benefit: data.benefit,
        projectCollaborationMaster_IndustriId:
          data.projectCollaborationMaster_IndustriId as any,
      },
    });

    if (!updt)
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Update gagal",
      });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Update berhasil",
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Update data error",
        reason: (error as Error).message || error,
      },
      { status: 500 }
    );
  }
}
