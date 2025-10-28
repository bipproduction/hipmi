-- AlterTable
ALTER TABLE "Donasi_Invoice" ADD COLUMN     "masterBankId" TEXT;

-- AddForeignKey
ALTER TABLE "Donasi_Invoice" ADD CONSTRAINT "Donasi_Invoice_masterBankId_fkey" FOREIGN KEY ("masterBankId") REFERENCES "MasterBank"("id") ON DELETE SET NULL ON UPDATE CASCADE;
