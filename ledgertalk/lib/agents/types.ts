// Agent type definitions
export interface AgentMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface AgentResponse {
    success: boolean;
    data?: any;
    error?: string;
}

export interface AgentContext {
    userId: string;
    orgId: string;
    sessionId?: string;
}
