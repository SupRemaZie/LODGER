-- CreateTable
CREATE TABLE `account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `account_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `propertyType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `propertyType_type_key`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logementType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `logementType_type_key`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logement` (
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
CREATE TABLE `roomArea` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `area` INTEGER NULL,
    `logementId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `spaceShare` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NULL,
    `logementId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE logement ADD CONSTRAINT `logement_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES account(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE logement ADD CONSTRAINT `logement_propertyTypeId_fkey` FOREIGN KEY (`propertyTypeId`) REFERENCES propertyType(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE logement ADD CONSTRAINT `logement_logementTypeId_fkey` FOREIGN KEY (`logementTypeId`) REFERENCES logementType(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE roomArea ADD CONSTRAINT `roomArea_logementId_fkey` FOREIGN KEY (`logementId`) REFERENCES logement(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE spaceShare ADD CONSTRAINT `spaceShare_logementId_fkey` FOREIGN KEY (`logementId`) REFERENCES logement(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
