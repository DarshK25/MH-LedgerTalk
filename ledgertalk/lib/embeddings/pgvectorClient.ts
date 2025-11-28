// pgvector client for embeddings
export class PgVectorClient {
    async storeEmbedding(text: string, embedding: number[]) {
        // TODO: Implement embedding storage
        throw new Error('Not implemented');
    }

    async searchSimilar(embedding: number[], limit: number = 10) {
        // TODO: Implement similarity search
        return [];
    }
}

export const pgVectorClient = new PgVectorClient();
