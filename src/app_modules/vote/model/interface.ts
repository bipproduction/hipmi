import { MODEL_USER } from "@/app_modules/home/model/interface";
import { IDefaultMaster, MODEL_NEW_DEFAULT_MASTER } from "@/app_modules/model_global/interface";
import { MODEL_DEFAULT_MASTER_OLD } from "@/app_modules/model_global/model_default_master";

export interface MODEL_VOTING {
  id: string;
  title: string;
  deskripsi: string;
  awalVote: Date;
  akhirVote: Date;
  isActive: boolean;
  createdAt: Date;
  updateAt: Date;
  catatan: string;
  authorId: string;
  Author: MODEL_USER;
  Voting_DaftarNamaVote: MODEL_VOTING_DAFTAR_NAMA_VOTE[];
  isArsip: boolean;
  voting_StatusId: string;
  Voting_Status: IDefaultMaster
}

export interface MODEL_VOTING_DAFTAR_NAMA_VOTE {
  id: string;
  value: string;
  jumlah: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  votingId: string;
}

export interface MODEL_VOTE_KONTRIBUTOR {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  Author: MODEL_USER;
  votingId: string;
  Voting: MODEL_VOTING;
  Voting_DaftarNamaVote: MODEL_VOTING_DAFTAR_NAMA_VOTE;
  voting_DaftarNamaVoteId: string;
}
