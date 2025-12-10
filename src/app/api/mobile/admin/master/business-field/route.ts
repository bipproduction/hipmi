import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import _ from "lodash";
import { Prisma } from "@prisma/client";

export { GET, POST };

async function GET(request: Request) {
  try {
    const data = await prisma.masterBidangBisnis.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil mendapatkan data",
      data: data,
    });
  } catch (error) {
    console.error(
      "Error Get Master Bidang Bisnis >>",
      error || (error as Error).message
    );
    return NextResponse.json({
      status: 500,
      success: false,
      message: "API Error Get Master Bidang Bisnis ",
      reason: (error as Error).message,
    });
  }
}

type BidangInput = {
  name: string;
};

type SubBidangInput = {
  name: string;
};

type RequestBody = {
  data: {
    bidang: BidangInput;
    subBidang: SubBidangInput[];
  };
};

/* ---------------------------
   POST handler
   - body: { bidang: { name }, subBidang: [{ name }, ...] }
   - buat masterBidangBisnis (id incremental dari count + 1)
   - generate id untuk tiap subBidang, cek unik, dan createMany via transaction
   --------------------------- */
async function POST(request: Request) {
  try {
    const { data } = (await request.json()) as RequestBody;

    console.log("body >>", data.bidang.name);

    if (!data.bidang.name || !Array.isArray(data.subBidang)) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message:
            "Invalid payload. Expect { bidang: { name }, subBidang: [] }",
        },
        { status: 400 }
      );
    }

    // run in transaction to avoid race conditions
    const result = await prisma.$transaction(async (tx) => {
      // ambil last id numerik dengan cast (Postgres)
      const rows = await tx.$queryRaw<{ id: string }[]>`
        SELECT id FROM "MasterBidangBisnis" ORDER BY (id::int) DESC LIMIT 1;
      `;
      const lastId = rows[0]?.id ?? null;
      const bidangId = lastId ? String(Number(lastId) + 1) : "1";
      console.log("bidangId >>", bidangId);

      const slugName = data.bidang.name.toLowerCase().replace(/\s+/g, "_");

      const createdBidang = await tx.masterBidangBisnis.create({
        data: {
          id: bidangId,
          name: data.bidang.name,
          slug: slugName,
        },
      });

      // 2) hitung existing sub bidang untuk bidang ini
      const existingSubCount = await tx.masterSubBidangBisnis.count({
        where: { masterBidangBisnisId: createdBidang.id },
      });

      console.log("existingSubCount >>", existingSubCount);

      // 3) generate unique ids satu-per-satu (cek ke DB via tx)
      const subBidangToCreate: {
        id: string;
        name: string;
        masterBidangBisnisId: string;
      }[] = [];

      for (let i = 0; i < data.subBidang.length; i++) {
        const seqNumber = existingSubCount + i + 1; // 1-based
        const uniqueId = await generateUniqueSubBidangId(
          data.bidang.name,
          seqNumber,
          tx
        );

        // push object to array
        subBidangToCreate.push({
          id: uniqueId,
          name: data.subBidang[i].name,
          masterBidangBisnisId: createdBidang.id,
        });
      }

      // 4) createMany (batched) -- note: createMany doesn't return created rows
      if (subBidangToCreate.length > 0) {
        await tx.masterSubBidangBisnis.createMany({
          data: subBidangToCreate,
          skipDuplicates: false, // kita sudah memastikan unik, so false
        });
      }

      return { createdBidang, subBidang: subBidangToCreate };
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil menambahkan bidang dan sub bidang",
      data: result,
    });
  } catch (error) {
    console.error("Error Post Master Business Field >>", error);
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: "API Error Post Data",
        reason: msg,
      },
      { status: 500 }
    );
  }
}

/* ---------------------------
   Helper: generate base code
   - mengabaikan stop words: 'dan', 'atau', '&'
   - ambil dua kata pertama yang tersisa
   - ambil 3 huruf pertama tiap kata (jika ada)
   --------------------------- */
function generateBaseCode(name: string) {
  const stopWords = new Set(["dan", "atau", "&"]);
  // keep only letters and spaces, normalize spaces
  const cleaned = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .replace(/[^a-zA-Z\s&]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  const words = cleaned
    .split(" ")
    .filter((w) => w.length > 0 && !stopWords.has(w));

  const primary = (words[0] ?? "xxx").substring(0, 3).toUpperCase();
  const secondary = words[1] ? words[1].substring(0, 3).toUpperCase() : "";

  return { primary, secondary };
}

function padNumber(n: number) {
  return String(n).padStart(2, "0");
}

/* ---------------------------
   generateUniqueSubBidangId
   - cek urutan strategi:
     1) PRIMARY-<NN>
     2) PRIMARY-SECONDARY-<NN> (jika secondary ada)
     3) PRIMARYSECONDARY-<NN> (jika secondary ada)
     4) fallback: PRIMARY + last4Timestamp -<NN>
   - menggunakan tx (Prisma.TransactionClient) untuk cek di DB
   --------------------------- */
async function generateUniqueSubBidangId(
  bidangName: string,
  number: number,
  tx: Prisma.TransactionClient
): Promise<string> {
  const { primary, secondary } = generateBaseCode(bidangName);
  const num = padNumber(number);

  const candidates: string[] = [];
  candidates.push(`${primary}-${num}`);
  if (secondary) candidates.push(`${primary}-${secondary}-${num}`);
  if (secondary) candidates.push(`${primary}${secondary}-${num}`);
  // final fallback
  candidates.push(`${primary}${String(Date.now()).slice(-4)}-${num}`);

  for (const id of candidates) {
    // findUnique requires unique field; assuming `id` is the PK/unique
    const found = await tx.masterSubBidangBisnis.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!found) return id;
  }

  // theoretically unreachable, but return a final deterministic fallback
  return `${primary}-${String(Math.floor(Math.random() * 9000) + 1000)}-${num}`;
}
