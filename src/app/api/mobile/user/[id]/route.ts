import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const data = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        Profile: true,
      },
    });

    return NextResponse.json(
      { success: true, message: "Berhasil mendapatkan data", data: data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error get data from API ",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log("[ID USER", id);
  try {
    console.log("[START DELETE ALL >>>]");
    const checkUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        Profile: {
          select: {
            id: true,
            Portofolio: {
              select: {
                id: true,
              },
            },
          },
        },

        // EVENT START
        Event: {
          select: {
            id: true,
          },
        },
        Event_Peserta: {
          select: {
            id: true,
          },
        },
        // EVENT END

        // COLLABORATION START
        ProjectCollaboration: {
          select: {
            id: true,
          },
        },
        ProjectCollaboration_Partisipasi: {
          select: {
            id: true,
          },
        },
        ProjectCollaboration_RoomChat: {
          select: {
            id: true,
          },
        },
        ProjectCollaboration_AnggotaRoomChat: {
          select: {
            id: true,
          },
        },
        ProjectCollaboration_Message: {
          select: {
            id: true,
          },
        },
        // COLLABORATION END

        // VOTING START
        Voting: {
          select: {
            id: true,
            Voting_DaftarNamaVote: {
              select: {
                id: true,
              },
            },
          },
        },
        Voting_Kontributor: {
          select: {
            id: true,
          },
        },

        // VOTING END

        // JOB START
        Job: {
          select: {
            id: true,
          },
        },
        // JOB END

        // FORUM START
        Forum_Posting: {
          select: {
            id: true,
          },
        },
        Forum_Komentar: {
          select: {
            id: true,
          },
        },
        Forum_ReportKomentar: {
          select: {
            id: true,
          },
        },
        Forum_ReportPosting: {
          select: {
            id: true,
          },
        },
        // FORUM END

        // INVITATION START
        Investasi: {
          select: {
            id: true,
            BeritaInvestasi: {
              select: {
                id: true,
              },
            },
            DokumenInvestasi: {
              select: {
                id: true,
              },
            },
            ProspektusInvestasi: {
              select: {
                id: true,
              },
            },
          },
        },

        Investasi_Invoice: {
          select: {
            id: true,
          },
        },

        // INVITATION END

        // DONATION START
        Donasi: {
          select: {
            id: true,
            CeritaDonasi: {
              select: {
                id: true,
              },
            },
            Donasi_Kabar: {
              select: {
                id: true,
              },
            },
            Donasi_PencairanDana: {
              select: {
                id: true,
              },
            },
          },
        },

        Donasi_Invoice: {
          select: {
            id: true,
          },
        },

        // DONATION END
      },
    });

    // EVENT DELETE START
    for (let event of checkUser?.Event as any) {
      const deleteEvent = await prisma.event.findFirst({
        where: {
          id: event.id,
        },
      });

      console.log(["DELETE EVENT", deleteEvent]);
    }

    for (let event of checkUser?.Event_Peserta as any) {
      const deleteEvent = await prisma.event_Peserta.findFirst({
        where: {
          id: event.id,
        },
        select: {
          Event: {
            select: {
              title: true,
            },
          },
        },
      });

      console.log(["DELETE EVENT PESERTA", deleteEvent]);
    }
    // EVENT DELETE END

    // COLLABORATION START
    for (let project of checkUser?.ProjectCollaboration as any) {
      const deleteProject = await prisma.projectCollaboration.findFirst({
        where: {
          id: project.id,
        },
      });

      console.log(["DELETE PROJECT", deleteProject]);
    }

    for (let project of checkUser?.ProjectCollaboration_Partisipasi as any) {
      const deleteProject =
        await prisma.projectCollaboration_Partisipasi.findFirst({
          where: {
            id: project.id,
          },
        });

      console.log(["DELETE PROJECT PARTISIPASI", deleteProject]);
    }

    for (let project of checkUser?.ProjectCollaboration_RoomChat as any) {
      const deleteProject =
        await prisma.projectCollaboration_RoomChat.findFirst({
          where: {
            id: project.id,
          },
        });

      console.log(["DELETE PROJECT ROOMCHAT", deleteProject]);
    }

    for (let project of checkUser?.ProjectCollaboration_AnggotaRoomChat as any) {
      const deleteProject =
        await prisma.projectCollaboration_AnggotaRoomChat.findFirst({
          where: {
            id: project.id,
          },
        });

      console.log(["DELETE PROJECT ANGGOTA ROOMCHAT", deleteProject]);
    }

    for (let project of checkUser?.ProjectCollaboration_Message as any) {
      const deleteProject = await prisma.projectCollaboration_Message.findFirst(
        {
          where: {
            id: project.id,
          },
        }
      );

      console.log(["DELETE PROJECT MESSAGE", deleteProject]);
    }
    // COLLABORATION END

    // VOTING START
    for (let voting of checkUser?.Voting as any) {
      for (let id of voting?.Voting_DaftarNamaVote as any) {
        const deleteVotingListName =
          await prisma.voting_DaftarNamaVote.findFirst({
            where: {
              id: id.id,
            },
          });
        console.log(["DELETE VOTING LIST NAME", deleteVotingListName]);
      }

      const deleteVoting = await prisma.voting.findFirst({
        where: {
          id: voting.id,
        },
      });
      console.log(["DELETE VOTING", deleteVoting]);
    }
    // VOTING END

    // JOB START
    for (let job of checkUser?.Job as any) {
      const deleteJob = await prisma.job.findFirst({
        where: {
          id: job.id,
        },
      });
      console.log(["DELETE JOB", deleteJob]);
    }
    // JOB END

    // FORUM START
    for (let forum of checkUser?.Forum_Posting as any) {
      const deleteForum = await prisma.forum_Posting.findFirst({
        where: {
          id: forum.id,
        },
      });
      console.log(["DELETE FORUM POSTING", deleteForum]);
    }

    for (let forum of checkUser?.Forum_Komentar as any) {
      const deleteForum = await prisma.forum_Komentar.findFirst({
        where: {
          id: forum.id,
        },
      });
      console.log(["DELETE FORUM KOMENTAR", deleteForum]);
    }

    for (let forum of checkUser?.Forum_ReportKomentar as any) {
      const deleteForum = await prisma.forum_ReportKomentar.findFirst({
        where: {
          id: forum.id,
        },
      });
      console.log(["DELETE FORUM REPORT KOMENTAR", deleteForum]);
    }

    for (let forum of checkUser?.Forum_ReportPosting as any) {
      const deleteForum = await prisma.forum_ReportPosting.findFirst({
        where: {
          id: forum.id,
        },
      });
      console.log(["DELETE FORUM REPORT POSTING", deleteForum]);
    }
    // FORUM END

    // INVESTASI START

    for (let invoice of checkUser?.Investasi_Invoice as any) {
      const deleteInvoice = await prisma.investasi_Invoice.findFirst({
        where: {
          id: invoice.id,
        },
      });
      console.log(["DELETE INVOICE INVESTASI", deleteInvoice]);
    }

    for (let investasi of checkUser?.Investasi as any) {
      for (let berita of investasi?.BeritaInvestasi as any) {
        const deleteBerita = await prisma.beritaInvestasi.findFirst({
          where: {
            id: berita.id,
          },
        });
        console.log(["DELETE BERITA INVESTASI", deleteBerita]);
      }

      for (let dokumen of investasi?.DokumenInvestasi as any) {
        const deleteDokumen = await prisma.dokumenInvestasi.findFirst({
          where: {
            id: dokumen.id,
          },
        });
        console.log(["DELETE DOKUMEN INVESTASI", deleteDokumen]);
      }

      const deleteProspektus = await prisma.prospektusInvestasi.findFirst({
        where: {
          investasiId: investasi.id,
        },
      });
      console.log(["DELETE PROSPEKTUS INVESTASI", deleteProspektus]);

      const deleteInvestasi = await prisma.investasi.findFirst({
        where: {
          id: investasi.id,
        },
      });
      console.log(["DELETE INVESTASI", deleteInvestasi]);
    }
    // INVESTASI END

    // DONASI START

    for (let donasi of checkUser?.Donasi_Invoice as any) {
      const deleteInvoice = await prisma.donasi_Invoice.findFirst({
        where: {
          id: donasi.id,
        },
      });
      console.log(["DELETE INVOICE DONASI", deleteInvoice]);
    }

    for (let invoice of checkUser?.Donasi as any) {
      for (let kabar of invoice?.Donasi_Kabar as any) {
        const deleteKabar = await prisma.donasi_Kabar.findFirst({
          where: {
            id: kabar.id,
          },
        });
        console.log(["DELETE KABAR DONASI", deleteKabar]);
      }

      for (let pencairanDana of invoice?.Donasi_PencairanDana as any) {
        const deletePencairanDana = await prisma.donasi_PencairanDana.findFirst(
          {
            where: {
              id: pencairanDana.id,
            },
          }
        );
        console.log(["DELETE PENCAIRAN DANA DONASI", deletePencairanDana]);
      }

      const deleteCerita = await prisma.donasi_Cerita.findFirst({
        where: {
          id: invoice.id,
        },
      });

      console.log(["DELETE CERITA DONASI", deleteCerita]);

      const deleteDonasi = await prisma.donasi.findFirst({
        where: {
          id: invoice.id,
        },
      });
      console.log(["DELETE DONASI", deleteDonasi]);
    }

    // DONASI END

    // PORTOFOLIO DELETE START
    for (const portofolio of checkUser?.Profile?.Portofolio as any) {
      const deletePortofolio = await prisma.portofolio.findFirst({
        where: {
          id: portofolio.id,
        },
        select: {
          logoId: true,
        },
      });

      // const deleteLogo = await fetch(
      //   `https://wibu-storage.wibudev.com/api/files/${deletePortofolio.logoId}/delete`,
      //   {
      //     method: "DELETE",
      //     headers: {
      //       Authorization: `Bearer ${process.env.WS_APIKEY}`,
      //     },
      //   }
      // );

      // if (deleteLogo.ok) {
      //   console.log("Success delete logo");
      // }

      console.log(["DELETE PORTOFOLIO", deletePortofolio]);

      const deleteMaps = await prisma.businessMaps.findFirst({
        where: {
          portofolioId: portofolio.id,
        },
      });

      console.log(["DELETE MAPS", deleteMaps]);

      const deleteSosialMedia = await prisma.portofolio_MediaSosial.findFirst({
        where: {
          portofolioId: portofolio.id,
        },
      });

      console.log(["DELETE SOSIAL MEDIA", deleteSosialMedia]);

      console.log(["DELETE PORTOFOLIOID:", portofolio.id]);
    }

    const deleteProfile = await prisma.profile.findFirst({
      where: {
        userId: id,
      },
    });
    console.log(["DELETE PROFILE", deleteProfile]);
    // PORTOFOLIO DELETE END

    console.log("[END DELETE ALL >>>]");

    return NextResponse.json(
      { success: true, message: "Berhasil menghapus data" },
      { status: 200 }
    );
  } catch (error) {
    console.log(["ERROR DELETE ALL", error]);
    return NextResponse.json(
      {
        success: false,
        message: "Error delete data from API ",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
