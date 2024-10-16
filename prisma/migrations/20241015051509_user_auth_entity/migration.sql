-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_entityId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "entityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
