export interface Book {
  name: string;
  authors?: { name: string }[];
  current_seller?: { price: number };
  rating_average?: number;
  quantity_sold?: { text: string };
  images?: { thumbnail_url: string }[];
  list_price?: number;
  description?: string;
}