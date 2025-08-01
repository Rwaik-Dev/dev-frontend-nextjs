import editProductById from "@/utils/functions/products/editProductById";
import { isValidId } from "@/utils/functions/validations";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        if (!await isValidId(id)) {
            return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
        }
        const productInfo = await request.json();
        const updatedProduct = await editProductById(Number(id), productInfo);
        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        console.error("Erro ao editar produto:", error);

        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}