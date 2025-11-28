'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import { OrchestratorChat } from '@/components/OrchestratorChat';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, AlertTriangle, Mail } from 'lucide-react';
import { getInit } from '@/lib/utils/initClient';
import { toast } from 'sonner';

export default function SalesAgentPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [businessId, setBusinessId] = useState<number | null>(null);

    useEffect(() => {
        async function init() {
            const data = await getInit();
            if (data?.business?.id) {
                setBusinessId(data.business.id);
            }
        }
        init();
    }, []);

    // Function to inject prompt into chat (we'll need to modify OrchestratorChat to accept initial prompt or expose a ref, 
    // but for now let's just show the chat and maybe the user can type. 
    // Ideally, we'd pass a prop or use a context, but let's keep it simple for this "feature addition" request).
    // Actually, I can't easily inject into OrchestratorChat without modifying it. 
    // I'll just render the chat.

    return (
        <div className="min-h-screen bg-background">
            <Header
                onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
                showMobileMenu={sidebarOpen}
            />

            <Sidebar
                isCollapsed={sidebarCollapsed}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
                } pt-16`}>
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">Sales & Customer Intelligence</h2>
                            <p className="text-muted-foreground">AI-powered revenue forecasting, churn prediction, and CRM automation.</p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="hover:bg-accent/50 cursor-pointer transition-colors" onClick={() => { navigator.clipboard.writeText("Forecast revenue for the next 3 months"); toast.success("Prompt copied!"); }}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Revenue Forecast</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground">Predict future sales trends</div>
                            </CardContent>
                        </Card>
                        <Card className="hover:bg-accent/50 cursor-pointer transition-colors" onClick={() => { navigator.clipboard.writeText("Identify customers at risk of churn"); toast.success("Prompt copied!"); }}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Churn Risk</CardTitle>
                                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground">Find at-risk clients</div>
                            </CardContent>
                        </Card>
                        <Card className="hover:bg-accent/50 cursor-pointer transition-colors" onClick={() => { navigator.clipboard.writeText("Who are my top customers?"); toast.success("Prompt copied!"); }}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Top Customers</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground">Analyze deal value</div>
                            </CardContent>
                        </Card>
                        <Card className="hover:bg-accent/50 cursor-pointer transition-colors" onClick={() => { navigator.clipboard.writeText("Draft a follow-up email for [Customer Name]"); toast.success("Prompt copied!"); }}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Email Draft</CardTitle>
                                <Mail className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground">Generate outreach emails</div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4">
                        <Card className="col-span-4 h-[600px]">
                            <CardHeader>
                                <CardTitle>Agent-D Workspace</CardTitle>
                                <CardDescription>
                                    Ask questions like "Forecast sales", "Show churn risk", or "Draft email to Client X".
                                    <br />
                                    <span className="text-xs text-muted-foreground">(Click the cards above to copy prompts)</span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0 h-full">
                                <OrchestratorChat businessId={businessId || 1} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
