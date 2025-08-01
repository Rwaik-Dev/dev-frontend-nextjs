export type ProductType = {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export type ProductTypeResponse = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    }
}