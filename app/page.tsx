"use client";
import React, { useEffect, useState } from 'react'
import ItemCard from './_components/ItemCard';
import { ProductTypeResponse } from '@/utils/types';
import Loader from './_components/Loader';
import { getProduts } from '@/utils/functions/products/getProducts';
import { toast } from 'sonner';
import MainLayout from './_components/MainLayout';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import deleteProductById from '@/utils/functions/products/deleteProductById';

export default function Home() {
  const [products, setProducts] = useState<ProductTypeResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<ProductTypeResponse[]>([])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await getProduts({ limit: 20 })
      if (response instanceof Error) {
        toast.error(response.message)
        setLoading(false)
        return
      }

      setProducts(response)
      setFilteredProducts(response)
      setLoading(false)
    } catch (error) {
      toast.error('Erro ao carregar produtos')
      setLoading(false)
    }
  }

  useEffect(() => {

    fetchProducts()
  }, [])

  const handleDelete = async (productId: number) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await deleteProductById(productId)
        toast.success('Produto excluído com sucesso!')
        fetchProducts() // Recarregar produtos
      } catch (error) {
        toast.error('Erro ao excluir produto')
      }
    }
  }

  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProducts(filtered)
  }, [searchTerm, products])

  const categories = [...new Set(products.map(product => product.category))]

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Gerencie seus produtos de forma eficiente</p>
          </div>
          <Link href="/products/create">
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Criar Produto
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Produtos</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Search className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Categorias</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Search className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Filtrados</p>
                <p className="text-2xl font-bold text-gray-900">{filteredProducts.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 5).map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => setSearchTerm(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-600">Tente ajustar sua busca ou criar um novo produto.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ItemCard key={product.id} {...product} onDelete={() => handleDelete(product.id)} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
