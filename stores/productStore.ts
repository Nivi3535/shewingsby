import { create } from "zustand";
import Product from "@/types/Product";
import { getProduct, postProduct, removeProduct } from "@/lib/Helper/product";

interface ProductStore {
  product: Product[];
  loading: boolean;
  error: string | null;

  loadProduct: () => Promise<void>;
  saveProduct: (formData: FormData) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  product: [],
  loading: false,
  error: null,

  loadProduct: async () => {
    try {
      set({
        loading: true,
        error: null,
      });
      console.log("loadProduct called");
      const product = await getProduct();

      set({
        product,
        loading: false,
      });
    } catch (error) {
      console.error(error);

      set({
        loading: false,
        error: "Failed to load product",
      });
    }
  },
  saveProduct: async (formData: FormData) => {
    try {
      set({
        loading: true,
        error: "No Error",
      });
      await postProduct(formData);
      const product = await getProduct();
      set({
        product,
      });
    } catch {
      set({
        loading: false,
        error: "Failed to save Product",
      });
    }
  },
  deleteProduct: async (id: number) => {
    try {
      set({
        loading: true,
        error: null,
      });
      await removeProduct(id);
    } catch (error) {
      console.log(error);
      set({
        loading: false,
        error: "Failed to delete Product",
      });
    } finally {
      set({
        loading: false,
      });
    }
  },
}));
