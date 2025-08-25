// deposit.test.ts
import Deposit from '@/app/api/deposit/deposit';
import { LogementData } from '@/app/api/interface';
import {describe, expect, jest} from '@jest/globals';
import { prisma } from '@/prisma/Prisma';

jest.mock('@/prisma/Prisma', () => ({
    prisma: {
        account: {findUnique: jest.fn()},
        logementType: {findUnique: jest.fn()},
        propertyType: {findUnique: jest.fn()},
        logement: {create: jest.fn()},
    },
}));

describe('Deposit.saveData', () => {
    let deposit: Deposit;

    beforeEach(() => {
        deposit = new Deposit();
        jest.clearAllMocks();
    });

    it('échoue si aucun compte trouvé', async () => {
        // @ts-ignore
        const result = await deposit.saveData({email: "jean.dupont@mail.com"});

        expect(result).toEqual({
            status: 'ERROR',
            code: 'ACCOUNT_NOT_FOUND',
            message: 'Aucun compte trouvé avec cet email.',
        });
    });

    it('échoue si email est manquant', async () => {
        // @ts-ignore
        prisma.account.findUnique.mockResolvedValue({id: 1});

        const result = await deposit.saveData({typeOfLogement: 'Appartement'} as LogementData);

        expect(result).toEqual({
            status: 'ERROR',
            code: 'EMAIL_REQUIRED',
            message: 'Email requis.',
        });
    });

    it('échoue si type de logement invalide', async () => {
        // @ts-ignore
        prisma.account.findUnique.mockResolvedValue({ id: 1 });
        // @ts-ignore
        prisma.logementType.findUnique.mockResolvedValue(null);

        const result = await deposit.saveData({ email: 'test@mail.com', typeOfLogement: 'Inconnu' } as LogementData);

        expect(result).toEqual({
            status: 'ERROR',
            code: 'INVALID_LOGEMENT_TYPE',
            message: 'Type de logement invalide.',
        });
    });

    it('échoue si type de propriété invalide (si pas maison)', async () => {
        // @ts-ignore
        prisma.account.findUnique.mockResolvedValue({ id: 1 });
        // @ts-ignore
        prisma.logementType.findUnique.mockResolvedValue({ id: 10 });
        // @ts-ignore
        prisma.propertyType.findUnique.mockResolvedValue(null);

        const result = await deposit.saveData({
            email: 'test@mail.com',
            typeOfLogement: 'Appartement',
            typeOfProperty: 'Villa',
        } as LogementData);

        expect(result).toEqual({
            status: 'ERROR',
            code: 'INVALID_PROPERTY_TYPE',
            message: 'Type de propriété invalide.',
        });
    });

    it('sauvegarde avec succès (cas valide)', async () => {
        // @ts-ignore
        prisma.account.findUnique.mockResolvedValue({ id: 1 });
        // @ts-ignore
        prisma.logementType.findUnique.mockResolvedValue({ id: 10 });
        // @ts-ignore
        prisma.propertyType.findUnique.mockResolvedValue({ id: 20 });
        // @ts-ignore
        prisma.logement.create.mockResolvedValue({ id: 99 });

        const data: LogementData = {
            email: 'test@mail.com',
            typeOfLogement: 'Appartement',
            typeOfProperty: 'Villa',
            draft: true,
            displayPreciseAddress: false,
            postalCode: '75000',
            city: 'Paris',
            streetNumber: '10',
            streetName: 'Rue Exemple',
            numero: '5',
            addressComplement: '',
            stopProcess: '',
            superficie: '100',
            roomNumber: '4',
            bedroomNumber: '2',
            furnished: true,
            bathRoomSpace: '1',
            powderRoomSpace: '1',
            appartmentFloor: '2',
            kWhEP: '50',
            kgCO2: '10',
            roomAreas: [{area: ''}, {area: ''}],
            spaceShare: [{type: ''}, {type: ''}],
            logementType: '',
            propertyType: '',
            showAddress: false
        };

        const result = await deposit.saveData(data);

        expect(prisma.logement.create).toHaveBeenCalledWith(
            expect.objectContaining({
                data: expect.objectContaining({
                    "accountId": 1,
                    "addressComplement": "",
                    "appartmentFloor": 2,
                    "bathRoomSpace": 1,
                    "bedroomNumber": 2,
                    "city": "Paris",
                    "displayPreciseAddress": false,
                    "draft": true,
                    "furnished": true,
                    "kWhEP": 50,
                    "kgCO2": 10,
                    "logementTypeId": 10,
                    "numero": 5,
                    "postalCode": 75000,
                    "powderRoomSpace": 1,
                    "propertyTypeId": 20,
                    "roomAreas": {"create": [{"area": {"area": ""}}, {"area": {"area": ""}}]},
                    "roomNumber": 4,
                    "spaceShares": {"create": [{"type": {"type": ""}}, {"type": {"type": ""}}]},
                    "stopProcess": "",
                    "streetName": "Rue Exemple",
                    "streetNumber": "10",
                    "superficie": 100
                }),
            })
        );

        expect(result).toEqual({
            status: 'SUCCESS',
            message: 'Informations sauvegardées avec succès.',
        });
    });

    it('gère une erreur inattendue', async () => {
        // @ts-ignore
        prisma.account.findUnique.mockRejectedValue(new Error('DB crashed'));

        const result = await deposit.saveData({ email: 'test@mail.com', typeOfLogement: 'Appartement' } as LogementData);

        expect(result).toEqual({
            status: 'ERROR',
            code: 'INTERNAL_ERROR',
            message: 'Une erreur interne est survenue.',
        });
    });
});
