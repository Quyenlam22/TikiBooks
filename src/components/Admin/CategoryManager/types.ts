export interface Category {
  id: number;
  name: string;
  productCount: number;
  tags: string[];
  imageUrl: string;
  highlight?: boolean;
}
