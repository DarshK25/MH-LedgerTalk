import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        // TODO: Implement GST calculate endpoint
        return NextResponse.json({ calculation: {} });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
