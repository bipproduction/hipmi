"use server";

import prisma from "@/lib/prisma";
import { MODEL_VOTING_DAFTAR_NAMA_VOTE } from "../../model/interface";
import _ from "lodash";

export async function Vote_getHasilVoteById(
  daftarPilihanVoting: MODEL_VOTING_DAFTAR_NAMA_VOTE[]
) {
  // console.log(daftarPilihanVoting)

  //   for (let e of daftarPilihanVoting) {
  //     const get = await prisma.voting_Kontributor.count({
  //       where: {
  //         voting_DaftarNamaVoteId: e.id,
  //       },
  //     });

  //     console.log(get);
  //     return get
  //   }

  const data = await prisma.voting_Kontributor.findMany({
    where: {
      votingId: "clsijw6uf0001x5logh7msuh1",
    },
  });

  const hitung = _.map(
    _.groupBy(data, "voting_DaftarNamaVoteId"),
    (v: any) => ({
      jumlah: v.length,
      idDaftarNama: v[0].voting_DaftarNamaVoteId,
    })
  );

//   const filter = hitung.filter(
//     (i: any) => i.idDaftarNama == "clsijw6ur0002x5loqsq6g4id"
//   );

  return hitung
}
