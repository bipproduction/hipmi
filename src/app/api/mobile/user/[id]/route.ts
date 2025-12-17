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
            imageId: true,
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
            prospektusFileId: true,
            imageId: true,
            BeritaInvestasi: {
              select: {
                id: true,
                imageId: true,
              },
            },
            DokumenInvestasi: {
              select: {
                id: true,
                fileId: true,
              },
            },
          },
        },

        Investasi_Invoice: {
          select: {
            id: true,
            imageId: true,
          },
        },

        // INVITATION END

        // DONATION START
        Donasi: {
          select: {
            id: true,
            imageId: true,
            CeritaDonasi: {
              select: {
                id: true,
                imageId: true,
              },
            },
            Donasi_Kabar: {
              select: {
                id: true,
                imageId: true,
              },
            },
            Donasi_PencairanDana: {
              select: {
                id: true,
                imageId: true,
              },
            },
          },
        },

        Donasi_Invoice: {
          select: {
            id: true,
            imageId: true,
          },
        },

        // DONATION END

        // PROFILE & PORTOFOLOIO START
        Profile: {
          select: {
            id: true,
            Portofolio: {
              select: {
                id: true,
                logoId: true,
                BusinessMaps: {
                  select: {
                    id: true,
                    imageId: true,
                  },
                },
                Portofolio_MediaSosial: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
        // PROFILE & PORTOFOLOIO END
      },
    });

    // =================================================== //
    // ================ START DELETE ALL ================= //
    // =================================================== //

    // EVENT DELETE START
    for (let event of checkUser?.Event_Peserta as any) {
      const deleteEvent = await prisma.event_Peserta.delete({
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

    for (let event of checkUser?.Event as any) {
      const deleteEvent = await prisma.event.delete({
        where: {
          id: event.id,
        },
      });

      console.log(["DELETE EVENT", deleteEvent]);
    }
    // EVENT DELETE END

    // COLLABORATION START

    for (let project of checkUser?.ProjectCollaboration_Partisipasi as any) {
      const deleteProject =
        await prisma.projectCollaboration_Partisipasi.delete({
          where: {
            id: project.id,
          },
        });

      console.log(["DELETE PROJECT PARTISIPASI", deleteProject]);
    }

    for (let project of checkUser?.ProjectCollaboration_RoomChat as any) {
      const deleteProject = await prisma.projectCollaboration_RoomChat.delete({
        where: {
          id: project.id,
        },
      });

      console.log(["DELETE PROJECT ROOMCHAT", deleteProject]);
    }

    for (let project of checkUser?.ProjectCollaboration_AnggotaRoomChat as any) {
      const deleteProject =
        await prisma.projectCollaboration_AnggotaRoomChat.delete({
          where: {
            id: project.id,
          },
        });

      console.log(["DELETE PROJECT ANGGOTA ROOMCHAT", deleteProject]);
    }

    for (let project of checkUser?.ProjectCollaboration_Message as any) {
      const deleteProject = await prisma.projectCollaboration_Message.delete({
        where: {
          id: project.id,
        },
      });

      console.log(["DELETE PROJECT MESSAGE", deleteProject]);
    }

    for (let project of checkUser?.ProjectCollaboration as any) {
      const deleteProject = await prisma.projectCollaboration.delete({
        where: {
          id: project.id,
        },
      });

      console.log(["DELETE PROJECT", deleteProject]);
    }

    // COLLABORATION END

    // VOTING START
    for (let voting of checkUser?.Voting_Kontributor as any) {
      const deleteVotingKontributor = await prisma.voting_Kontributor.delete({
        where: {
          id: voting.id,
        },
      });

      console.log(["DELETE VOTING KONTRIBUTOR", deleteVotingKontributor]);
    }

    for (let voting of checkUser?.Voting as any) {
      for (let id of voting?.Voting_DaftarNamaVote as any) {
        const deleteVotingListName = await prisma.voting_DaftarNamaVote.delete({
          where: {
            id: id.id,
          },
        });
        console.log(["DELETE VOTING LIST NAME", deleteVotingListName]);
      }

      const deleteVoting = await prisma.voting.delete({
        where: {
          id: voting.id,
        },
      });
      console.log(["DELETE VOTING", deleteVoting]);
    }
    // VOTING END

    // JOB START
    for (let job of checkUser?.Job as any) {
      if (job.imageId) {
        const deleteJobImage = await fetch(
          `https://wibu-storage.wibudev.com/api/files/${job.imageId}/delete`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${process.env.WS_APIKEY}`,
            },
          }
        );

        if (deleteJobImage.ok) {
          console.log("Success delete job image");
        }
      }

      const deleteJob = await prisma.job.delete({
        where: {
          id: job.id,
        },
      });
      console.log(["DELETE JOB", deleteJob]);
    }
    // JOB END

    // FORUM START

    for (let forum of checkUser?.Forum_ReportKomentar as any) {
      const deleteForum = await prisma.forum_ReportKomentar.delete({
        where: {
          id: forum.id,
        },
      });
      console.log(["DELETE FORUM REPORT KOMENTAR", deleteForum]);
    }

    for (let forum of checkUser?.Forum_ReportPosting as any) {
      const deleteForum = await prisma.forum_ReportPosting.delete({
        where: {
          id: forum.id,
        },
      });
      console.log(["DELETE FORUM REPORT POSTING", deleteForum]);
    }

    for (let forum of checkUser?.Forum_Komentar as any) {
      const deleteForum = await prisma.forum_Komentar.delete({
        where: {
          id: forum.id,
        },
      });
      console.log(["DELETE FORUM KOMENTAR", deleteForum]);
    }

    for (let forum of checkUser?.Forum_Posting as any) {
      const deleteForum = await prisma.forum_Posting.delete({
        where: {
          id: forum.id,
        },
      });
      console.log(["DELETE FORUM POSTING", deleteForum]);
    }
    // FORUM END

    // INVESTASI START

    for (let invoice of checkUser?.Investasi_Invoice as any) {
      if (invoice?.imageId) {
        const deleteInvoiceImage = await fetch(
          `https://wibu-storage.wibudev.com/api/files/${invoice.imageId}/delete`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${process.env.WS_APIKEY}`,
            },
          }
        );

        if (deleteInvoiceImage.ok) {
          console.log("Success delete invoice image");
        }
      }

      const deleteInvoice = await prisma.investasi_Invoice.delete({
        where: {
          id: invoice.id,
        },
      });
      console.log(["DELETE INVOICE INVESTASI", deleteInvoice]);
    }

    for (let investasi of checkUser?.Investasi as any) {
      for (let berita of investasi?.BeritaInvestasi as any) {
        if (berita?.imageId) {
          const deleteBeritaImage = await fetch(
            `https://wibu-storage.wibudev.com/api/files/${berita.imageId}/delete`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${process.env.WS_APIKEY}`,
              },
            }
          );

          if (deleteBeritaImage.ok) {
            console.log("Success delete image berita investasi");
          }
        }
        const deleteBerita = await prisma.beritaInvestasi.delete({
          where: {
            id: berita.id,
          },
        });
        console.log(["DELETE BERITA INVESTASI", deleteBerita]);
      }

      for (let dokumen of investasi?.DokumenInvestasi as any) {
        if (dokumen?.fileId) {
          const deleteDokumenImage = await fetch(
            `https://wibu-storage.wibudev.com/api/files/${dokumen.fileId}/delete`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${process.env.WS_APIKEY}`,
              },
            }
          );

          if (deleteDokumenImage.ok) {
            console.log("Success delete image dokumen investasi");
          }
        }
        const deleteDokumen = await prisma.dokumenInvestasi.delete({
          where: {
            id: dokumen.id,
          },
        });
        console.log(["DELETE DOKUMEN INVESTASI", deleteDokumen]);
      }

      if (investasi?.prospektusFileId) {
        const deleteProspektusFile = await fetch(
          `https://wibu-storage.wibudev.com/api/files/${investasi.prospektusFileId}/delete`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${process.env.WS_APIKEY}`,
            },
          }
        );

        if (deleteProspektusFile.ok) {
          console.log("Success delete prospektus file investasi");
        }
      }

      if (investasi?.imageId) {
        const deleteInvestasiImage = await fetch(
          `https://wibu-storage.wibudev.com/api/files/${investasi.imageId}/delete`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${process.env.WS_APIKEY}`,
            },
          }
        );

        if (deleteInvestasiImage.ok) {
          console.log("Success delete image investasi");
        }
      }

      const deleteInvestasi = await prisma.investasi.delete({
        where: {
          id: investasi.id,
        },
      });
      console.log(["DELETE INVESTASI", deleteInvestasi]);
    }
    // INVESTASI END

    // DONASI START

    for (let donasiInvoice of checkUser?.Donasi_Invoice as any) {
      if (donasiInvoice?.imageId) {
        const deleteInvoiceImage = await fetch(
          `https://wibu-storage.wibudev.com/api/files/${donasiInvoice.imageId}/delete`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${process.env.WS_APIKEY}`,
            },
          }
        );

        if (deleteInvoiceImage.ok) {
          console.log("Success delete invoice image");
        }
      }
      const deleteInvoice = await prisma.donasi_Invoice.delete({
        where: {
          id: donasiInvoice.id,
        },
      });
      console.log(["DELETE INVOICE DONASI", deleteInvoice]);
    }

    for (let donasi of checkUser?.Donasi as any) {
      for (let kabar of donasi?.Donasi_Kabar as any) {
        if (kabar?.imageId) {
          const deleteKabarImage = await fetch(
            `https://wibu-storage.wibudev.com/api/files/${kabar.imageId}/delete`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${process.env.WS_APIKEY}`,
              },
            }
          );

          if (deleteKabarImage.ok) {
            console.log("Success delete kabar image");
          }
        }
        const deleteKabar = await prisma.donasi_Kabar.delete({
          where: {
            id: kabar.id,
          },
        });
        console.log(["DELETE KABAR DONASI", deleteKabar]);
      }

      for (let pencairanDana of donasi?.Donasi_PencairanDana as any) {
        if (pencairanDana?.imageId) {
          const deletePencairanDanaImage = await fetch(
            `https://wibu-storage.wibudev.com/api/files/${pencairanDana.imageId}/delete`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${process.env.WS_APIKEY}`,
              },
            }
          );

          if (deletePencairanDanaImage.ok) {
            console.log("Success delete pencairan dana image");
          }
        }

        const deletePencairanDana = await prisma.donasi_PencairanDana.delete({
          where: {
            id: pencairanDana.id,
          },
        });
        console.log(["DELETE PENCAIRAN DANA DONASI", deletePencairanDana]);
      }

      const deleteImageCerita = await fetch(
        `https://wibu-storage.wibudev.com/api/files/${donasi?.CeritaDonasi?.imageId}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.WS_APIKEY}`,
          },
        }
      );

      if (deleteImageCerita.ok) {
        console.log("Success delete image cerita donasi");
      }

      const deleteCerita = await prisma.donasi_Cerita.delete({
        where: {
          donasiId: donasi.id,
        },
      });

      console.log(["DELETE CERITA DONASI", deleteCerita]);

      const deleteImageDonasi = await fetch(
        `https://wibu-storage.wibudev.com/api/files/${donasi?.imageId}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.WS_APIKEY}`,
          },
        }
      );

      if (deleteImageDonasi.ok) {
        console.log("Success delete image donasi");
      }

      const deleteDonasi = await prisma.donasi.delete({
        where: {
          id: donasi.id,
        },
      });
      console.log(["DELETE DONASI", deleteDonasi]);
    }

    // DONASI END

    // PORTOFOLIO DELETE START
    for (const portofolio of checkUser?.Profile?.Portofolio as any) {
      if (portofolio?.BusinessMaps?.id) {
        const deleteLogo = await fetch(
          `https://wibu-storage.wibudev.com/api/files/${portofolio?.BusinessMaps?.imageId}/delete`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${process.env.WS_APIKEY}`,
            },
          }
        );

        if (deleteLogo.ok) {
          console.log("Success delete logo");
        }

        const deleteMaps = await prisma.businessMaps.delete({
          where: {
            id: portofolio?.BusinessMaps?.id,
          },
        });
        console.log(["DELETE MAPS", deleteMaps]);
      }

      if (portofolio?.Portofolio_MediaSosial?.id) {
        const deleteSosialMedia = await prisma.portofolio_MediaSosial.delete({
          where: {
            portofolioId: portofolio.id,
          },
        });
        console.log(["DELETE SOSIAL MEDIA", deleteSosialMedia]);
      }

      if (portofolio?.logoId) {
        const deleteLogo = await fetch(
          `https://wibu-storage.wibudev.com/api/files/${portofolio?.logoId}/delete`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${process.env.WS_APIKEY}`,
            },
          }
        );

        if (deleteLogo.ok) {
          console.log("Success delete logo");
        }
      }

      const deletePortofolio = await prisma.portofolio.delete({
        where: {
          id: portofolio.id,
        },
      });

      console.log(["DELETE PORTOFOLIO", deletePortofolio]);
    }

    const deleteProfile = await prisma.profile.delete({
      where: {
        userId: id,
      },
    });
    console.log(["DELETE PROFILE", deleteProfile]);
    // PORTOFOLIO DELETE END

    const deleteUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    console.log(["DELETE USER", deleteUser]);

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
