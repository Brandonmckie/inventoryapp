import { create } from 'zustand';
import { createClient } from '@/utils/supabase/client';

export interface Product {
    id: string;
    name: string;
    sku: string;
    category: string;
    brand?: string;
    modelNumber?: string;
    color?: string;
    size?: string;
    price: number;
    costPrice?: number;
    stock: number;
    threshold?: number;
    imageUrl?: string;
    status?: string; // We'll compute this dynamically locally or in DB
}

export interface Activity {
    id: string;
    action: string;
    item: string;
    quantity: number;
    date: string;
    user_id?: string;
    user?: string; // from mock data
    note?: string;
}

interface InventoryState {
    products: Product[];
    activities: Activity[];
    searchQuery: string;
    filterCategory: string;
    filterStatus: string;
    isInitialized: boolean;
    isLoading: boolean;
    initialize: () => Promise<void>;
    addProduct: (product: Omit<Product, 'id' | 'status'>) => Promise<void>;
    updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    adjustStock: (id: string, newStock: number) => Promise<void>;
    addActivity: (activity: Omit<Activity, 'id' | 'date'>) => Promise<void>;
    setSearchQuery: (query: string) => void;
    setFilterCategory: (category: string) => void;
    setFilterStatus: (status: string) => void;
    clearFilters: () => void;
    clearStore: () => void;
}

const determineStatus = (stock: number, threshold: number = 5) => {
    if (stock <= 0) return "Out of Stock";
    if (stock <= threshold) return "Low Stock";
    return "In Stock";
};

export const useInventoryStore = create<InventoryState>((set, get) => {
    const supabase = createClient();

    return {
        products: [],
        activities: [],
        searchQuery: "",
        filterCategory: "all",
        filterStatus: "all",
        isInitialized: false,
        isLoading: false,

        initialize: async () => {
            if (get().isInitialized || get().isLoading) return;

            set({ isLoading: true });

            // Fetch Products
            const { data: productsData, error: productsError } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (productsError) {
                console.error("Error fetching products:", productsError);
            }

            // Apply computed status to products
            const productsWithStatus = (productsData || []).map(p => ({
                ...p,
                status: determineStatus(p.stock, p.threshold)
            }));

            // Fetch Activities
            const { data: activitiesData, error: activitiesError } = await supabase
                .from('activities')
                .select('*')
                .order('date', { ascending: false });

            if (activitiesError) {
                console.error("Error fetching activities:", activitiesError);
            }

            set({
                products: productsWithStatus as Product[],
                activities: (activitiesData || []) as Activity[],
                isInitialized: true,
                isLoading: false
            });
        },

        addProduct: async (product) => {
            const { data: { user } } = await supabase.auth.getUser();

            const payload = {
                ...product,
                user_id: user?.id
            };

            const { data, error } = await supabase
                .from('products')
                .insert([payload])
                .select()
                .single();

            if (error) {
                console.error("Error inserting product:", error);
                return;
            }

            if (data) {
                const newProduct = { ...data, status: determineStatus(data.stock, data.threshold) } as unknown as Product;
                set((state) => ({
                    products: [newProduct, ...state.products]
                }));
            }
        },

        updateProduct: async (id, updates) => {
            // Optimistic update locally
            set((state) => ({
                products: state.products.map((p) => {
                    if (p.id === id) {
                        const newProduct = { ...p, ...updates };
                        if (updates.stock !== undefined || updates.threshold !== undefined) {
                            newProduct.status = determineStatus(newProduct.stock, newProduct.threshold ?? p.threshold ?? 5);
                        }
                        return newProduct;
                    }
                    return p;
                })
            }));

            // Sync to supabase
            const { error } = await supabase
                .from('products')
                .update(updates)
                .eq('id', id);

            if (error) {
                console.error("Error updating product:", error);
                // In a real app we'd revert the optimistic update here on fail.
            }
        },

        deleteProduct: async (id) => {
            // Optimistic delete
            set((state) => ({
                products: state.products.filter((p) => p.id !== id)
            }));

            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) {
                console.error("Error deleting product:", error);
            }
        },

        adjustStock: async (id, newStock) => {
            // Find product threshold for status
            const product = get().products.find(p => p.id === id);
            const threshold = product?.threshold ?? 5;

            // Optimistic update
            set((state) => ({
                products: state.products.map((p) => {
                    if (p.id === id) {
                        return { ...p, stock: newStock, status: determineStatus(newStock, threshold) };
                    }
                    return p;
                })
            }));

            const { error } = await supabase
                .from('products')
                .update({ stock: newStock })
                .eq('id', id);

            if (error) {
                console.error("Error adjusting product stock:", error);
            }
        },

        addActivity: async (activity) => {

            // Get user making the activity
            const { data: { user } } = await supabase.auth.getUser();

            const payload = {
                ...activity,
                user_id: user?.id || null
            };

            const { data, error } = await supabase
                .from('activities')
                .insert([payload])
                .select()
                .single();

            if (error) {
                console.error("Error inserting activity:", error);
                return;
            }

            if (data) {
                set((state) => ({
                    activities: [data as unknown as Activity, ...state.activities]
                }));
            }
        },

        setSearchQuery: (query) => set({ searchQuery: query }),
        setFilterCategory: (category) => set({ filterCategory: category }),
        setFilterStatus: (status) => set({ filterStatus: status }),
        clearFilters: () => set({ searchQuery: "", filterCategory: "all", filterStatus: "all" }),
        clearStore: () => set({
            products: [],
            activities: [],
            searchQuery: "",
            filterCategory: "all",
            filterStatus: "all",
            isInitialized: false,
            isLoading: false
        }),
    };
});
