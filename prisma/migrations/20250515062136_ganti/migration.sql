/*
  Warnings:

  - You are about to drop the `Stiker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_StikerEmotions" DROP CONSTRAINT "_StikerEmotions_B_fkey";

-- DropTable
DROP TABLE "Stiker";

-- CreateTable
CREATE TABLE "Sticker" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "fileName" TEXT,
    "fileExt" TEXT,
    "fileId" TEXT NOT NULL,

    CONSTRAINT "Sticker_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "_StikerEmotions" ADD CONSTRAINT "_StikerEmotions_B_fkey" FOREIGN KEY ("B") REFERENCES "Sticker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
