"use client";
import viewProductById from '@/utils/functions/products/viewProductById';
import { ProductTypeResponse } from '@/utils/types';
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Minus, Plus, RotateCcw, Shield, ShoppingCart, Star, Truck, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import SimilarProducts from '../_component/SimilarProducts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ProductDetailsTable from '../_component/ProductDetailsTable';
import MainLayout from '../../_components/MainLayout';
import { toast } from 'sonner';
import Link from 'next/link';
import deleteProductById from '@/utils/functions/products/deleteProductById';

export default function ProductDetails() {
    const [productDetails, setProductDetails] = useState<ProductTypeResponse>({} as ProductTypeResponse);
    const [loading, setLoading] = useState<boolean>(true);
    const [quantity, setQuantity] = useState(1);
    const [deleting, setDeleting] = useState(false);

    const params = useParams();
    const router = useRouter();
    const { id } = params;

    useEffect(() => {
        const fetchProductDetails = async () => {
            setLoading(true);
            try {
                const request = await viewProductById(id as string);

                if (request instanceof Error) {
                    toast.error(request.message);
                    router.push('/');
                    return;
                }

                setProductDetails(request);
                setLoading(false);
            } catch (error) {
                toast.error('Erro ao carregar produto');
                router.push('/');
            }
        }
        fetchProductDetails();
    }, [id, router]);

    const handleDelete = async () => {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            setDeleting(true);
            try {
                await deleteProductById(productDetails.id);
                toast.success('Produto excluído com sucesso!');
                router.push('/');
            } catch (error) {
                toast.error('Erro ao excluir produto');
            } finally {
                setDeleting(false);
            }
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Detalhes do Produto</h1>
                            <p className="text-gray-600">Visualize e gerencie o produto</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/product/edit/${productDetails.id}`}>
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                            </Button>
                        </Link>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleDelete}
                            disabled={deleting}
                            className="text-red-600 hover:text-red-700"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {deleting ? 'Excluindo...' : 'Excluir'}
                        </Button>
                    </div>
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-lg p-6 border">
                            <div className="relative h-96 w-full">
                                <Image
                                    src={productDetails.image}
                                    alt={productDetails.title}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg p-6 border space-y-4">
                            {/* Category and Rating */}
                            <div className="flex items-center justify-between">
                                <Badge variant="secondary" className="capitalize">
                                    {productDetails.category}
                                </Badge>
                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <Star
                                                key={rating}
                                                className={`h-4 w-4 ${rating < Math.floor(productDetails.rating.rate) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        {productDetails.rating.rate} ({productDetails.rating.count} avaliações)
                                    </span>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl font-bold text-gray-900">{productDetails.title}</h1>

                            {/* Price */}
                            <div className="space-y-2">
                                <div className="flex items-center space-x-4">
                                    <p className="text-3xl font-bold text-gray-900">
                                        R$ {productDetails.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </p>
                                    <p className="text-lg text-gray-500 line-through">
                                        R$ {(productDetails.price * 1.2).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </p>
                                    <Badge variant="destructive">-17%</Badge>
                                </div>
                                <p className="text-sm text-green-600 font-medium">
                                    Em estoque • Entrega rápida disponível
                                </p>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <h3 className="font-semibold text-gray-900">Descrição</h3>
                                <p className="text-gray-600 leading-relaxed">{productDetails.description}</p>
                            </div>

                            {/* Quantity and Actions */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
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
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-10 w-10" 
                                            onClick={() => setQuantity(quantity + 1)}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <Button size="lg" className="w-full">
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                    Comprar Agora
                                </Button>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="bg-white rounded-lg p-6 border">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="flex items-center space-x-3">
                                    <Truck className="h-5 w-5 text-blue-600" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Frete Grátis</p>
                                        <p className="text-xs text-gray-500">Acima de R$ 99</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Shield className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Garantia</p>
                                        <p className="text-xs text-gray-500">12 meses</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <RotateCcw className="h-5 w-5 text-purple-600" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Devolução</p>
                                        <p className="text-xs text-gray-500">30 dias</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Table */}
                <div className="bg-white rounded-lg border">
                    <ProductDetailsTable {...productDetails} />
                </div>

                {/* Similar Products */}
                <div className="bg-white rounded-lg p-6 border">
                    <h3 className="text-xl font-bold mb-4">Produtos Similares</h3>
                    <SimilarProducts category={productDetails.category} />
                </div>
            </div>
        </MainLayout>
    )
}
