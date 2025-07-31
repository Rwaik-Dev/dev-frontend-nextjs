import { API_URL } from './../../../constants/index';
import { ProductType, ProductTypeResponse } from "@/utils/types";

export default async function createProduct(productInfo: ProductType): Promise<ProductTypeResponse> {

    const { title, price, description, category, image } = productInfo;

    try {

        const request = await fetch(`${API_URL}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                price,
                description,
                category,
                image
            }),
        });

        if (!request.ok) {
            throw new Error(`Erro ao criar produto: ${request.statusText}`);
        }

        const newProduct = await request.json();
        console.log("Produto criado com sucesso:", newProduct);

        return newProduct;

    } catch (error) {
        console.log("Erro ao criar produto:", error);
        throw new Error("Falha ao criar produto");
    }

}