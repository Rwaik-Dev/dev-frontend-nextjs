import { API_URL } from "@/utils/constants";
import { ProductTypeResponse } from "@/utils/types";


export default async function viewProductById(id:string):Promise<ProductTypeResponse | Error> {

    try {
        if (!id) {
            return new Error('ID do produto é obrigatório');
        }

        const response = await fetch(`${API_URL}/products/${id}`);

        if (!response.ok) {
            return new Error(`Erro ao buscar produto: ${response.statusText}`);
        }

        const product = await response.json();

        if (!product) {
            return new Error('Produto não encontrado');
        }

        return product;
    }
    catch (error) {
        console.error('Erro ao buscar produto:', error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return new Error(errorMessage);
    }

}