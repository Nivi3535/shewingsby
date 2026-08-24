export default interface Product {
  id: number;
  description: string | null;
  slug: string;
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    parentId: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  image: { id: number; image: string | null; productId: number }[];
}
