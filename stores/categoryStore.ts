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
  saveCategory: (formData: FormData) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<void>;
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
      set({ categories, loading: false });
      return true;
      return true;
    } catch (error) {
      console.error(error);
      set({
        loading: false,
        error:
          error instanceof Error ? error.message : "Failed to save category",
      });
      return false;
    }
  },

  deleteCategory: async (id: string) => {
    try {
      set({
        loading: true,
        error: null,
      });
      await deleteCategory(id);
      set((state) => ({
        categories: state.categories.filter((c) => c.id !== id),
      }));
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
