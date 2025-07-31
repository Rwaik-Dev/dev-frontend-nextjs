import { NextResponse } from 'next/server';
import viewProductById from '@/utils/functions/products/viewProductById';

export async function GET(req:Request, {params}:{params:Promise<{ id: string }>}) {
    const { id } = await params;

    try {
        const product = await viewProductById({ params: { id } });
        return NextResponse.json(product);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        
        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

}