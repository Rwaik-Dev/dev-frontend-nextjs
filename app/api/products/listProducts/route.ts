import { NextResponse } from 'next/server';
import { getProduts } from '@/utils/functions/products/getProducts';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string, 10) : 10;

    try {
        const products = await getProduts({ limit });
        return NextResponse.json(products);
    } catch (error) {
        console.log('Erro ao buscar produtos:', error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}