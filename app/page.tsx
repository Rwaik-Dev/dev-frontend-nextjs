"use client";
import React, { useEffect, useState } from 'react'
import ItemCard from './_components/ItemCard';
import { ProductTypeResponse } from '@/utils/types';
import Loader from './_components/Loader';
import { getProduts } from '@/utils/functions/products/getProducts';
import { toast } from 'sonner';
import Header from './_components/Header';

export default function Home() {

  const [products, setProducts] = useState<ProductTypeResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      const response = await getProduts({ limit: 20 })
      if (response instanceof Error) {
        toast.error(response.message)
        setLoading(false)
        return
      }

      const data = response

      setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  return (
    <main className={loading ? 'flex justify-center items-center h-screen' : 'grid grid-cols-3 gap-4 px-24'}>
      <Header />
      {
        loading ?
          <Loader /> :
          products.map((product) => <ItemCard key={product.id} id={product.id} title={product.title} price={product.price} description={product.description} category={product.category} image={product.image} rating={product.rating} />)
      }
    </main>
  )
}
