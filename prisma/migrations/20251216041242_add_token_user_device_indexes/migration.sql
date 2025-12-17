-- AlterTable
ALTER TABLE "Notifikasi" ADD COLUMN     "deepLink" TEXT,
ADD COLUMN     "readAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "TokenUserDevice" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "platform" TEXT,
    "deviceId" TEXT,
    "model" TEXT,
    "appVersion" TEXT,
    "token" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "TokenUserDevice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TokenUserDevice_userId_idx" ON "TokenUserDevice"("userId");

-- CreateIndex
CREATE INDEX "TokenUserDevice_token_idx" ON "TokenUserDevice"("token");

-- AddForeignKey
ALTER TABLE "TokenUserDevice" ADD CONSTRAINT "TokenUserDevice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
