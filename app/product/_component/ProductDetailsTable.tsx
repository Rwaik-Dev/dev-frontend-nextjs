import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProductTypeResponse } from '@/utils/types'
import { Star } from 'lucide-react'
import React from 'react'

export default function ProductDetailsTable(productInfo: ProductTypeResponse) {
    return (
        <div className="mt-16">
            <Tabs defaultValue="specifications" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="specifications">Especificações</TabsTrigger>
                    <TabsTrigger value="reviews">Avaliações</TabsTrigger>
                </TabsList>
                <TabsContent value="specifications" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Informações do Produto</h4>
                                    <dl className="space-y-2">
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Categoria:</dt>
                                            <dd className="font-medium capitalize">{productInfo.category}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Peso:</dt>
                                            <dd className="font-medium">1.2 kg</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Dimensões:</dt>
                                            <dd className="font-medium">30 x 20 x 10 cm</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Material:</dt>
                                            <dd className="font-medium">Poliéster</dd>
                                        </div>
                                    </dl>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Informações de Entrega</h4>
                                    <dl className="space-y-2">
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Prazo:</dt>
                                            <dd className="font-medium">3-5 dias úteis</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Frete:</dt>
                                            <dd className="font-medium">Grátis</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Origem:</dt>
                                            <dd className="font-medium">São Paulo, SP</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="space-y-6">
                                <div className="space-y-4 overflow-hidden">
                                    {[
                                        {
                                            name: "Maria Silva",
                                            rating: 5,
                                            comment: "Produto excelente! Superou minhas expectativas.",
                                            date: "15 de julho, 2024",
                                        },
                                        {
                                            name: "João Santos",
                                            rating: 4,
                                            comment: "Muito bom, recomendo. Entrega rápida.",
                                            date: "10 de julho, 2024",
                                        }
                                    ].map((review, index) => (
                                        <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-medium text-gray-900">{review.name}</span>
                                                    <div className="flex items-center">
                                                        {[0, 1, 2, 3, 4].map((rating) => (
                                                            <Star
                                                                key={rating}
                                                                className={`h-3 w-3 ${rating < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-500">{review.date}</span>
                                            </div>
                                            <p className="text-gray-700">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
