/*
  Warnings:

  - You are about to drop the `MenuFeature` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlockedUser" DROP CONSTRAINT "BlockedUser_menuFeatureId_fkey";

-- DropTable
DROP TABLE "MenuFeature";

-- AddForeignKey
ALTER TABLE "BlockedUser" ADD CONSTRAINT "BlockedUser_menuFeatureId_fkey" FOREIGN KEY ("menuFeatureId") REFERENCES "MasterKategoriApp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
