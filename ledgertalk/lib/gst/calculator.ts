// GST calculation utilities
export interface GSTCalculation {
    cgst: number;
    sgst: number;
    igst: number;
    total: number;
}

export function calculateGST(amount: number, gstRate: number, isInterstate: boolean = false): GSTCalculation {
    const gstAmount = (amount * gstRate) / 100;

    if (isInterstate) {
        return {
            cgst: 0,
            sgst: 0,
            igst: gstAmount,
            total: amount + gstAmount,
        };
    }

    return {
        cgst: gstAmount / 2,
        sgst: gstAmount / 2,
        igst: 0,
        total: amount + gstAmount,
    };
}

export function getGSTRate(hsn: string): number {
    // TODO: Implement HSN-based GST rate lookup
    return 18; // Default rate
}
