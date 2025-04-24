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

            await prisma.logement.create({
                data: {
                    draft: data.draft,
                    accountId: account.id,
                }
            });

            return { status: 'SUCCESS', message: 'Inscription réussie' };
        } catch (error) {
            console.error("Erreur lors de la sauvegarde des données :", error);
            return { status: 'ERROR', message: 'Une erreur est survenue lors de la sauvegarde.' };
        }
    }
}

export default Deposit;
