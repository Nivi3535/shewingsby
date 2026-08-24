import { create } from "zustand";
import { Category } from "@/types/categories";
import {
  getCategory,
  saveCategory,
  deleteCategory,
} from "@/lib/Helper/categories";

interface CategoryStore {
  categories: Category[];
  loading: boolean;
  error: string | null;

  loadCategory: () => Promise<void>;
  saveCategory: (formData: FormData) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  loading: false,
  error: null,

  loadCategory: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const categories = await getCategory();

      set({
        categories,
        loading: false,
      });
    } catch (error) {
      console.error(error);

      set({
        loading: false,
        error: "Failed to load categories",
      });
    }
  },

  saveCategory: async (formData: FormData) => {
    try {
      set({
        loading: true,
        error: null,
      });

      await saveCategory(formData);

      const categories = await getCategory();

      set({
        categories,
        loading: false,
      });
    } catch (error) {
      console.error(error);

      set({
        loading: false,
        error: "Failed to save category",
      });
    }
  },
  deleteCategory: async (id: number) => {
    try {
      set({
        loading: true,
        error: null,
      });
      await deleteCategory(id);
    } catch (error) {
      console.log(error);
      set({
        loading: false,
        error: "Failed to delete category",
      });
    } finally {
      set({
        loading: false,
      });
    }
  },
}));
