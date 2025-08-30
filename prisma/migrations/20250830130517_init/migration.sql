-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Account_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropertyType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PropertyType_type_key`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LogementType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `LogementType_type_key`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Logement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `draft` BOOLEAN NULL,
    `displayPreciseAddress` BOOLEAN NULL,
    `postalCode` INTEGER NULL,
    `city` VARCHAR(191) NULL,
    `streetNumber` VARCHAR(191) NULL,
    `streetName` VARCHAR(191) NULL,
    `numero` INTEGER NULL,
    `addressComplement` VARCHAR(191) NULL,
    `stopProcess` VARCHAR(191) NULL,
    `superficie` INTEGER NULL,
    `roomNumber` INTEGER NULL,
    `bedroomNumber` INTEGER NULL,
    `furnished` BOOLEAN NULL,
    `bathRoomSpace` INTEGER NULL,
    `powderRoomSpace` INTEGER NULL,
    `appartmentFloor` INTEGER NULL,
    `kWhEP` INTEGER NULL,
    `kgCO2` INTEGER NULL,
    `accountId` INTEGER NULL,
    `propertyTypeId` INTEGER NULL,
    `logementTypeId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoomArea` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `area` INTEGER NULL,
    `logementId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SpaceShare` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NULL,
    `logementId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Logement` ADD CONSTRAINT `Logement_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Logement` ADD CONSTRAINT `Logement_propertyTypeId_fkey` FOREIGN KEY (`propertyTypeId`) REFERENCES `PropertyType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Logement` ADD CONSTRAINT `Logement_logementTypeId_fkey` FOREIGN KEY (`logementTypeId`) REFERENCES `LogementType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomArea` ADD CONSTRAINT `RoomArea_logementId_fkey` FOREIGN KEY (`logementId`) REFERENCES `Logement`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpaceShare` ADD CONSTRAINT `SpaceShare_logementId_fkey` FOREIGN KEY (`logementId`) REFERENCES `Logement`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
