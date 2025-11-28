import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        // TODO: Implement GST ITC endpoint
        return NextResponse.json({ itc: {} });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
