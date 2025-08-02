"use client";
import viewProductById from '@/utils/functions/products/viewProductById';
import { ProductTypeResponse } from '@/utils/types';
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Minus, Plus, RotateCcw, Shield, ShoppingCart, Star, Truck } from 'lucide-react';
import SimilarProducts from '../_component/SimilarProducts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ProductDetailsTable from '../_component/ProductDetailsTable';

export default function ProductDetails() {
    const [productDetails, setProductDetails] = useState<ProductTypeResponse>({} as ProductTypeResponse);
    const [loading, setLoading] = useState<boolean>(true);
    const [quantity, setQuantity] = useState(1);

    const params = useParams();
    const { id } = params;

    useEffect(() => {
        const fetchProductDetails = async () => {
            setLoading(true);
            const request = await viewProductById(id as string);

            if (request instanceof Error) {
                console.error(request.message);
                setLoading(false);
            } else {
                setProductDetails(request);
                setLoading(false);
            }
        }
        fetchProductDetails();
    }, [id]);

    return (
        <div className='px-48 w-screen h-screen py-4 '>
            {
                loading ? (
                    <div className='flex justify-center items-center h-full'>
                        <p>Loading...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-12 grid-rows-12  grid-flow-col h-full w-full gap-4">
                        <div className="col-span-4 row-span-8 flex items-center justify-center">
                            <Image
                                src={productDetails.image}
                                alt={'Image'}
                                sizes="100vw"
                                style={{
                                    width: '60%',
                                    height: 'auto',
                                }}
                                width={500}
                                height={300} />
                        </div>
                        <div className="col-span-4 row-span-4">
                            <h3 className='text-2xl font-bold mb-4'>Produtos Similares</h3>
                            <SimilarProducts category={productDetails.category} />
                        </div>
                        <div className="col-span-8 row-span-12 px-24 ">
                            <div className="flex items-center space-x-2 mb-4">
                                <Badge variant="secondary" className="capitalize">
                                    {productDetails?.category}
                                </Badge>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <Star
                                                key={rating}
                                                className={`h-4 w-4 ${rating < Math.floor(productDetails?.rating.rate ?? 0) ? "text-yellow-400 fill-current" : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="ml-2 text-sm text-gray-600">
                                        {productDetails?.rating.rate} ({productDetails?.rating.count} avaliações)
                                    </p>
                                </div>
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>{productDetails?.title}</h1>

                            <div className="mt-6">
                                <div className="flex items-center space-x-4">
                                    <p className="text-3xl font-bold text-gray-900">R$ {productDetails?.price.toFixed(2)}</p>
                                    <p className="text-lg text-gray-500 line-through">R$ {(productDetails?.price * 1.2).toFixed(2)}</p>
                                    <Badge variant="destructive">-17%</Badge>
                                </div>
                                <p className="mt-2 text-sm text-green-600 font-medium">Em estoque • Entrega rápida disponível</p>
                            </div>
                            <div className="mt-8">
                                <div className="flex items-center space-x-4 mb-6">
                                    <label className="text-sm font-medium text-gray-900">Quantidade:</label>
                                    <div className="flex items-center border border-gray-300 rounded-md">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-10 w-10"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
                                        <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQuantity(quantity + 1)}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-3">
                                    <Button size="lg" variant="outline" className="w-full bg-transparent">
                                        Comprar Agora
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-8 border-t flex items-center justify-center border-gray-200 pt-8">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div className="flex items-center space-x-3 min-w-60">
                                        <Truck className="h-5 w-5 text-blue-600" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Frete Grátis</p>
                                            <p className="text-xs text-gray-500">Acima de R$ 99</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 min-w-60">
                                        <Shield className="h-5 w-5 text-green-600" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Garantia</p>
                                            <p className="text-xs text-gray-500">12 meses</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 min-w-60">
                                        <RotateCcw className="h-5 w-5 text-purple-600" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Devolução</p>
                                            <p className="text-xs text-gray-500">30 dias</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ProductDetailsTable {...productDetails} />
                        </div>

                    </div>
                )
            }

        </div>
    )
}
