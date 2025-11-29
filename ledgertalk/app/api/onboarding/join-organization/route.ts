import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { userOrganizations, userOnboarding } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { organizationId, userId } = await request.json();

    if (!organizationId || !userId) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Create user-organization relationship with default role
    await db.insert(userOrganizations).values({
      userId,
      organizationId,
      role: 'member', // Default role when joining without invite
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
          completedSteps: JSON.stringify(['org-join']),
          currentStep: 'complete',
        })
        .where(eq(userOnboarding.userId, userId));
    } else {
      await db.insert(userOnboarding).values({
        userId,
        isComplete: true,
        completedSteps: JSON.stringify(['org-join']),
        currentStep: 'complete',
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error joining organization:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
