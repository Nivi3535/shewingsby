export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  parentId?: number | null;
  children?: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface CategoryFormInput {
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId: number | null;
}
