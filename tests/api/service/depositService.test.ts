import { DepositService } from "@/app/api/deposit/services/depositService";
import { prisma } from "@/prisma/Prisma";
import { errorResponse } from "@/app/api/deposit/types/errorResponse";
import { depositResponse } from "@/app/api/deposit/types/depositResponse";
import {LogementRequest} from "@/app/api/deposit/types/logementRequest";

jest.mock("@/prisma/Prisma", () => ({
    prisma: {
        account: {
            findUnique: jest.fn(),
        },
        logementType: {
            findUnique: jest.fn(),
        },
        propertyType: {
            findUnique: jest.fn(),
        },
        logement: {
            create: jest.fn(),
        },
    },
}));

describe('DepositService', () => {
    let service: DepositService;

    beforeEach(() => {
        jest.clearAllMocks();
        service = new DepositService();
    });

    const mockValidData : LogementRequest = {
        email: "test@example.com",
        typeOfLogement: "Appartement",
        typeOfProperty: "T2",
        draft: false,
        showAddress: true,
        postalCode: "75001",
        city: "Paris",
        streetNumber: "1",
        streetName: "Rue de Test",
        addressComplement: "Étage 2",
        stopProcess: "",
        superficie: "50",
        roomNumber: "3",
        bedroomNumber: "2",
        furnished: true,
        bathRoomSpace: "10",
        powderRoomSpace: "5",
        floorNumber: "2",
        kWhEP: "100",
        kgCO2: "50",
        roomAreas: [20, 15, 15],
        spaceShare: ["Cuisine", "Salon"]
    };

    test('devrait sauvegarder les données avec succès', async () => {
        const mockAccount = { id: 1, email: "test@example.com" };
        const mockLogementType = { id: 1, type: "Appartement" };
        const mockPropertyType = { id: 1, type: "T2" };

        (prisma.account.findUnique as jest.Mock).mockResolvedValue(mockAccount);
        (prisma.logementType.findUnique as jest.Mock).mockResolvedValue(mockLogementType);
        (prisma.propertyType.findUnique as jest.Mock).mockResolvedValue(mockPropertyType);
        (prisma.logement.create as jest.Mock).mockResolvedValue({});

        const result = await service.saveData(mockValidData);
        expect(result).toBeInstanceOf(depositResponse);
        expect(result).toEqual(expect.objectContaining({
            message: "Demande de logement enregistrée avec succès.",
            code: 201
        }));
    });

    test('devrait retourner une erreur si email est manquant', async () => {
        const invalidData = { ...mockValidData, email: "" };
        const result = await service.saveData(invalidData);

        expect(result).toBeInstanceOf(errorResponse);
        expect(result).toEqual(expect.objectContaining({
            message: "Email requis",
            code: 400,
            status : 'ERROR'
        }));
    });

    test('devrait retourner une erreur si compte non trouvé', async () => {
        (prisma.account.findUnique as jest.Mock).mockResolvedValue(null);

        const result = await service.saveData(mockValidData);
        expect(result).toBeInstanceOf(errorResponse);
        expect(result).toEqual(expect.objectContaining({
            message: "Compte utilisateur non trouvé.",
            code: 404,
            status : 'ERROR'
        }));
    });

    test('devrait retourner une erreur si type de logement invalide', async () => {
        (prisma.account.findUnique as jest.Mock).mockResolvedValue({ id: 1 });
        (prisma.logementType.findUnique as jest.Mock).mockResolvedValue(null);

        const result = await service.saveData(mockValidData);
        expect(result).toBeInstanceOf(errorResponse);
        expect(result).toEqual(expect.objectContaining({
            message: "Type de logement invalide.",
            code: 404,
            status : 'ERROR'
        }));
    });

    test('ne devrait pas vérifier le type de propriété pour une maison', async () => {
        const maisonData = { ...mockValidData, typeOfLogement: "Maison" };
        const mockAccount = { id: 1 };
        const mockLogementType = { id: 1 };

        (prisma.account.findUnique as jest.Mock).mockResolvedValue(mockAccount);
        (prisma.logementType.findUnique as jest.Mock).mockResolvedValue(mockLogementType);
        (prisma.logement.create as jest.Mock).mockResolvedValue({});

        const result = await service.saveData(maisonData);
        expect(result).toBeInstanceOf(depositResponse);
        expect(prisma.propertyType.findUnique).not.toHaveBeenCalled();
    });

    test('devrait gérer les erreurs de base de données', async () => {
        (prisma.account.findUnique as jest.Mock).mockRejectedValue(new Error("Erreur DB"));

        const result = await service.saveData(mockValidData);
        expect(result).toBeInstanceOf(errorResponse);
        expect(result).toEqual(expect.objectContaining({
            code: 500,
            message: "Erreur DB",
            status : 'ERROR'
        }));
    });
});