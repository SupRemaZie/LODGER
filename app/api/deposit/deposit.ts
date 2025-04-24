import { PrismaClient } from "@prisma/client";
import { LogementData } from "@/app/api/interface";

const prisma = new PrismaClient();

class Deposit {
    constructor() {}

    async saveData(data: LogementData) {
        try {
            if (!data.email) {
                return { status: 'ERROR', message: 'Email requis.' };
            }

            const account = await prisma.account.findUnique({
                where: { email: data.email },
            });

            if (!account) {
                return { status: 'ERROR', message: "Aucun compte trouvé avec cet email." };
            }

            let logement = await prisma.logementType.findUnique({
                where: {type: data.typeOfLogement},
            });

            let property = await prisma.propertyType.findUnique({
                where: {type: data.typeOfProperty},
            });


            await prisma.logement.create({
                data: {
                    draft: data.draft,
                    displayPreciseAddress: data.displayPreciseAddress,
                    postalCode: data.postalCode,
                    city: data.city,
                    street: data.street,
                    numero: data.numero,
                    addressComplement: data.addressComplement,
                    stopProcess: data.stopProcess,
                    superficie: data.superficie,
                    roomNumber: data.roomNumber,
                    bedroomNumber: data.bedroomNumber,
                    furnished: data.furnished,
                    bathRoomSpace: data.bathRoomSpace,
                    powderRoomSpace: data.powderRoomSpace,
                    appartmentFloor: data.appartmentFloor,
                    kWhEP: data.kWhEP,
                    kgCO2: data.kgCO2,
                    accountId: account.id,
                    logementTypeId: logement.id,
                    propertyTypeId: property.id
                }
            });

            return { status: 'SUCCESS', message: 'Save Informations' };
        } catch (error) {
            console.error("Erreur lors de la sauvegarde des données :", error);
            return { status: 'ERROR', message: 'Une erreur est survenue lors de la sauvegarde.' };
        }
    }
}

export default Deposit;
