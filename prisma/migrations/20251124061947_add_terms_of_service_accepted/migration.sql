-- AlterTable
ALTER TABLE "Donasi_Invoice" ALTER COLUMN "masterBankId" SET DEFAULT 'null';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "termsOfServiceAccepted" BOOLEAN NOT NULL DEFAULT false;
