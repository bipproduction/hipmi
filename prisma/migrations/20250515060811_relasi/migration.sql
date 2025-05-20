-- CreateTable
CREATE TABLE "Stiker" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "fileName" TEXT,
    "fileExt" TEXT,
    "fileId" TEXT NOT NULL,

    CONSTRAINT "Stiker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StikerEmotions" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_StikerEmotions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_StikerEmotions_B_index" ON "_StikerEmotions"("B");

-- AddForeignKey
ALTER TABLE "_StikerEmotions" ADD CONSTRAINT "_StikerEmotions_A_fkey" FOREIGN KEY ("A") REFERENCES "MasterEmotions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StikerEmotions" ADD CONSTRAINT "_StikerEmotions_B_fkey" FOREIGN KEY ("B") REFERENCES "Stiker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
