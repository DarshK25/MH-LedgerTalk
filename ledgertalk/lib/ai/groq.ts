// Groq AI client configuration
import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function generateGroqCompletion(prompt: string, model = 'mixtral-8x7b-32768') {
    try {
        const completion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model,
        });
        return completion.choices[0]?.message?.content || '';
    } catch (error) {
        console.error('Groq API error:', error);
        throw error;
    }
}

export { groq };
