// Data layer for agents
export class DataLayer {
    async query(sql: string, params?: any[]) {
        // TODO: Implement database query
        return [];
    }

    async getInvoices(filters?: any) {
        // TODO: Implement get invoices
        return [];
    }

    async getTransactions(filters?: any) {
        // TODO: Implement get transactions
        return [];
    }

    async getClients(filters?: any) {
        // TODO: Implement get clients
        return [];
    }
}

export const dataLayer = new DataLayer();
