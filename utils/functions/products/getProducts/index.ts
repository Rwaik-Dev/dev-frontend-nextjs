import { API_URL } from "@/utils/constants";
import { ProductTypeResponse } from "@/utils/types";


/**
 * Busca uma lista de produtos na API com um limite específico no número de produtos retornados.
 *
 * @param {{ limit: number }} params - Os parâmetros para buscar produtos.
 * @param {number} params.limit - O número máximo de produtos a serem buscados.
 *
 * @returns {Promise<ProductTypeResponse[] | Error>} Uma Promisse que resolve com a lista de produtos.
 *
 * @throws Lança um erro se a operação de busca falhar ou os dados de resposta forem inválidos.
 */
export async function getProduts({ limit }: { limit: number }):Promise<ProductTypeResponse[] | Error> {
    if (typeof limit !== 'number' || limit <= 0) {
        return new Error('Limite deve ser positivo e maior que zero');
    }

    try {
        const response = await fetch(`${API_URL}/products?limit=${limit}`, {
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            return new Error(`Erro ao buscar produtos: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!data || !Array.isArray(data)) {
            return new Error('Formato de dados inválido');
        }

        return data;

    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return new Error('Falha ao buscar produtos');
    }
}
