import {DepositService} from '../services/depositService';
import {LogementRequest} from "@/app/api/deposit/types/logementRequest";
import {errorResponse} from "@/app/api/deposit/types/errorResponse";
import {NextRequest, NextResponse} from "next/server";

export class DepositController {
    private depositService: DepositService;

    constructor() {
        this.depositService = new DepositService();
    }

    private createResponse(data: any, status: number): NextResponse {
        return new NextResponse(JSON.stringify(data), {
            status,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            }
        });
    }

    private validateRequest(data: LogementRequest): boolean {
        return !!(data.email && data.typeOfLogement && data.superficie);
    }

    async handleDeposit(request: NextRequest): Promise<NextResponse> {
        try {
            // Validation de la requête
            if (!request.body) {
                return this.createResponse(
                    new errorResponse('Corps de la requête manquant', 400),
                    400
                );
            }

            // Parsing des données
            const data: LogementRequest = await request.json();

            // Validation des données
            if (!this.validateRequest(data)) {
                return this.createResponse(
                    new errorResponse('Données invalides', 400),
                    400
                );
            }

            // Traitement
            const result = await this.depositService.saveData(data);

            // Réponse
            return this.createResponse(
                result,
                result.status === 'SUCCESS' ? 201 : 400
            );

        } catch (error) {
            console.error('Erreur dans DepositController:', error);
            return this.createResponse(
                new errorResponse('Une erreur est survenue lors du traitement', 500),
                500
            );
        }
    }
}

// Point d'entrée de l'API
const depositController = new DepositController();

export async function POST(request: NextRequest): Promise<NextResponse> {
    return depositController.handleDeposit(request);
}