import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        // TODO: Implement deadlines endpoint
        return NextResponse.json({ deadlines: [] });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
