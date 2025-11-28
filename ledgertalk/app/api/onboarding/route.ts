import { NextRequest, NextResponse } from 'next/server';
import { onboardingWorkflow } from '@/lib/workflows/onboarding';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, role, email, businessId } = body;

        // Validate required fields
        if (!name || !role || !email || !businessId) {
            return NextResponse.json(
                { error: 'Missing required fields: name, role, email, businessId' },
                { status: 400 }
            );
        }

        // Execute the onboarding workflow
        const result = await onboardingWorkflow.execute(name, role, email, businessId);

        if (result.success) {
            return NextResponse.json({
                message: 'Onboarding completed successfully',
                employeeId: result.employeeId,
                logs: result.logs
            });
        } else {
            return NextResponse.json(
                { error: 'Onboarding failed', logs: result.logs },
                { status: 500 }
            );
        }
    } catch (error: any) {
        console.error('Onboarding API error:', error);
        return NextResponse.json(
            { error: 'Internal server error', message: error.message },
            { status: 500 }
        );
    }
}
