import { ProductTypeResponse } from "@/utils/types";

export async function isValidId(id: string) {
    const parsedId = Number(id);

    const request = await fetch("http://localhost:3000/api/products/listProducts?limit=1000")

    if (!request.ok) {
        throw new Error("Erro ao buscar produtos");
    }
    const products: ProductTypeResponse[] = await request.json();

    return products.some(product => product.id === parsedId);
}