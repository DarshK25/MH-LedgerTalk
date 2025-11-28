// E-invoice mock provider
export class MockEInvoiceProvider {
    async authenticate() {
        // TODO: Implement authentication
        return { token: 'mock-token' };
    }

    async generateIRN(invoiceData: any) {
        // TODO: Implement IRN generation
        return { irn: 'mock-irn', qrCode: 'mock-qr' };
    }
}

export const mockEInvoiceProvider = new MockEInvoiceProvider();
