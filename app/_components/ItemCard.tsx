import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { ProductTypeResponse } from '@/utils/types'
import { Star, Eye, Edit, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ItemCardProps extends ProductTypeResponse {
    onDelete?: () => void;
}

export default function ItemCard(product: ItemCardProps) {
    const router = useRouter()

    const handleView = () => {
        router.push(`/product/${product.id}`)
    }

    const handleEdit = () => {
        router.push(`/product/edit/${product.id}`)
    }

    const handleDelete = () => {
        if (product.onDelete) {
            product.onDelete()
        }
    }

    return (
        <Card className='group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-sm'>
            <CardHeader className='flex justify-center items-center h-48 p-4'>
                <div className="relative w-full h-full">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </CardHeader>
            <CardContent className='p-4 space-y-3'>
                <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="capitalize text-xs">
                        {product.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-600">{product.rating.rate}</span>
                    </div>
                </div>
                <CardTitle className='text-sm font-semibold line-clamp-2 leading-tight'>
                    {product.title}
                </CardTitle>
                <p className='text-xs text-gray-600 line-clamp-2 leading-relaxed'>
                    {product.description}
                </p>
            </CardContent>
            <CardFooter className='p-4 pt-0'>
                <div className="w-full space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">
                            R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        <span className="text-xs text-gray-500">
                            {product.rating.count} avaliações
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 text-xs"
                            onClick={handleView}
                        >
                            <Eye className="h-3 w-3 mr-1" />
                            Ver
                        </Button>
                        <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 text-xs"
                            onClick={handleEdit}
                        >
                            <Edit className="h-3 w-3 mr-1" />
                            Editar
                        </Button>
                        <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 text-xs text-red-600 hover:text-red-700"
                            onClick={handleDelete}
                        >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Excluir
                        </Button>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
