import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    let fixData;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    console.log("userId", userId);

    const checkDataEvent = await prisma.event.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        tanggal: true,
        tanggalSelesai: true,
        lokasi: true,
        Author: {
          select: {
            id: true,
            username: true,
            Profile: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!checkDataEvent) {
      return NextResponse.json(
        { message: "Event Not Found", response: null },
        { status: 400 }
      );
    }

    let peserta;
    const checkPeserta = await prisma.event_Peserta.findFirst({
      where: {
        userId: userId,
        eventId: id,
      },
    });

    console.log("checkPeserta", checkPeserta);

    if (checkPeserta) {
      peserta = true;
    } else {
      peserta = false;
    }

    let kehadiran;
    const checkKehadiran = await prisma.event_Peserta.findFirst({
      where: {
        userId: userId,
        eventId: id,
      },
      select: {
        isPresent: true,
      },
    });

    if (checkKehadiran?.isPresent) {
      kehadiran = true;
    } else {
      kehadiran = false;
    }

    fixData = {
      dataEvent: checkDataEvent,
      peserta: peserta,
      kehadiran: kehadiran,
    };

    return NextResponse.json(
      { success: true, message: "Event Found", data: fixData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error get confirmation event", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get confirmation event",
        reason: (error as Error).message || error,
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { data } = await request.json();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let fixData;
  try {
    console.log("category", category);
    console.log("id", id);
    console.log("data", data);

    // const checkEvent = await prisma.event.findUnique({
    //   where: {
    //     id: id,
    //   },
    // });

    // if (!checkEvent) {
    //   return NextResponse.json(
    //     { message: "Event Not Found", response: null },
    //     { status: 400 }
    //   );
    // }

    // const checkPeserta = await prisma.event_Peserta.findFirst({
    //   where: {
    //     userId: userId,
    //     eventId: id,
    //   },
    // });

    // if (!checkPeserta) {
    //   return NextResponse.json(
    //     { message: "Peserta Not Found", response: null },
    //     { status: 400 }
    //   );
    // }

    if (category === "join_and_confirm") {
      const join = await prisma.event_Peserta.create({
        data: {
          eventId: id,
          userId: data.userId,
          isPresent: true,
        },
      });

      console.log("join", join);
      fixData = join;
    } else if (category === "confirmation") {
      const checkPeserta = await prisma.event_Peserta.findFirst({
        where: {
          userId: data.userId,
          eventId: id,
          isPresent: true,
        },
      });

      if (!checkPeserta) {
        return NextResponse.json(
          { message: "Peserta Not Found", response: null },
          { status: 400 }
        );
      }

      const confirm = await prisma.event_Peserta.update({
        where: {
          id: checkPeserta.id,
        },
        data: {
          isPresent: true,
        },
      });

      console.log("confirm", confirm);
      fixData = confirm;
    }

    return NextResponse.json(
      { success: true, message: `Success ${category}`, data: fixData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error upsert confirmation event", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error upsert confirmation event",
        reason: (error as Error).message || error,
      },
      { status: 500 }
    );
  }
}
