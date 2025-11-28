import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        // TODO: Implement dashboard overview endpoint
        return NextResponse.json({ data: {} });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
