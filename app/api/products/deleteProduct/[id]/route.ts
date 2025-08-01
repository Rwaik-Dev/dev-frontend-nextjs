import { NextResponse } from "next/server";
import deleteProductById from "@/utils/functions/products/deleteProductById";
import {isValidId} from "@/utils/functions/validations";

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