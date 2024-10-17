/*
  Warnings:

  - The values [BAJA,MEDIA,ALTA] on the enum `AlertSeverity` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `userId` to the `Alert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "AlertSeverity" ADD VALUE 'Baja';
ALTER TYPE "AlertSeverity" ADD VALUE 'Media';
ALTER TYPE "AlertSeverity" ADD VALUE 'Alta';
ALTER TYPE "AlertSeverity"DROP VALUE 'BAJA';
ALTER TYPE "AlertSeverity"DROP VALUE 'MEDIA';
ALTER TYPE "AlertSeverity"DROP VALUE 'ALTA';

-- AlterTable
ALTER TABLE "Alert" ADD COLUMN     "affectedArea" STRING;
ALTER TABLE "Alert" ADD COLUMN     "userId" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
