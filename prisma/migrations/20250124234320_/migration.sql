/*
  Warnings:

  - Changed the type of `cohort` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_instructorId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "cohort",
ADD COLUMN     "cohort" INTEGER NOT NULL;
