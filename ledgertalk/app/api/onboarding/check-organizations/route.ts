import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { organizations } from '@/db/schema';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ organizations: [] }, { status: 400 });
    }

    // For now, return empty array since we don't have emailDomain field
    // In production, you could implement domain matching or other logic
    const matchingOrgs = await db
      .select()
      .from(organizations)
      .limit(10); // Return some organizations for selection

    return NextResponse.json({ organizations: matchingOrgs });
  } catch (error) {
    console.error('Error checking organizations:', error);
    return NextResponse.json({ organizations: [] }, { status: 500 });
  }
}
