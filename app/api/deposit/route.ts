import { NextResponse } from "next/server"
import Deposit from "./deposit"

export async function POST(request: Request) {
    const data = await request.json();
    console.log('data', data)
    const deposit = new Deposit();
    const result = await deposit.saveData(data);

    if (result.status === 'ERROR') {
        return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
}