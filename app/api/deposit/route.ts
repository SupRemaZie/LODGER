import { NextRequest, NextResponse } from "next/server";
import { DepositController } from "./controllers/depositController";

const depositController = new DepositController();

export async function POST(request: NextRequest): Promise<NextResponse> {
    return depositController.handleDeposit(request);
}