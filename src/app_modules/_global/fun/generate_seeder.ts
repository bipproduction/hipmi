import prisma from "@/lib/prisma";
import bidangBisnis from "../../../bin/seeder/bidang_bisnis.json";
import collaboration_industri from "../../../bin/seeder/colab/master_industri.json";
import collaboration_status from "../../../bin/seeder/colab/master_status.json";
import donasi_namaBank from "../../../bin/seeder/donasi/master_bank.json";
import donasi_durasi from "../../../bin/seeder/donasi/master_durasi.json";
import donasi_kategori from "../../../bin/seeder/donasi/master_kategori.json";
import donasi_status from "../../../bin/seeder/donasi/master_status.json";
import donasi_status_invoice from "../../../bin/seeder/donasi/master_status_invoice.json";
import event_status from "../../../bin/seeder/event/master_status.json";
import event_tipe_acara from "../../../bin/seeder/event/master_tipe_acara.json";
import forum_kategori_report from "../../../bin/seeder/forum/master_report.json";
import forum_status_posting from "../../../bin/seeder/forum/master_status.json";
import jenisProgres from "../../../bin/seeder/investasi/master_progres.json";
import pembagianDeviden from "../../../bin/seeder/investasi/pembagian_deviden.json";
import pencarianInvestor from "../../../bin/seeder/investasi/pencarian_investor.json";
import periodeDeviden from "../../../bin/seeder/investasi/periode_deviden.json";
import statusInvestasi from "../../../bin/seeder/investasi/status_investasi.json";
import statusTransaksiInvestasi from "../../../bin/seeder/investasi/status_transaksi_investasi.json";
import master_status from "../../../bin/seeder/master_status.json";
import nomor_admin from "../../../bin/seeder/nomor_admin.json";
import userRole from "../../../bin/seeder/user_role.json";
import userSeeder from "../../../bin/seeder/user_seeder.json";
import voting_status from "../../../bin/seeder/voting/master_status.json";
import { master_kategori_app } from "@/bin/seeder/master";
import { new_status_transaksi_investasi } from "@/bin/seeder/investasi";
import { master_nama_bank } from "@/bin/seeder/master";
import { master_status_transaksi } from "@/bin/seeder/master";
import pLimit from "p-limit";
import { master_new_bidang_bisnis } from "@/bin/seeder/master";
import { master_emotions } from "@/bin/seeder/master";

async function masterUserRole() {
  for (let i of userRole) {
    await prisma.masterUserRole.upsert({
      where: {
        id: i.id.toString(),
      },
      update: {
        id: i.id.toString(),
        name: i.name,
      },
      create: {
        id: i.id.toString(),
        name: i.name,
      },
    });
  }
  console.log("masterUserRole success");
}

async function seederUser() {
  for (let i of userSeeder) {
    await prisma.user.upsert({
      where: {
        nomor: i.nomor,
      },
      create: {
        nomor: i.nomor,
        username: i.name,
        masterUserRoleId: i.masterUserRoleId,
        active: i.active,
      },
      update: {
        nomor: i.nomor,
        username: i.name,
        masterUserRoleId: i.masterUserRoleId,
        active: i.active,
      },
    });
  }
  console.log("user seeder success");
}

// async function masterBisnis() {
//   for (let i of bidangBisnis) {
//     await prisma.masterBidangBisnis.upsert({
//       where: {
//         id: i.id.toString(),
//       },
//       update: {
//         id: i.id.toString(),
//         name: i.name,
//       },
//       create: {
//         id: i.id.toString(),
//         name: i.name,
//       },
//     });
//   }
//   console.log("masterBisnis success");
// }

async function masterNewBidangBisnis() {
  for (let i of master_new_bidang_bisnis) {
    try {
      // Upsert MasterBidangBisnis
      const masterBidangBisnis = await prisma.masterBidangBisnis.upsert({
        where: {
          id: i.id.toString(),
        },
        update: {
          name: i.name,
          slug: i.slug,
        },
        create: {
          id: i.id.toString(),
          name: i.name,
          slug: i.slug,
        },
      });

      // Upsert untuk setiap subBidangBisnis dengan await untuk memastikan urutan tetap terjaga
      for (let sub of i.subBidangBisnis) {
        await prisma.masterSubBidangBisnis.upsert({
          where: {
            id: sub.id,
          },
          update: {
            name: sub.name,
            slug: sub.slug,
            masterBidangBisnisId: masterBidangBisnis.id,
          },
          create: {
            id: sub.id,
            name: sub.name,
            slug: sub.slug,
            masterBidangBisnisId: masterBidangBisnis.id,
          },
        });
      }
    } catch (error) {
      console.error(
        `Terjadi error saat upserting bidang bisnis ${i.name}:`,
        error
      );
    }
  }

  console.log("Semua masterBidangBisnis dan subBidangBisnis berhasil di-seed");
}

async function masterPencarianInvestor() {
  for (let i of pencarianInvestor) {
    await prisma.masterPencarianInvestor.upsert({
      where: {
        id: i.id.toString(),
      },
      update: {
        id: i.id.toString(),
        name: i.name,
      },
      create: {
        id: i.id.toString(),
        name: i.name,
      },
    });
  }

  console.log("masterPencarianInvestor success");
}

async function masterPembagianDeviden() {
  for (let i of pembagianDeviden) {
    await prisma.masterPembagianDeviden.upsert({
      where: {
        id: i.id.toString(),
      },
      update: {
        id: i.id.toString(),
        name: i.name,
      },
      create: {
        id: i.id.toString(),
        name: i.name,
      },
    });
  }

  console.log("masterPembagianDeviden success");
}

async function masterPeriodeDeviden() {
  for (let i of periodeDeviden) {
    await prisma.masterPeriodeDeviden.upsert({
      where: {
        id: i.id.toString(),
      },
      update: {
        id: i.id.toString(),
        name: i.name,
      },
      create: {
        id: i.id.toString(),
        name: i.name,
      },
    });
  }

  console.log("masterPeriodeDeviden success");
}

async function masterStatusInvestasi() {
  for (let i of statusInvestasi) {
    await prisma.masterStatusInvestasi.upsert({
      where: {
        id: i.id,
      },
      create: {
        id: i.id,
        name: i.name,
        color: i.color,
      },
      update: {
        id: i.id,
        name: i.name,
        color: i.color,
      },
    });
  }

  console.log("masterStatusInvestasi success");
}

async function masterNamaBank() {
  for (let i of master_nama_bank) {
    await prisma.masterBank.upsert({
      where: {
        id: i.id.toString(),
      },
      create: {
        id: i.id.toString(),
        namaBank: i.namaBank,
        namaAkun: i.namaAkun,
        norek: i.norek.toString(),
      },
      update: {
        id: i.id.toString(),
        namaBank: i.namaBank,
        namaAkun: i.namaAkun,
        norek: i.norek.toString(),
      },
    });
  }

  console.log("masterNamaBank success");
}

async function masterStatusTransaksiInvestasi() {
  for (let i of statusTransaksiInvestasi) {
    await prisma.masterStatusTransaksiInvestasi.upsert({
      where: {
        id: i.id,
      },
      create: {
        id: i.id,
        name: i.name,
        color: i.color,
      },
      update: {
        id: i.id,
        name: i.name,
        color: i.color,
      },
    });
  }

  console.log("masterStatusTransaksiInvestasi success");
}

async function masterProgressInvestasi() {
  for (let i of jenisProgres) {
    await prisma.masterProgresInvestasi.upsert({
      where: {
        id: i.id,
      },
      create: {
        id: i.id,
        name: i.name,
      },
      update: {
        name: i.name,
      },
    });
  }

  console.log("masterProgressInvestasi success");
}

async function masterStatusDonasi() {
  for (let d of donasi_status) {
    await prisma.donasiMaster_StatusDonasi.upsert({
      where: {
        id: d.id,
      },
      create: {
        id: d.id,
        name: d.name,
      },
      update: {
        name: d.name,
      },
    });
  }

  console.log("masterStatusDonasi success");
}

async function masterKategoriDonasi() {
  for (let d of donasi_kategori) {
    await prisma.donasiMaster_Kategori.upsert({
      where: {
        id: d.id,
      },
      create: {
        id: d.id,
        name: d.name,
      },
      update: {
        name: d.name,
      },
    });
  }

  console.log("masterKategoriDonasi success");
}

async function masterDurasiDonasi() {
  for (let d of donasi_durasi) {
    await prisma.donasiMaster_Durasi.upsert({
      where: {
        id: d.id,
      },
      create: {
        id: d.id,
        name: d.name,
      },
      update: {
        name: d.name,
      },
    });
  }

  console.log("masterDurasiDonasi success");
}

async function masterDonasiNamaBank() {
  for (let i of donasi_namaBank) {
    await prisma.donasiMaster_Bank.upsert({
      where: {
        id: i.id,
      },
      create: {
        id: i.id,
        name: i.name,
        norek: i.norek,
      },
      update: {
        id: i.id,
        name: i.name,
        norek: i.norek,
      },
    });
  }

  console.log("masterDonasiBank success");
}

async function masterDonasiStatusInvoice() {
  for (let d of donasi_status_invoice) {
    await prisma.donasiMaster_StatusInvoice.upsert({
      where: {
        id: d.id,
      },
      create: {
        id: d.id,
        name: d.name,
      },
      update: {
        name: d.name,
      },
    });
  }

  console.log("masterDonasiStatusInvoice success");
}

async function masterEventStatus() {
  for (let e of event_status) {
    await prisma.eventMaster_Status.upsert({
      where: {
        id: e.id,
      },
      create: {
        id: e.id,
        name: e.name,
      },
      update: {
        name: e.name,
      },
    });
  }

  console.log("masterEventStatus success");
}

async function masterEventTipeAcara() {
  for (let e of event_tipe_acara) {
    await prisma.eventMaster_TipeAcara.upsert({
      where: {
        id: e.id,
      },
      create: {
        id: e.id,
        name: e.name,
      },
      update: {
        name: e.name,
      },
    });
  }

  console.log("masterEventTipeAcara success");
}

async function masterVotingStatus() {
  for (let v of voting_status) {
    await prisma.voting_Status.upsert({
      where: {
        id: v.id,
      },
      create: {
        id: v.id,
        name: v.name,
      },
      update: {
        name: v.name,
      },
    });
  }

  console.log("masterVotingStatus success");
}

async function masterStatusProses() {
  for (let m of master_status) {
    await prisma.masterStatus.upsert({
      where: {
        id: m.id,
      },
      create: {
        id: m.id,
        name: m.name,
      },
      update: {
        name: m.name,
      },
    });
  }

  console.log("masterStatusProses success");
}

async function masterForumKategoriReport() {
  for (let m of forum_kategori_report) {
    await prisma.forumMaster_KategoriReport.upsert({
      where: {
        id: m.id as number,
      },
      create: {
        title: m.title,
        deskripsi: m.deskripsi,
      },
      update: {
        title: m.title,
        deskripsi: m.deskripsi,
      },
    });
  }

  console.log("masterForumKategoriReport success");
}

async function masterForumStatusPosting() {
  for (let s of forum_status_posting) {
    await prisma.forumMaster_StatusPosting.upsert({
      where: {
        id: s.id,
      },
      create: {
        status: s.status,
      },
      update: {
        status: s.status,
      },
    });
  }

  console.log("masterForumStatusPosting success");
}

async function masterCollaborationIndustri() {
  for (let p of collaboration_industri) {
    await prisma.projectCollaborationMaster_Industri.upsert({
      where: {
        id: p.id,
      },
      create: {
        name: p.name,
      },
      update: {
        name: p.name,
      },
    });
  }

  console.log("masterCollaborationIndustri success");
}

async function masterCollaborationStatus() {
  for (let p of collaboration_status) {
    await prisma.projectCollaborationMaster_Status.upsert({
      where: {
        id: p.id,
      },
      create: {
        name: p.name,
      },
      update: {
        name: p.name,
      },
    });
  }

  console.log("masterCollaborationStatus success");
}

async function seederNomorAdmin() {
  for (let a of nomor_admin) {
    await prisma.nomorAdmin.upsert({
      where: {
        id: a.id,
      },
      create: {
        id: a.id,
        nomor: a.nomor,
      },
      update: {
        id: a.id,
        nomor: a.nomor,
      },
    });
  }

  console.log("seederNomorAdmin success");
}

async function masterKategoriApp() {
  for (let a of master_kategori_app) {
    await prisma.masterKategoriApp.upsert({
      where: {
        id: a.id,
      },
      create: {
        id: a.id,
        name: a.name,
      },
      update: {
        id: a.id,
        name: a.name,
      },
    });
  }

  console.log("masterKategoriApp success");
}

async function masterInvestasiNewTransaksiStatus() {
  for (let a of new_status_transaksi_investasi) {
    await prisma.investasiMaster_StatusInvoice.upsert({
      where: {
        id: a.id,
      },
      create: {
        id: a.id,
        name: a.name,
      },
      update: {
        id: a.id,
        name: a.name,
      },
    });
  }

  console.log("masterInvestasiNewTransaksiStatus success");
}

async function masterStatusTransaksi() {
  for (let a of master_status_transaksi) {
    await prisma.masterStatusTransaksi.upsert({
      where: {
        id: a.id,
      },
      create: {
        id: a.id,
        name: a.name,
      },
      update: {
        id: a.id,
        name: a.name,
      },
    });
  }

  console.log("masterStatusTransaksi success");
}

async function masterEmotions() {
  await Promise.all(
    master_emotions.map((a) =>
      prisma.masterEmotions.upsert({
        where: { value: a.value },
        create: { value: a.value, label: a.label },
        update: { value: a.value, label: a.label },
      })
    )
  );

  console.log("masterEmotions success");
}

const listSeederQueue = [
  masterUserRole,
  seederUser,
  // masterBisnis,
  masterNewBidangBisnis,
  masterPencarianInvestor,
  masterPembagianDeviden,
  masterPeriodeDeviden,
  masterStatusInvestasi,
  masterNamaBank,
  masterStatusTransaksiInvestasi,
  masterProgressInvestasi,
  masterStatusDonasi,
  masterKategoriDonasi,
  masterDurasiDonasi,
  masterDonasiNamaBank,
  masterDonasiStatusInvoice,
  masterEventStatus,
  masterEventTipeAcara,
  masterVotingStatus,
  masterStatusProses,
  masterForumKategoriReport,
  masterForumStatusPosting,
  masterCollaborationIndustri,
  masterCollaborationStatus,
  seederNomorAdmin,
  masterKategoriApp,
  masterInvestasiNewTransaksiStatus,
  masterStatusTransaksi,
  masterEmotions,
];
const limit = pLimit(1);

export async function generate_seeder() {
  try {
    await Promise.all(listSeederQueue.map((fn) => limit(fn)));
  } catch (error) {
    console.error("error generate seeder", error);
  }

  return { status: 200, success: true };
}
