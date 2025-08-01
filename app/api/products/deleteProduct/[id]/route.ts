import { NextResponse } from "next/server";
import deleteProductById from "@/utils/functions/products/deleteProductById";
import { ProductTypeResponse } from "@/utils/types";
async function isValidId(id: string) {
    const parsedId = Number(id);

    const request = await fetch("http://localhost:3000/api/products/listProducts?limit=1000")

    if (!request.ok) {
        throw new Error("Erro ao buscar produtos");
    }
    const products: ProductTypeResponse[] = await request.json();

    return products.some(product => product.id === parsedId);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {

        if (!await isValidId(id)) {
            return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
        }

        await deleteProductById(Number(id));
        return NextResponse.json({ message: "Produto deletado com sucesso" }, { status: 200 });
    } catch (error) {
        console.error("Erro ao deletar produto:", error);

        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}