import { NextResponse } from "next/server"
import Deposit from "./deposit"

export async function POST(request: Request) {
    const data = await request.json();
    console.log('data', data)
    const deposit = new Deposit();
    return NextResponse.json(await deposit.saveData(data));
}