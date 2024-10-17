/*
  Warnings:

  - You are about to drop the column `type` on the `Alert` table. All the data in the column will be lost.
  - The `affectedArea` column on the `Alert` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `affectedAreaRadius` to the `Alert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alert" DROP COLUMN "type";
ALTER TABLE "Alert" ADD COLUMN     "affectedAreaRadius" FLOAT8 NOT NULL;
ALTER TABLE "Alert" DROP COLUMN "affectedArea";
ALTER TABLE "Alert" ADD COLUMN     "affectedArea" FLOAT8[];
