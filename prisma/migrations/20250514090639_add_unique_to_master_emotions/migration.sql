-- AlterTable
ALTER TABLE "MasterBidangBisnis" ADD COLUMN     "slug" TEXT NOT NULL DEFAULT 'NULL';

-- CreateTable
CREATE TABLE "Portofolio_BidangDanSubBidangBisnis" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "portofolioId" TEXT,
    "masterBidangBisnisId" TEXT,
    "masterSubBidangBisnisId" TEXT,

    CONSTRAINT "Portofolio_BidangDanSubBidangBisnis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterSubBidangBisnis" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL DEFAULT 'NULL',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "masterBidangBisnisId" TEXT,

    CONSTRAINT "MasterSubBidangBisnis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterStatusTransaksi" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MasterStatusTransaksi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterEmotions" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MasterEmotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSponsor" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "isTransfer" BOOLEAN DEFAULT false,
    "fileName" TEXT NOT NULL,
    "fileExt" TEXT,
    "fileId" TEXT NOT NULL,
    "authorId" TEXT,
    "eventId" TEXT,

    CONSTRAINT "EventSponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventTransaksi" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nominal" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "transferImageId" TEXT,
    "masterBankId" TEXT,
    "authorId" TEXT,
    "eventId" TEXT,
    "eventSponsorId" TEXT,
    "masterStatusTransaksiId" TEXT,

    CONSTRAINT "EventTransaksi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MasterEmotions_value_key" ON "MasterEmotions"("value");

-- CreateIndex
CREATE UNIQUE INDEX "EventTransaksi_eventSponsorId_key" ON "EventTransaksi"("eventSponsorId");

-- AddForeignKey
ALTER TABLE "Portofolio_BidangDanSubBidangBisnis" ADD CONSTRAINT "Portofolio_BidangDanSubBidangBisnis_portofolioId_fkey" FOREIGN KEY ("portofolioId") REFERENCES "Portofolio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portofolio_BidangDanSubBidangBisnis" ADD CONSTRAINT "Portofolio_BidangDanSubBidangBisnis_masterBidangBisnisId_fkey" FOREIGN KEY ("masterBidangBisnisId") REFERENCES "MasterBidangBisnis"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portofolio_BidangDanSubBidangBisnis" ADD CONSTRAINT "Portofolio_BidangDanSubBidangBisnis_masterSubBidangBisnisI_fkey" FOREIGN KEY ("masterSubBidangBisnisId") REFERENCES "MasterSubBidangBisnis"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterSubBidangBisnis" ADD CONSTRAINT "MasterSubBidangBisnis_masterBidangBisnisId_fkey" FOREIGN KEY ("masterBidangBisnisId") REFERENCES "MasterBidangBisnis"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSponsor" ADD CONSTRAINT "EventSponsor_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSponsor" ADD CONSTRAINT "EventSponsor_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTransaksi" ADD CONSTRAINT "EventTransaksi_masterBankId_fkey" FOREIGN KEY ("masterBankId") REFERENCES "MasterBank"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTransaksi" ADD CONSTRAINT "EventTransaksi_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTransaksi" ADD CONSTRAINT "EventTransaksi_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTransaksi" ADD CONSTRAINT "EventTransaksi_eventSponsorId_fkey" FOREIGN KEY ("eventSponsorId") REFERENCES "EventSponsor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTransaksi" ADD CONSTRAINT "EventTransaksi_masterStatusTransaksiId_fkey" FOREIGN KEY ("masterStatusTransaksiId") REFERENCES "MasterStatusTransaksi"("id") ON DELETE SET NULL ON UPDATE CASCADE;
