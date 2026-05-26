export type RecentPurchaseProduct = {
  id: number;
  thumbnail: string;
  name: string;
  price: number;
};

export type RecentPurchaseProductSchema = {
  recentProducts: RecentPurchaseProduct[];
};

export type ProductCategory = 'CHEESE' | 'CRACKER' | 'TEA';

export type BaseProduct = {
  id: number;
  name: string;
  category: ProductCategory;
  stock: number;
  price: number;
  description: string;
  detailDescription: string;
  images: string[];
  rating: number;
};

export type Product = BaseProduct & {
  isGlutenFree?: boolean;
  isCaffeineFree?: boolean;
};

export type CheeseProduct = Product & {
  isGlutenFree: boolean;
};

export type CrackerProduct = Product & {
  isGlutenFree?: boolean;
};

export type TeaProduct = Product & {
  isCaffeineFree?: boolean;
};

export type ProductSchema = {
  products: Product[];
};
