import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        // TODO: Implement transaction classify endpoint
        return NextResponse.json({ classification: {} });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
