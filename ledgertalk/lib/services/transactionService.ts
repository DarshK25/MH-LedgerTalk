// Transaction service
export class TransactionService {
    async createTransaction(data: any) {
        // TODO: Implement transaction creation
        throw new Error('Not implemented');
    }

    async getTransactions(filters?: any) {
        // TODO: Implement get transactions
        return [];
    }

    async classifyTransaction(id: string, category: string) {
        // TODO: Implement transaction classification
        throw new Error('Not implemented');
    }
}

export const transactionService = new TransactionService();
