import { PrismaClient } from "@prisma/client";
import { LogementData } from "@/app/api/interface";

const prisma = new PrismaClient();

class CustomError extends Error {
    code: string;

    constructor(message: string, code: string) {
        super(message);
        this.code = code;
    }
}

class Deposit {
    constructor() {}

    async saveData(data: LogementData) {
        try {
            if (!data.email) {
                throw new CustomError("Email requis.", "EMAIL_REQUIRED");
            }

            const account = await prisma.account.findUnique({
                where: { email: data.email },
            });

            if (!account) {
                throw new CustomError("Aucun compte trouvé avec cet email.", "ACCOUNT_NOT_FOUND");
            }

            const logement = await prisma.logementType.findUnique({
                where: { type: data.typeOfLogement },
            });

            if (!logement) {
                throw new CustomError("Type de logement invalide.", "INVALID_LOGEMENT_TYPE");
            }

            const property = await prisma.propertyType.findUnique({
                where: { type: data.typeOfProperty },
            });

            if (!property) {
                throw new CustomError("Type de propriété invalide.", "INVALID_PROPERTY_TYPE");
            }

            const roomAreas = data.roomAreas && data.roomAreas.length > 0 ? {
                create: data.roomAreas.map((roomArea) => ({
                    area: roomArea,
                })),
            } : undefined;

            const spaceShares = data.spaceShare && data.spaceShare.length > 0 ? {
                create: data.spaceShare.map((spaceShare) => ({
                    type: spaceShare,
                })),
            } : undefined;

            await prisma.logement.create({
                data: {
                    draft: data.draft,
                    displayPreciseAddress: data.displayPreciseAddress,
                    postalCode: Number(data.postalCode),
                    city: data.city,
                    street: data.street,
                    numero: Number(data.numero),
                    addressComplement: data.addressComplement,
                    stopProcess: data.stopProcess,
                    superficie: Number(data.superficie),
                    roomNumber: Number(data.roomNumber),
                    bedroomNumber: Number(data.bedroomNumber),
                    furnished: data.furnished,
                    bathRoomSpace: Number(data.bathRoomSpace),
                    powderRoomSpace: Number(data.powderRoomSpace),
                    appartmentFloor: Number(data.appartmentFloor),
                    kWhEP: Number(data.kWhEP),
                    kgCO2: Number(data.kgCO2),
                    accountId: account.id,
                    logementTypeId: logement.id,
                    propertyTypeId: property.id,
                    roomAreas: roomAreas,
                    spaceShares: spaceShares,
                },
            });

            return { status: 'SUCCESS', message: 'Informations sauvegardées avec succès.' };
        } catch (error) {
            if (error instanceof CustomError) {
                return { status: 'ERROR', code: error.code, message: error.message };
            }

            console.error("Erreur inattendue :", error);
            return { status: 'ERROR', code: 'INTERNAL_ERROR', message: 'Une erreur interne est survenue.' };
        }
    }
}

export default Deposit;