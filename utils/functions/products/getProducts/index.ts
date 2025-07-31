import { API_URL } from "@/utils/constants";

/**
 * Fetches a list of products from the API with a specified limit on the number of products returned.
 * 
 * @param {Object} params - The parameters for fetching products.
 * @param {number} params.limit - The maximum number of products to fetch.
 * 
 * @returns {Promise<any>} A promise that resolves to the list of products.
 * 
 * @throws Will throw an error if the fetch operation fails.
 */

export async function getProduts({ limit }: { limit: number }) {
    if (typeof limit !== 'number' || limit <= 0) {
        throw new Error('Limite deve ser positivo e maior que zero');
    }

    try {
        const response = await fetch(`${API_URL}/products?limit=${limit}`, {
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!data || !Array.isArray(data)) {
            throw new Error('Formato de dados inválido');
        }

        return data;

    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        throw new Error('Falha ao buscar produtos');
    }
}
