import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        // TODO: Implement GST summary endpoint
        return NextResponse.json({ summary: {} });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
