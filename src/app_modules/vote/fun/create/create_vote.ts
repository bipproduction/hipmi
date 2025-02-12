"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import _ from "lodash";
import { revalidatePath } from "next/cache";
import { MODEL_VOTING } from "../../model/interface";

export async function Vote_funCreate(req: MODEL_VOTING, listVote: any[]) {
  const userLoginId = await funGetUserIdByToken();

  const create = await prisma.voting.create({
    data: {
      title: _.startCase(req.title),
      deskripsi: req.deskripsi,
      awalVote: req.awalVote,
      akhirVote: req.akhirVote,
      authorId: userLoginId as string,
    },
    select: {
      id: true,
      title: true,
      Voting_Status: {
        select: {
          name: true,
        },
      },
      authorId: true,
    },
  });

  if (!create) return { status: 400, message: "Gagal Membuat Vote" };

  for (let v of listVote) {
    const val = v.value;

    const namaVote = await prisma.voting_DaftarNamaVote.create({
      data: {
        value: val,
        votingId: create.id,
      },
    });

    if (!namaVote) return { status: 400, message: "Gagal Membuat List" };
  }
  revalidatePath("/dev/vote/main/status");

  return {
    data: create,
    status: 201,
    message: "Berhasil Membuat Vote",
  };
}
