import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        // TODO: Implement upload endpoint
        return NextResponse.json({ success: true, url: '' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
