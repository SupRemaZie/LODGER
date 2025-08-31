import { DepositService } from "../../../app/api/deposit/services";

// Mock du DepositService
jest.mock("../../../../app/api/deposit/services/depositService");

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

    const validData = {
        email: "test@example.com",
        draft: true,
        displayPreciseAddress: true,
        postalCode: "75001",
        city: "Paris",
        streetNumber: "1",
        streetName: "Rue Test",
        numero: "1",
        superficie: "50",
        roomNumber: "3",
        bedroomNumber: "2",
        furnished: true,
        bathRoomSpace: "1",
        powderRoomSpace: "1",
        appartmentFloor: "2",
        kWhEP: "200",
        kgCO2: "10",
        typeOfLogement: "Appartement"
    };

    test('devrait valider et sauvegarder des données valides', async () => {
        mockSaveData.mockResolvedValue({ status: 'SUCCESS' });
        const result = await controller.handleDeposit(validData);
        expect(result.status).toBe('SUCCESS');
        expect(mockSaveData).toHaveBeenCalledWith(validData);
    });

    test('devrait rejeter des données sans email', async () => {
        const invalidData = { ...validData, email: '' };
        const result = await controller.handleDeposit(invalidData);
        expect(result.status).toBe('ERROR');
        expect(result.code).toBe('VALIDATION_ERROR');
    });

    test('devrait rejeter des données sans ville', async () => {
        const invalidData = { ...validData, city: '' };
        const result = await controller.handleDeposit(invalidData);
        expect(result.status).toBe('ERROR');
        expect(result.code).toBe('VALIDATION_ERROR');
    });

    test('devrait rejeter une superficie invalide', async () => {
        const invalidData = { ...validData, superficie: "0" };
        const result = await controller.handleDeposit(invalidData);
        expect(result.status).toBe('ERROR');
        expect(result.code).toBe('VALIDATION_ERROR');
    });

    test('devrait gérer les erreurs du service', async () => {
        mockSaveData.mockRejectedValue(new Error('Erreur service'));
        const result = await controller.handleDeposit(validData);
        expect(result.status).toBe('ERROR');
        expect(result.code).toBe('PROCESSING_ERROR');
    });
});