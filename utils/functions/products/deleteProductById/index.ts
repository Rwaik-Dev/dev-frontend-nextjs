import { API_URL } from "@/utils/constants";

export default async function deleteProductById(productId: number) {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Erro ao deletar produto: ${response.statusText}`);
        }

        return { message: "Produto deletado com sucesso" };
    } catch (error) {
        console.log("Erro ao deletar produto:", error);
        throw new Error("Falha ao deletar produto");
    }
}
