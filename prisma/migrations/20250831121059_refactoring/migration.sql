/*
  Warnings:

  - You are about to drop the column `appartmentFloor` on the `logement` table. All the data in the column will be lost.
  - You are about to drop the column `numero` on the `logement` table. All the data in the column will be lost.
  - Made the column `draft` on table `logement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `superficie` on table `logement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `roomNumber` on table `logement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bedroomNumber` on table `logement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bathRoomSpace` on table `logement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `powderRoomSpace` on table `logement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `kWhEP` on table `logement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `kgCO2` on table `logement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accountId` on table `logement` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `logement` DROP FOREIGN KEY `logement_accountId_fkey`;

-- DropIndex
DROP INDEX `logement_accountId_fkey` ON `logement`;

-- AlterTable
ALTER TABLE `logement` DROP COLUMN `appartmentFloor`,
    DROP COLUMN `numero`,
    ADD COLUMN `floorNumber` INTEGER NULL,
    MODIFY `draft` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `superficie` INTEGER NOT NULL,
    MODIFY `roomNumber` INTEGER NOT NULL,
    MODIFY `bedroomNumber` INTEGER NOT NULL,
    MODIFY `bathRoomSpace` INTEGER NOT NULL,
    MODIFY `powderRoomSpace` INTEGER NOT NULL,
    MODIFY `kWhEP` INTEGER NOT NULL,
    MODIFY `kgCO2` INTEGER NOT NULL,
    MODIFY `accountId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `logement` ADD CONSTRAINT `logement_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `logement` ADD CONSTRAINT `logement_logementTypeId_fkey` FOREIGN KEY (`logementTypeId`) REFERENCES `logementType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
