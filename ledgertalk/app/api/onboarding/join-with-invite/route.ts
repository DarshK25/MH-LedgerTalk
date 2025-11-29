import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { inviteCodes, userOrganizations, userOnboarding } from '@/db/schema';
import { eq, and, gt } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { code, userId } = await request.json();

    if (!code || !userId) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Validate invite code again
    const inviteCode = await db
      .select()
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
      return NextResponse.json({ success: false, error: 'Invalid invite code' }, { status: 404 });
    }

    const invite = inviteCode[0];

    // Create user-organization relationship
    await db.insert(userOrganizations).values({
      userId,
      organizationId: invite.organizationId,
      role: invite.role,
      joinedAt: new Date(),
    });

    // Mark onboarding as complete (upsert)
    const existing = await db
      .select()
      .from(userOnboarding)
      .where(eq(userOnboarding.userId, userId))
      .limit(1);

    if (existing && existing.length > 0) {
      await db
        .update(userOnboarding)
        .set({
          isComplete: true,
          completedSteps: JSON.stringify(['invite-join']),
          currentStep: 'complete',
        })
        .where(eq(userOnboarding.userId, userId));
    } else {
      await db.insert(userOnboarding).values({
        userId,
        isComplete: true,
        completedSteps: JSON.stringify(['invite-join']),
        currentStep: 'complete',
      });
    }

    // Optionally deactivate the invite code if it's single-use
    // await db.update(inviteCodes).set({ isActive: false }).where(eq(inviteCodes.id, invite.id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error joining with invite:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
