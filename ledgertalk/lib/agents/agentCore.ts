// Agent core functionality
export interface AgentConfig {
    name: string;
    description: string;
    capabilities: string[];
}

export class BaseAgent {
    constructor(public config: AgentConfig) { }

    async execute(input: any): Promise<any> {
        throw new Error('Execute method must be implemented by subclass');
    }
}
