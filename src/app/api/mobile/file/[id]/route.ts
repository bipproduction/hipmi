import { NextResponse } from "next/server";

export { DELETE };

async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const deleteFile = await fetch(
      `https://wibu-storage.wibudev.com/api/files/${id}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.WS_APIKEY}`,
        },
      }
    );

    if (deleteFile.ok) {
      return NextResponse.json(
        {
          success: true,
          message: "File berhasil dihapus",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus file, coba lagi nanti (error: 500)",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
