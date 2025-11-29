// Agent information and metadata

export interface AgentInfo {
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const agentInfoMap: Record<string, AgentInfo> = {
  orchestrator: {
    name: 'Orchestrator',
    description: 'Main coordination agent',
    icon: '🎯',
    color: 'bg-purple-500',
  },
  sales: {
    name: 'Sales Agent',
    description: 'Sales and revenue insights',
    icon: '💼',
    color: 'bg-blue-500',
  },
  compliance: {
    name: 'Compliance Agent',
    description: 'GST and tax compliance',
    icon: '⚖️',
    color: 'bg-green-500',
  },
  finance: {
    name: 'Finance Agent',
    description: 'Financial analysis and reporting',
    icon: '💰',
    color: 'bg-yellow-500',
  },
  assistant: {
    name: 'AI Assistant',
    description: 'General purpose assistant',
    icon: '🤖',
    color: 'bg-indigo-500',
  },
};

export function getAgentInfo(agentName: string): AgentInfo {
  return agentInfoMap[agentName.toLowerCase()] || {
    name: agentName,
    description: 'Agent',
    icon: '🔧',
    color: 'bg-gray-500',
  };
}
