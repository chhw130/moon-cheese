export type RecentPurchaseProduct = {
  id: number;
  thumbnail: string;
  name: string;
  price: number;
};

export type RecentPurchaseProductSchema = {
  recentProducts: RecentPurchaseProduct[];
};
