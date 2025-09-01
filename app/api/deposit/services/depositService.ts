import {prisma} from "@/prisma/Prisma";
import {LogementRequest} from "../types/logementRequest";
import {depositResponse} from "../types/depositResponse";
import {errorResponse} from "@/app/api/deposit/types/errorResponse";

export class DepositService {
    async saveData(data: LogementRequest): Promise<depositResponse | errorResponse> {
        try {
            let property = null;

            if (!data.email) {
                return new errorResponse('Email requis', 400);
            }

            const account = await this.findAccount(data.email);
            if (account instanceof errorResponse) return account;
            const logement = await this.findLogementType(data.typeOfLogement);
            if (logement instanceof errorResponse) return logement;

            if (!data.typeOfLogement.toLowerCase().includes('maison')) {
                const propertyResult = await this.findPropertyType(data.typeOfProperty);
                if (propertyResult instanceof errorResponse) return propertyResult;
                property = propertyResult;
            }


            return await this.createLogement(data, account.id, logement.id, property?.id);
        } catch (error: any) {
            return new errorResponse(error.message, 500);
        }
    }

    private async findAccount(email: string) {
        const account = await prisma.account.findUnique({where: {email}});
        if (!account) return new errorResponse("Compte utilisateur non trouvé.", 404);
        return account;
    }

    private async findLogementType(type: string) {
        const logement = await prisma.logementType.findUnique({where: {type}});
        if (!logement) return new errorResponse("Type de logement invalide.", 404);
        return logement;
    }

    private async findPropertyType(type: string | undefined) {
        if (!type) return null;
        const property = await prisma.propertyType.findUnique({where: {type}});
        if (!property) return new errorResponse("Type de bien invalide.", 404);
        return property;
    }

    private async createLogement(data: LogementRequest, accountId: number, logementTypeId: number, propertyTypeId: number | undefined) : Promise<depositResponse | errorResponse> {
        try {
            await prisma.logement.create({
                data: {
                    draft: data.draft,
                    showAddress: data.showAddress,
                    postalCode: Number(data.postalCode),
                    city: data.city,
                    streetNumber: data.streetNumber,
                    streetName: data.streetName,
                    addressComplement: data.addressComplement,
                    stopProcess: data.stopProcess,
                    superficie: Number(data.superficie),
                    roomNumber: Number(data.roomNumber),
                    bedroomNumber: Number(data.bedroomNumber),
                    furnished: data.furnished,
                    bathRoomSpace: Number(data.bathRoomSpace),
                    powderRoomSpace: Number(data.powderRoomSpace),
                    floorNumber: Number(data.floorNumber),
                    kWhEP: Number(data.kWhEP),
                    kgCO2: Number(data.kgCO2),
                    accountId,
                    logementTypeId,
                    propertyTypeId,
                    roomAreas: data.roomAreas && data.roomAreas.length > 0 ? {
                        create: data.roomAreas.map((area) => ({area}))
                    } : undefined,
                    spaceShares: data.spaceShare && data.spaceShare.length > 0 ? {
                        create: data.spaceShare.map((type) => ({type}))
                    } : undefined,
                },
            });

            return new depositResponse("SUCCESS", "Demande de logement enregistrée avec succès.", 201);
        } catch (error: any) {
            console.log("error", error);
            return new errorResponse(error.message, 500);
        }
    }
}