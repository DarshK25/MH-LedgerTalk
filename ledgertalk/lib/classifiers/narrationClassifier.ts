// Narration-based transaction classifier
export function classifyByNarration(narration: string): string {
    const keywords: Record<string, string[]> = {
        'Salary': ['salary', 'payroll'],
        'Rent': ['rent', 'lease'],
        'Utilities': ['electricity', 'water', 'internet'],
        'Travel': ['uber', 'ola', 'flight', 'hotel'],
    };

    const lowerNarration = narration.toLowerCase();

    for (const [category, words] of Object.entries(keywords)) {
        if (words.some(word => lowerNarration.includes(word))) {
            return category;
        }
    }

    return 'Uncategorized';
}
