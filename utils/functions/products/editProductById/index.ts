import { ProductType } from '@/utils/types';
import { API_URL } from "@/utils/constants";


export default async function editProductById(productId: number, productInfo: ProductType) {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productInfo),
        });

        if (!response.ok) {
            throw new Error(`Erro ao editar produto: ${response.statusText}`);
        }

        const updatedProduct = await response.json();

        return updatedProduct;

    } catch (error) {
        console.log("Erro ao editar produto:", error);
        throw new Error("Falha ao editar produto");
    }
}