import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        // TODO: Implement orchestrator chat endpoint
        return NextResponse.json({ response: '' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
