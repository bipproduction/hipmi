"use server";

import prisma from "@/lib/prisma";
import {
  MODEL_VOTING,
  MODEL_VOTING_DAFTAR_NAMA_VOTE,
} from "../../model/interface";
import { revalidatePath } from "next/cache";
import _ from "lodash";

export async function Vote_funEditById(
  data: MODEL_VOTING,
  listVoting: MODEL_VOTING_DAFTAR_NAMA_VOTE[]
) {
  // console.log(listVoting)
  const updtVoting = await prisma.voting.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      deskripsi: data.deskripsi.trim(),
      awalVote: data.awalVote,
      akhirVote: data.akhirVote,
    },
    select: {
      Voting_DaftarNamaVote: {
        where: {
          isActive: true,
        },
      },
    },
  });
  if (!updtVoting) return { status: 400, message: "Gagal Update" };

  const delPilihan = await prisma.voting_DaftarNamaVote.deleteMany({
    where: {
      votingId: data.id,
    },
  });
  if (!delPilihan) return { status: 400, message: "Gagal Update Pilihan" };

  for (let v of listVoting) {
    const val = v.value;

    const namaPilihan = await prisma.voting_DaftarNamaVote.create({
      data: {
        value: val,
        votingId: data.id,
      },
    });

    if (!namaPilihan) return { status: 400, message: "Gagal Membuat List" };
  }

  revalidatePath(`/dev/vote/detail/draft`);
  return {
    status: 200,
    message: "Berhasil Update",
  };
}
