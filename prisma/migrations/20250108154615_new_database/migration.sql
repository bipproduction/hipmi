/*
  Warnings:

  - You are about to drop the column `imagesId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `MasterBank` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `MasterBank` table. All the data in the column will be lost.
  - You are about to drop the column `imagesBackgroundId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `imagesId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `ImagesBackground` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `namaAkun` to the `MasterBank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaBank` to the `MasterBank` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_imagesId_fkey";

-- DropForeignKey
ALTER TABLE "Notifikasi" DROP CONSTRAINT "NotifikasiAdmin";

-- DropForeignKey
ALTER TABLE "Notifikasi" DROP CONSTRAINT "NotifikasiUser";

-- DropForeignKey
ALTER TABLE "Portofolio" DROP CONSTRAINT "Portofolio_logoId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_imagesBackgroundId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_imagesId_fkey";

-- DropIndex
DROP INDEX "Profile_imagesBackgroundId_key";

-- DropIndex
DROP INDEX "Profile_imagesId_key";

-- AlterTable
ALTER TABLE "BeritaInvestasi" ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "DokumenInvestasi" ADD COLUMN     "fileId" TEXT,
ALTER COLUMN "url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Donasi" ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "Donasi_Cerita" ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "Donasi_Invoice" ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "Donasi_Kabar" ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "Donasi_PencairanDana" ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "Donasi_TemporaryCreate" ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "isArsip" BOOLEAN DEFAULT false,
ADD COLUMN     "tanggalSelesai" TIMESTAMP(3),
ALTER COLUMN "tanggal" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Event_Peserta" ADD COLUMN     "isPresent" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Investasi" ADD COLUMN     "imageId" TEXT,
ADD COLUMN     "prospektusFileId" TEXT;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "imagesId",
ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "MasterBank" DROP COLUMN "active",
DROP COLUMN "name",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "namaAkun" TEXT NOT NULL,
ADD COLUMN     "namaBank" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Notifikasi" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "adminId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "imagesBackgroundId",
DROP COLUMN "imagesId",
ADD COLUMN     "imageBackgroundId" TEXT,
ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "ProspektusInvestasi" ADD COLUMN     "fileId" TEXT,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "active" SET DEFAULT false;

-- AlterTable
ALTER TABLE "UserSession" ALTER COLUMN "expires" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Voting" ADD COLUMN     "isArsip" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "ImagesBackground";

-- CreateTable
CREATE TABLE "Investasi_Invoice" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nominal" TEXT NOT NULL,
    "lembarTerbeli" TEXT NOT NULL,
    "investasiId" TEXT,
    "masterBankId" TEXT,
    "statusInvoiceId" TEXT,
    "authorId" TEXT,
    "imagesId" TEXT,
    "imageId" TEXT,

    CONSTRAINT "Investasi_Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestasiMaster_StatusInvoice" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestasiMaster_StatusInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessMaps" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "namePin" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "authorId" TEXT,
    "portofolioId" TEXT,
    "imageId" TEXT,
    "pinId" TEXT,

    CONSTRAINT "BusinessMaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterKategoriApp" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT,

    CONSTRAINT "MasterKategoriApp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessMaps_portofolioId_key" ON "BusinessMaps"("portofolioId");

-- AddForeignKey
ALTER TABLE "Investasi_Invoice" ADD CONSTRAINT "Investasi_Invoice_investasiId_fkey" FOREIGN KEY ("investasiId") REFERENCES "Investasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investasi_Invoice" ADD CONSTRAINT "Investasi_Invoice_masterBankId_fkey" FOREIGN KEY ("masterBankId") REFERENCES "MasterBank"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investasi_Invoice" ADD CONSTRAINT "Investasi_Invoice_statusInvoiceId_fkey" FOREIGN KEY ("statusInvoiceId") REFERENCES "InvestasiMaster_StatusInvoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investasi_Invoice" ADD CONSTRAINT "Investasi_Invoice_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investasi_Invoice" ADD CONSTRAINT "Investasi_Invoice_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifikasi" ADD CONSTRAINT "NotifikasiUser" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifikasi" ADD CONSTRAINT "NotifikasiAdmin" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessMaps" ADD CONSTRAINT "BusinessMaps_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessMaps" ADD CONSTRAINT "BusinessMaps_portofolioId_fkey" FOREIGN KEY ("portofolioId") REFERENCES "Portofolio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
