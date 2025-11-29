import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { inviteCodes, organizations } from '@/db/schema';
import { eq, and, gt } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ valid: false, error: 'Invite code is required' }, { status: 400 });
    }

    // Find the invite code
    const inviteCode = await db
      .select({
        id: inviteCodes.id,
        organizationId: inviteCodes.organizationId,
        role: inviteCodes.role,
        expiresAt: inviteCodes.expiresAt,
        isActive: inviteCodes.isActive,
      })
      .from(inviteCodes)
      .where(
        and(
          eq(inviteCodes.code, code.toUpperCase()),
          eq(inviteCodes.isActive, true),
          gt(inviteCodes.expiresAt, new Date())
        )
      )
      .limit(1);

    if (!inviteCode || inviteCode.length === 0) {
      return NextResponse.json({ valid: false, error: 'Invalid or expired invite code' }, { status: 404 });
    }

    // Get organization details
    const organization = await db
      .select()
      .from(organizations)
      .where(eq(organizations.id, inviteCode[0].organizationId))
      .limit(1);

    if (!organization || organization.length === 0) {
      return NextResponse.json({ valid: false, error: 'Organization not found' }, { status: 404 });
    }

    return NextResponse.json({
      valid: true,
      organization: organization[0],
      role: inviteCode[0].role,
      inviteCodeId: inviteCode[0].id,
    });
  } catch (error) {
    console.error('Error validating invite code:', error);
    return NextResponse.json({ valid: false, error: 'Internal server error' }, { status: 500 });
  }
}
