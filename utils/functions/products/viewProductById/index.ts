import { API_URL } from "@/utils/constants";


export default async function viewProductById({ params }: { params: { id: string } }) {
    const { id } = params;
    try {
        if (!id) {
            throw new Error('ID do produto é obrigatório');
        }

        const response = await fetch(`${API_URL}/products/${id}`);

        if (!response.ok) {
            throw new Error(`Erro ao buscar produto: ${response.statusText}`);
        }

        const product = await response.json();

        if (!product) {
            throw new Error('Produto não encontrado');
        }

        return product;
    }
    catch (error) {
        console.error('Erro ao buscar produto:', error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(errorMessage);
    }

}