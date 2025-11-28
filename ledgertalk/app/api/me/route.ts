import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        // TODO: Implement me endpoint
        return NextResponse.json({ user: {} });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
