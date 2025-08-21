export interface Product {
  id: number;
  title: string;
  author: string;
  images: {
    thumbnail: string[];
    fullSize: string;
  };
  price: number;
  salePrice?: number;
  discountPercentage?: number;
  rating: number;
  description: {
    short: string;
    long: string;
  };
  category: string;
  isBestseller: boolean;
  productDetails: {
    company: string;
    publisher: string;
    publishedDate: string;
    size: string;
    translator: string;
    coverType: string;
    pages: number;
  };
}
