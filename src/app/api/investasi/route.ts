import { prisma } from "@/lib";
import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

// GET ALL DATA INVESTASI
export async function GET(request: Request) {
  try {
    let dataFix;
    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get("cat");
    const status = searchParams.get("status");
    const page = searchParams.get("page");
    const dataTake = 10;
    const dataSkip = Number(page) * dataTake - dataTake;

    if (!page) {
      const data = await prisma.investasi.findMany({
        where: {
          masterStatusInvestasiId: "1",
          masterProgresInvestasiId: "1",
        },
        select: {
          id: true,
          MasterPencarianInvestor: true,
          countDown: true,
          progress: true,
        },
      });

      for (let a of data) {
        if (
          (a.MasterPencarianInvestor?.name as any) -
            moment(new Date()).diff(new Date(a.countDown as any), "days") <=
          0
        ) {
          await prisma.investasi.update({
            where: {
              id: a.id,
            },
            data: {
              masterProgresInvestasiId: "3",
            },
          });
        }

        if (a.progress === "100") {
          await prisma.investasi.update({
            where: {
              id: a.id,
            },
            data: {
              masterProgresInvestasiId: "2",
            },
          });
        }
      }

      // cek data yang lewat
      // klo ada,  update status
      const dataAwal = await prisma.investasi.findMany({
        orderBy: [
          {
            masterProgresInvestasiId: "asc",
          },
          {
            countDown: "desc",
          },
        ],
        where: {
          masterStatusInvestasiId: "1",
        },
        select: {
          id: true,
          imageId: true,
          title: true,
          progress: true,
          countDown: true,
          MasterPencarianInvestor: {
            select: {
              name: true,
            },
          },
        },
      });

      dataFix = dataAwal.map((v: any) => ({
        ..._.omit(v, ["MasterPencarianInvestor"]),
        pencarianInvestor: v.MasterPencarianInvestor.name,
      }));
    } else {
      const data = await prisma.investasi.findMany({
        where: {
          masterStatusInvestasiId: "1",
          masterProgresInvestasiId: "1",
        },
        select: {
          id: true,
          MasterPencarianInvestor: true,
          countDown: true,
          progress: true,
        },
      });

      for (let a of data) {
        if (
          (a.MasterPencarianInvestor?.name as any) -
            moment(new Date()).diff(new Date(a.countDown as any), "days") <=
          0
        ) {
          await prisma.investasi.update({
            where: {
              id: a.id,
            },
            data: {
              masterProgresInvestasiId: "3",
            },
          });
        }

        if (a.progress === "100") {
          await prisma.investasi.update({
            where: {
              id: a.id,
            },
            data: {
              masterProgresInvestasiId: "2",
            },
          });
        }
      }

      // cek data yang lewat
      // klo ada,  update status
      const dataAwal = await prisma.investasi.findMany({
        take: dataTake,
        skip: dataSkip,
        orderBy: [
          {
            masterProgresInvestasiId: "asc",
          },
          {
            countDown: "desc",
          },
        ],
        where: {
          masterStatusInvestasiId: "1",
        },
        select: {
          id: true,
          imageId: true,
          title: true,
          progress: true,
          countDown: true,
          MasterPencarianInvestor: {
            select: {
              name: true,
            },
          },
        },
      });

      dataFix = dataAwal.map((v: any) => ({
        ..._.omit(v, ["MasterPencarianInvestor"]),
        pencarianInvestor: v.MasterPencarianInvestor.name,
      }));
    }

    return NextResponse.json(
      { success: true, message: "Berhasil mendapatkan data", data: dataFix },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mendapatkan data, coba lagi nanti ",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
