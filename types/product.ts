export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  isActive: boolean;
  category: {
    name: string;
  };
  supplier?: {
    name: string;
  };
}