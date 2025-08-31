import {logementRequest} from "../types/logementRequest";
import {DepositService} from "../services/depositService";

export class DepositController {
    private depositService: DepositService;

    constructor() {
        this.depositService = new DepositService();
    }

    async handleDeposit(data: logementRequest) {
        try {
            // Validation des données
            this.validateDepositData(data);

            // Traitement via le service
            return await this.depositService.saveData(data);
        } catch (error: any) {
            return {
                status: 'ERROR',
                message: error.message || 'Une erreur est survenue lors du traitement',
                code: error.code || 'PROCESSING_ERROR'
            };
        }
    }

    private validateDepositData(data: logementRequest) {
        if (!data.email) {
            throw { code: 'VALIDATION_ERROR', message: 'Email requis' };
        }

        if (!data.city || !data.postalCode) {
            throw { code: 'VALIDATION_ERROR', message: 'Adresse incomplète' };
        }

        if (!data.typeOfLogement) {
            throw { code: 'VALIDATION_ERROR', message: 'Type de logement requis' };
        }

        if (Number(data.superficie) <= 0) {
            throw { code: 'VALIDATION_ERROR', message: 'Superficie invalide' };
        }
    }
}