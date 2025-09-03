/*
  Warnings:

  - You are about to drop the column `displayPreciseAddress` on the `Logement` table. All the data in the column will be lost.
  - Added the required column `showAddress` to the `Logement` table without a default value. This is not possible if the table is not empty.
  - Made the column `postalCode` on table `Logement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Logement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `streetNumber` on table `Logement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `streetName` on table `Logement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numero` on table `Logement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stopProcess` on table `Logement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `furnished` on table `Logement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `logementTypeId` on table `Logement` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE logement DROP FOREIGN KEY `logement_logementTypeId_fkey`;

-- DropIndex
DROP INDEX `logement_logementTypeId_fkey` ON logement;

-- AlterTable
ALTER TABLE logement DROP COLUMN `displayPreciseAddress`,
    ADD COLUMN `showAddress` BOOLEAN NOT NULL,
    MODIFY `postalCode` INTEGER NOT NULL,
    MODIFY `city` VARCHAR(191) NOT NULL,
    MODIFY `streetNumber` VARCHAR(191) NOT NULL,
    MODIFY `streetName` VARCHAR(191) NOT NULL,
    MODIFY `numero` INTEGER NOT NULL,
    MODIFY `furnished` BOOLEAN NOT NULL,
    MODIFY `logementTypeId` INTEGER NOT NULL;
