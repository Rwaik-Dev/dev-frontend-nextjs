import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { ProductTypeResponse } from '@/utils/types'
import { Star } from 'lucide-react'
import { useRouter } from 'next/navigation'



export default function ItemCard(product: ProductTypeResponse) {

    const router = useRouter()

    return (
        <Card className='scale-100 hover:scale-102 transition-all duration-300 cursor-pointer' onClick={() => router.push(`/product/${product.id}`)}>
            <CardHeader className='flex justify-center items-center h-[300px]'>
                <Image
                    src={product.image}
                    alt={product.title}
                    sizes="100vw"
                    style={{
                        width: '30%',
                        height: 'auto',
                    }}
                    width={500}
                    height={300} />
            </CardHeader>
            <CardContent className='h-[150px]'>
                <CardTitle className='mb-2'>{product.title}</CardTitle>
                <h3 className="mb-2 font-medium text-muted-foreground">{product.category}</h3>
                <CardDescription className='line-clamp-5'>{product.description}</CardDescription>
            </CardContent>
            <CardFooter className='flex justify-between items-center'>
                <div className="">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                <div className="flex flex-col gap-1">
                    <p className='flex'>
                        {Array.from({ length: product.rating.rate }).map(() => <Star key={Math.random()} className="h-4 w-4 text-yellow-500 fill-amber-400" />)}
                    </p>
                    <span className='text-muted-foreground text-xs'>{product.rating.count} avaliações</span>
                </div>
            </CardFooter>
        </Card>
    )
}
