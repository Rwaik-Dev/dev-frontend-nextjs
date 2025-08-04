# Product CRUD - FakeStore API

Uma aplicação web completa de CRUD de produtos desenvolvida com Next.js, TypeScript e FakeStore API.

## 🚀 Funcionalidades

### ✅ Funcionalidades Obrigatórias
- **Listagem de produtos** - Visualize todos os produtos com filtros e busca
- **Visualização de produto** - Página detalhada de cada produto
- **Criação de produto** - Formulário para adicionar novos produtos
- **Edição de produto** - Atualize informações de produtos existentes
- **Exclusão de produto** - Remova produtos com confirmação

### 🌟 Funcionalidades Extras
- **Dashboard responsivo** - Visão geral com estatísticas
- **Sidebar responsiva** - Navegação lateral colapsável
- **Layout totalmente responsivo** - Funciona perfeitamente em mobile e desktop
- **Sistema de busca avançado** - Busca por título, categoria e descrição
- **Filtros por categoria** - Filtre produtos por categoria
- **Ordenação** - Ordene por nome, preço ou categoria
- **Modo de visualização** - Grid ou lista
- **Feedback visual** - Toasts para sucesso e erro
- **Loading states** - Indicadores de carregamento
- **Validação de formulários** - Validação client-side

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI modernos
- **Lucide React** - Ícones
- **Sonner** - Notificações toast
- **FakeStore API** - API de produtos para testes

## 📦 API Endpoints Utilizados

- `GET /products` - Listar produtos
- `GET /products/:id` - Visualizar detalhes
- `POST /products` - Criar novo produto
- `PUT /products/:id` - Editar produto
- `DELETE /products/:id` - Deletar produto

## 🏗️ Estrutura do Projeto

```
dev-frontend-nextjs/
├── app/
│   ├── _components/          # Componentes compartilhados
│   │   ├── MainLayout.tsx    # Layout principal com sidebar
│   │   ├── Sidebar.tsx       # Sidebar responsiva
│   │   ├── ItemCard.tsx      # Card de produto
│   │   └── Loader.tsx        # Componente de loading
│   ├── product/
│   │   ├── [id]/             # Página de detalhes do produto
│   │   └── _component/       # Componentes específicos de produto
│   ├── products/
│   │   ├── create/           # Página de criação
│   │   ├── edit/[id]/        # Página de edição
│   │   └── page.tsx          # Lista de produtos
|   ├──login/
|   |   └── page.tsx          # Paginá de login
│   ├── globals.css           # Estilos globais
│   ├── layout.tsx            # Layout raiz
│   └── page.tsx              # Dashboard principal
├── components/
│   └── ui/                   # Componentes shadcn/ui
├── utils/
│   ├── constants/            # Constantes (API_URL)
│   ├── functions/            # Funções de API
│   │   └── products/         # Funções CRUD de produtos
│   └── types/                # Tipos TypeScript
└── lib/
    └── utils.ts              # Utilitários
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm, yarn ou pnpm

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd dev-frontend-nextjs
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Execute o projeto**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. **Acesse a aplicação**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📱 Funcionalidades por Página

### Dashboard (`/`)
- Visão geral dos produtos
- Estatísticas (total, categorias, filtrados)
- Busca rápida
- Acesso rápido para criar produtos

### Criar Produto (`/product/create`)
- Formulário completo
- Validação de campos
- Preview de imagem
- Categorias pré-definidas

### Editar Produto (`/product/edit/[id]`)
- Formulário pré-preenchido
- Validação de campos
- Preview de imagem
- Atualização em tempo real

### Detalhes do Produto (`/product/[id]`)
- Informações completas
- Imagem em alta resolução
- Produtos similares
- Ações de edição/exclusão
- Informações de entrega e garantia

## 🎨 Design System

A aplicação utiliza o **shadcn/ui** como base de componentes, oferecendo:
- Componentes acessíveis
- Design consistente
- Tema escuro/claro
- Responsividade nativa
- Animações suaves

## 📱 Responsividade

A aplicação é totalmente responsiva com breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Características Responsivas:
- Sidebar colapsável em mobile
- Grid adaptativo
- Navegação otimizada para touch
- Formulários adaptáveis

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Linting
```

## 🌐 Deploy

### Vercel 
Abra [https://dev-frontend-nextjs-nu.vercel.app/](https://dev-frontend-nextjs-nu.vercel.app/) no seu navegador.

**Desenvolvido com ❤️ por Wilker Rwaik usando Next.js, TypeScript e FakeStore API**
