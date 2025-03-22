import { create } from "zustand";

export interface Product {
    _id?: string;
    name: string;
    price: number;
    image: string;
}

interface ProductInput {
    name: string;
    price: string;
    image: string;
}

interface ValidationResult {
    isValid: boolean;
    errors: {
        name?: string;
        price?: string;
        image?: string;
    };
}

interface CreateProductResult {
    success: boolean;
    message: string;
    errors?: {
        name?: string;
        price?: string;
        image?: string;
    };
}

interface DeleteProductResult {
    success: boolean;
    message: string;
}

interface UpdateProductResult {
    success: boolean;
    message: string;
    errors?: {
        name?: string;
        price?: string; 
        image?: string;
    };
}

interface ProductState {
    products: Product[];
    setProducts: (products: Product[]) => void;
    createProduct: (newProduct: ProductInput) => Promise<CreateProductResult>;
    fetchProducts: () => Promise<void>;
    validateProduct: (productInput: ProductInput) => ValidationResult;
    deleteProduct: (id: string) => Promise<DeleteProductResult>;
    updateProduct: (id: string, updatedProduct: ProductInput) => Promise<CreateProductResult>;
}

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    
    setProducts: (products: Product[]) => set({ products }),

    validateProduct: (productInput: ProductInput): ValidationResult => {
        const errors: { name?: string; price?: string; image?: string } = {};

        if (!productInput.name.trim()) {
            errors.name = "Name is required";
        }

        if (!productInput.price) {
            errors.price = "Price is required";
        } else if (isNaN(parseFloat(productInput.price))) {
            errors.price = "Price must be a valid number";
        }

        if (!productInput.image.trim()) {
            errors.image = "Image URL is required";
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    },

    createProduct: async (productInput: ProductInput): Promise<CreateProductResult> => {
        const validation = useProductStore.getState().validateProduct(productInput);

        if (!validation.isValid) {
            return { 
                success: false, 
                message: "Validation failed", 
                errors: validation.errors 
            };
        }
        
        try {
            const newProduct: Product = {
                name: productInput.name.trim(),
                price: parseFloat(productInput.price),
                image: productInput.image.trim()
            };
            
            const res = await fetch("/api/products/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });
            
            if (!res.ok) {
                const errorData = await res.json();
                return { 
                    success: false, 
                    message: errorData.message || "Failed to create product" 
                };
            }

            const data = await res.json();

            set((state) => ({
                products: [...state.products, data.data],
            }));

            return { success: true, message: "Product created successfully" };
        } catch (error) {
            console.error("Error creating product:", error);
            return { 
                success: false, 
                message: error instanceof Error ? error.message : "Unknown error occurred" 
            };
        }
    },

    deleteProduct: async (id: string): Promise<DeleteProductResult> => {
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const errorData = await res.json();
                return { success: false, message: errorData.message || "Failed to delete product" };
            }

            set((state) => ({
                products: state.products.filter((product) => product._id !== id),
            }));

            return { success: true, message: "Product deleted successfully" };
        } catch (error) {
            console.error("Error deleting product:", error);
            return { success: false, message: "Failed to delete product" };
        }
        },

    updateProduct: async (id: string, updatedProduct: ProductInput): Promise<UpdateProductResult> => {
        const validation = useProductStore.getState().validateProduct(updatedProduct);

        if (!validation.isValid) {
            return { 
                success: false, 
                message: "Validation failed", 
                errors: validation.errors 
            };
        }   

        try {
            const updatedProductData: Product = {
                _id: id,
                name: updatedProduct.name.trim(),
                price: parseFloat(updatedProduct.price),
                image: updatedProduct.image.trim()    
            };

            const res = await fetch(`/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify(updatedProductData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                return { 
                    success: false, 
                    message: errorData.message || "Failed to update product" 
                };
            }

            const data = await res.json();

            set((state) => ({
                products: state.products.map((product) => 
                    product._id === id ? data.data : product
                ),
            }));

            return { success: true, message: "Product updated successfully" };
        } catch (error) {
            console.error("Error updating product:", error);
            return { success: false, message: "Failed to update product" };
        }
    }, 

    fetchProducts: async (): Promise<void> => {
        try {
          const res = await fetch("https://localhost:4000/api/products", {
            headers: {
              'Content-Type': 'application/json',
            },
            mode: 'cors' 
          });
      
          if (!res.ok) throw new Error(`HTTP ${res.status} - ${await res.text()}`);
          
          const data = await res.json();
          set({ products: data.data });
        } catch (error) {
          console.error('Network error:', error);
        }
      },
}));