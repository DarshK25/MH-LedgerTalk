// Expense service
export class ExpenseService {
    async createExpense(data: any) {
        // TODO: Implement expense creation
        throw new Error('Not implemented');
    }

    async getExpenses(filters?: any) {
        // TODO: Implement get expenses
        return [];
    }

    async processVoiceExpense(audioData: any) {
        // TODO: Implement voice expense processing
        throw new Error('Not implemented');
    }
}

export const expenseService = new ExpenseService();
