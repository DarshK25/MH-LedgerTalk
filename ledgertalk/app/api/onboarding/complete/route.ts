import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { userOnboarding } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    // Update or insert onboarding completion
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
          currentStep: 'complete',
          hasSeenTour: true,
        })
        .where(eq(userOnboarding.userId, userId));
    } else {
      await db.insert(userOnboarding).values({
        userId,
        isComplete: true,
        currentStep: 'complete',
        hasSeenTour: true,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error completing onboarding:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
