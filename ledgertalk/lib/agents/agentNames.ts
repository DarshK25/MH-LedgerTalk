// Agent names registry
export const AGENT_NAMES = {
    FINANCE: 'finance-agent',
    SALES: 'sales-agent',
    MARKET: 'market-agent',
    COMPLIANCE: 'compliance-agent',
    ORCHESTRATOR: 'orchestrator-agent',
    INVOICE: 'invoice-agent',
} as const;

export type AgentName = typeof AGENT_NAMES[keyof typeof AGENT_NAMES];
