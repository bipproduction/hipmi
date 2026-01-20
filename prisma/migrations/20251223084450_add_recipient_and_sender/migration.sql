-- DropForeignKey
ALTER TABLE "Notifikasi" DROP CONSTRAINT "Notifikasi_userRoleId_fkey";

-- AlterTable
ALTER TABLE "Notifikasi" ADD COLUMN     "recipientId" TEXT,
ADD COLUMN     "senderId" TEXT,
ALTER COLUMN "userRoleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Notifikasi" ADD CONSTRAINT "Notifikasi_userRoleId_fkey" FOREIGN KEY ("userRoleId") REFERENCES "MasterUserRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifikasi" ADD CONSTRAINT "Notifikasi_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifikasi" ADD CONSTRAINT "Notifikasi_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
