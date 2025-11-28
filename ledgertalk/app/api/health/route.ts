import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
