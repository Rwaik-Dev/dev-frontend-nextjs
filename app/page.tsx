"use client";
import React, { useEffect, useState } from 'react'
import ItemCard from './_components/ItemCard';
import { ProductTypeResponse } from '@/utils/types';
import Loader from './_components/Loader';



export default function Home() {

  const [products, setProducts] = useState<ProductTypeResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      const response = await fetch('http://localhost:3000/api/products/listProducts?limit=1000')
      const data = await response.json()
      setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  return (
    <main className={loading ? 'flex justify-center items-center h-screen' : 'grid grid-cols-3 gap-4 px-24'}>
      {
        loading ?
          <Loader /> :
          products.map((product, index) => <ItemCard key={product.id} id={product.id} title={product.title} price={product.price} description={product.description} category={product.category} image={product.image} rating={product.rating} />)
      }
    </main>
  )
}
