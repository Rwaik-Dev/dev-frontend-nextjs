
import { ProductTypeResponse } from '@/utils/types';
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation';


export default function SimilarProducts({ category }: { category: string }) {

    const [products, setProducts] = useState<ProductTypeResponse[]>([]);
    const [isError, setIsError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const products = await fetch('https://fakestoreapi.com/products').then(res => res.json());
                const filteredProducts: ProductTypeResponse[] = products.filter((product: ProductTypeResponse) => product.category === category && product.id !== Number(id));

                setProducts(filteredProducts);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
                setIsError(true);
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category]);

    return (
        <>
            {
                loading ? (
                    <div className='flex justify-center items-center h-full'>
                        <p>Carregando...</p>
                    </div>
                ) : isError ? (
                    <div className='flex justify-center items-center h-full'>
                        <p className='text-red-500 font-medium '>Erro ao carregar produtos</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
                        {products.slice(0, 3).map((product) => (
                            <div key={product.id} className="flex flex-col items-center justify-evenly p-4 border rounded-lg max-h-56 hover:scale-105 transition-all duration-300 " onClick={() => router.push(`/product/${product.id}`)}>
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    width={60}
                                    height={60}
                                    className="object-cover mb-2"
                                />
                                <h3 className="text-lg font-semibold line-clamp-1 ">{product.title}</h3>
                                <p className="text-gray-600">R${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                            </div>
                        ))}
                    </div>
                )}
        </>
    )
}
