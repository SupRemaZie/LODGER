import { DepositController } from "@/app/api/deposit/controllers/depositController";
import { DepositService } from "@/app/api/deposit/services/depositService";
import { NextRequest } from "next/server";

// Mock de DepositService
jest.mock("../../../app/api/deposit/services/depositService");

describe('DepositController', () => {
    let controller: DepositController;
    let mockSaveData: jest.Mock;

    beforeEach(() => {
        // Reset des mocks
        jest.clearAllMocks();
        mockSaveData = jest.fn();
        (DepositService as jest.Mock).mockImplementation(() => ({
            saveData: mockSaveData
        }));
        controller = new DepositController();
    });

    const validRequestData = {
        email: "test@example.com",
        typeOfLogement: "Appartement",
        superficie: "50",
        city: "Paris",
        postalCode: "75001"
    };

    const createMockRequest = (data: any): NextRequest => {
        return {
            json: () => Promise.resolve(data),
            body: true
        } as unknown as NextRequest;
    };

    test('devrait traiter une requête valide avec succès', async () => {
        const mockRequest = createMockRequest(validRequestData);
        mockSaveData.mockResolvedValue({ status: 'SUCCESS' });

        const response = await controller.handleDeposit(mockRequest);
        const result = await response.json();

        expect(response.status).toBe(201);
        expect(result.status).toBe('SUCCESS');
        expect(mockSaveData).toHaveBeenCalledWith(validRequestData);
    });

    test('devrait rejeter une requête sans corps', async () => {
        const mockRequest = {
            body: null
        } as unknown as NextRequest;

        const response = await controller.handleDeposit(mockRequest);
        const result = await response.json();

        expect(response.status).toBe(400);
        expect(result.message).toBe('Corps de la requête manquant');
    });

    test('devrait rejeter des données invalides', async () => {
        const invalidData = { ...validRequestData, email: '' };
        const mockRequest = createMockRequest(invalidData);

        const response = await controller.handleDeposit(mockRequest);
        const result = await response.json();

        expect(response.status).toBe(400);
        expect(result.message).toBe('Données invalides');
    });

    test('devrait gérer les erreurs du service', async () => {
        const mockRequest = createMockRequest(validRequestData);
        mockSaveData.mockRejectedValue(new Error('Erreur service'));

        const response = await controller.handleDeposit(mockRequest);
        const result = await response.json();

        expect(response.status).toBe(500);
        expect(result.message).toBe('Une erreur est survenue lors du traitement');
    });

    test('devrait valider correctement les données requises', async () => {
        const testCases = [
            { ...validRequestData, email: '' },
            { ...validRequestData, typeOfLogement: '' },
            { ...validRequestData, superficie: '' }
        ];

        for (const testCase of testCases) {
            const mockRequest = createMockRequest(testCase);
            const response = await controller.handleDeposit(mockRequest);
            const result = await response.json();

            expect(response.status).toBe(400);
            expect(result.message).toBe('Données invalides');
        }
    });
});