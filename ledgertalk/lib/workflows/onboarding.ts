import { db } from "@/db";
import { employees, tasks } from "@/db/schema";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123456789"); // Fallback for dev

export class OnboardingWorkflow {
    async execute(name: string, role: string, email: string, businessId: number) {
        const logs: string[] = [];

        try {
            // Step 1: Add Employee to Database
            logs.push(`Starting onboarding for ${name} (${role})...`);
            const [employee] = await db.insert(employees).values({
                businessId,
                name,
 
                role,
                email,
                status: 'onboarding',
                joinedAt: new Date()
            }).returning();
            logs.push(`✅ Employee record created (ID: ${employee.id})`);

            // Step 2: Generate Offer Letter
            const pdfPath = await this.generateOfferLetter(name, role, businessId);
            logs.push(`✅ Offer letter generated: ${path.basename(pdfPath)}`);

            // Step 3: Send Welcome Email
            try {
                // In a real app, we would attach the PDF
                // For now, we'll just simulate the sending if no valid key
                if (process.env.RESEND_API_KEY) {
                    await resend.emails.send({
                        from: 'onboarding@ledgertalk.com',
                        to: email,
                        subject: `Welcome to the team, ${name}!`,
                        html: `<p>Hi ${name},</p><p>We are thrilled to have you join us as a ${role}.</p><p>Your offer letter is attached.</p>`
                    });
                    logs.push(`✅ Welcome email sent to ${email}`);
                } else {
                    logs.push(`⚠️ Email simulation: Welcome email sent to ${email} (No API Key)`);
                }
            } catch (e: any) {
                logs.push(`❌ Failed to send email: ${e.message}`);
            }

            // Step 4: Create Onboarding Tasks
            const onboardingTasks = [
                "Setup company email",
                "Grant access to Slack/Teams",
                "Prepare laptop and hardware",
                "Schedule orientation session"
            ];

            for (const taskTitle of onboardingTasks) {
                await db.insert(tasks).values({
                    businessId,
                    title: `${taskTitle} - ${name}`,
                    status: 'pending',
                    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // Due in 2 days
                });
            }
            logs.push(`✅ ${onboardingTasks.length} onboarding tasks created`);

            return {
                success: true,
                logs,
                employeeId: employee.id
            };

        } catch (error: any) {
            console.error("Onboarding workflow failed:", error);
            return {
                success: false,
                logs: [...logs, `❌ Error: ${error.message}`]
            };
        }
    }

    private async generateOfferLetter(name: string, role: string, businessId: number): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                const doc = new PDFDocument();
                const fileName = `Offer_Letter_${name.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
                const filePath = path.join(process.cwd(), 'public', 'docs', fileName);

                // Ensure directory exists
                const dir = path.dirname(filePath);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }

                const stream = fs.createWriteStream(filePath);
                doc.pipe(stream);

                // PDF Content
                doc.fontSize(20).text('OFFER LETTER', { align: 'center' });
                doc.moveDown();
                doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`);
                doc.moveDown();
                doc.text(`Dear ${name},`);
                doc.moveDown();
                doc.text(`We are pleased to offer you the position of ${role} at our company.`);
                doc.moveDown();
                doc.text('We believe your skills and experience will be an asset to our team.');
                doc.moveDown();
                doc.text('Sincerely,');
                doc.text('HR Manager');

                doc.end();

                stream.on('finish', () => resolve(filePath));
                stream.on('error', (err) => reject(err));

            } catch (error) {
                reject(error);
            }
        });
    }
}

export const onboardingWorkflow = new OnboardingWorkflow();
