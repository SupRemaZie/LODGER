import {DepositService} from './services/depositService';
import {logementRequest} from "@/app/api/deposit/types/logementRequest";
import {successResponse} from "@/app/api/deposit/types/successResponse";
import {errorResponse} from "@/app/api/deposit/types/errorResponse";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    console.log("POST request received");
    try {
        const data : logementRequest = await request.json();
        const depositService = new DepositService();
        console.log("depositService created");
        console.log("calling saveData");
        const result = await depositService.saveData(data);
        console.log("saveData called");

        if (result.status === 'SUCCESS') {
            return new NextResponse(JSON.stringify(result), {
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new NextResponse(JSON.stringify(result), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorResult = new errorResponse('Une erreur est survenue lors du traitement', 500);
        return new NextResponse(JSON.stringify(errorResult), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });    }
}