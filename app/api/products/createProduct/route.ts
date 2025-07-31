import createProduct from "@/utils/functions/products/createProduct";
import { NextResponse } from "next/server";



export async function POST(request: Request) {
    try {
        const productInfo = await request.json();
        const newProduct = await createProduct(productInfo );
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar produto:", error);

        const erroMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: erroMessage }, { status: 500 });
    }
}