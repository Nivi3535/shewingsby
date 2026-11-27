export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  parentId?: string | null;
  children?: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface CategoryFormInput {
  name: string;
  slug: string;
  description: string;
  parentId?: string | null;
}
