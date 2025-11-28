// Payment handler
export class PaymentHandler {
    async processPayment(invoiceId: string, amount: number) {
        // TODO: Implement payment processing
        throw new Error('Not implemented');
    }

    async recordPayment(data: any) {
        // TODO: Implement payment recording
        throw new Error('Not implemented');
    }
}

export const paymentHandler = new PaymentHandler();
