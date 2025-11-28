// TDS calculation utilities
export interface TDSCalculation {
    tdsAmount: number;
    netAmount: number;
    tdsRate: number;
}

export function calculateTDS(amount: number, section: string): TDSCalculation {
    const tdsRate = getTDSRate(section);
    const tdsAmount = (amount * tdsRate) / 100;

    return {
        tdsAmount,
        netAmount: amount - tdsAmount,
        tdsRate,
    };
}

export function getTDSRate(section: string): number {
    const rates: Record<string, number> = {
        '194C': 1,
        '194J': 10,
        '194H': 5,
        '194I': 10,
    };

    return rates[section] || 0;
}
