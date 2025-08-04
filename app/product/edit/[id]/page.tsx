"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import MainLayout from '../../../_components/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import editProductById from '@/utils/functions/products/editProductById';
import viewProductById from '@/utils/functions/products/viewProductById';
import { ProductType } from '@/utils/types';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState<ProductType>({
    title: '',
    price: 0,
    description: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const product = await viewProductById(productId);
      if (product instanceof Error) {
        toast.error(product.message);
        router.push('/');
        return;
      }

      const { id, rating, ...productData } = product;
      setFormData(productData);
      setInitialLoading(false);
    } catch (error) {
      toast.error('Erro ao carregar produto');
      router.push('/');
    }
  };

  const handleInputChange = (field: keyof ProductType, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.title || !formData.description || !formData.category || !formData.image) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (formData.price <= 0) {
      toast.error('O preço deve ser maior que zero');
      return;
    }

    setLoading(true);
    try {
      await editProductById(parseInt(productId), formData);
      toast.success('Produto atualizado com sucesso!');
      router.push('/');
    } catch (error) {
      toast.error('Erro ao atualizar produto');
      console.error('Erro ao atualizar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics"
  ];

  if (initialLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Editar Produto</h1>
            <p className="text-gray-600 mt-1">Atualize as informações do produto</p>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Produto</CardTitle>
            <CardDescription>
              Atualize os dados do produto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Título */}
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  placeholder="Digite o título do produto"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              {/* Categoria */}
              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preço */}
              <div className="space-y-2">
                <Label htmlFor="price">Preço *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  required
                />
              </div>

              {/* URL da Imagem */}
              <div className="space-y-2">
                <Label htmlFor="image">URL da Imagem *</Label>
                <Input
                  id="image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  required
                />
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  placeholder="Digite a descrição do produto"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  required
                />
              </div>

              {/* Preview da Imagem */}
              {formData.image && (
                <div className="space-y-2">
                  <Label>Preview da Imagem</Label>
                  <div className="border rounded-lg p-4">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="max-w-full h-48 object-contain mx-auto"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Botões */}
              <div className="flex gap-4 pt-4">
                <Link href="/" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </Link>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Atualizando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Atualizar Produto
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
} 