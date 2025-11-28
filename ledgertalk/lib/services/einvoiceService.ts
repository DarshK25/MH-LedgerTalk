// E-invoice service
export class EInvoiceService {
    async generateEInvoice(invoiceData: any) {
        // TODO: Implement e-invoice generation
        throw new Error('Not implemented');
    }

    async cancelEInvoice(irn: string) {
        // TODO: Implement e-invoice cancellation
        throw new Error('Not implemented');
    }
}

export const eInvoiceService = new EInvoiceService();
