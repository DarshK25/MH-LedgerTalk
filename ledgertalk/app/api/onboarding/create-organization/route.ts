import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { organizations, userOrganizations, userOnboarding } from '@/db/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { 
      name, 
      industry, 
      legalStructure, 
      businessStage, 
      description, 
      teamSize, 
      revenueRange, 
      departments,
      userId 
    } = data;

    if (!name || !userId) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Extract email domain from user (you may need to get this from Clerk)
    // For now, we'll leave it empty or extract from a passed email
    const emailDomain = ''; // TODO: Extract from user's email via Clerk API

    // Create organization with agent configuration
    const agentConfig = {
      industry,
      businessStage,
      departments,
      teamSize,
      revenueRange,
      // This config will be used to configure AI agents
      features: {
        gstCompliance: true,
        invoiceGeneration: true,
        financialAnalysis: true,
        aiAssistant: true,
      }
    };

    // Generate slug from name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const [organization] = await db.insert(organizations).values({
      name,
      slug,
      description,
      industry,
      legalStructure,
      businessStage,
      teamSize,
      revenueRange,
      agentConfig,
      departments,
    }).returning();

    // Add user as owner of the organization
    await db.insert(userOrganizations).values({
      userId,
      organizationId: organization.id,
      role: 'owner',
      joinedAt: new Date(),
    });

    // Mark onboarding step (not complete yet, will complete after team invite step)
    const existing = await db
      .select()
      .from(userOnboarding)
      .where(eq(userOnboarding.userId, userId))
      .limit(1);

    if (existing && existing.length > 0) {
      await db
        .update(userOnboarding)
        .set({
          isComplete: false,
          completedSteps: JSON.stringify(['org-created']),
          currentStep: 'team-invite',
        })
        .where(eq(userOnboarding.userId, userId));
    } else {
      await db.insert(userOnboarding).values({
        userId,
        isComplete: false,
        completedSteps: JSON.stringify(['org-created']),
        currentStep: 'team-invite',
      });
    }

    return NextResponse.json({ success: true, organization });
  } catch (error) {
    console.error('Error creating organization:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
