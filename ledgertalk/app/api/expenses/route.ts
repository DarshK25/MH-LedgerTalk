import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        // TODO: Implement expenses endpoint
        return NextResponse.json({ expenses: [] });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        // TODO: Implement create expense endpoint
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
