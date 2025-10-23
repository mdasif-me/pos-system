import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, Transaction, Category, User, PosState } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface PosStore extends PosState {
  // Cart actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;

  // Product actions
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (categoryId: string) => Product[];

  // Category actions
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Transaction actions
  createTransaction: (paymentMethod: 'cash' | 'card' | 'digital_wallet') => Transaction;
  completeTransaction: (transaction: Transaction) => void;

  // User actions
  setCurrentUser: (user: User) => void;
  logout: () => void;
}

export const usePosStore = create<PosStore>()(
  persist(
    (set, get) => ({
      // Initial state
      cart: [],
      currentTransaction: null,
      products: [
        // Sample products for demo
        {
          id: '1',
          name: 'Coffee - Espresso',
          price: 3.50,
          category: 'beverages',
          stock: 100,
          barcode: '1234567890123',
          description: 'Rich espresso coffee',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Sandwich - Club',
          price: 8.99,
          category: 'food',
          stock: 25,
          barcode: '1234567890124',
          description: 'Classic club sandwich',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3',
          name: 'Pastry - Croissant',
          price: 4.50,
          category: 'food',
          stock: 15,
          barcode: '1234567890125',
          description: 'Fresh butter croissant',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      categories: [
        { id: 'beverages', name: 'Beverages', color: '#3B82F6', icon: 'coffee' },
        { id: 'food', name: 'Food', color: '#10B981', icon: 'utensils' },
        { id: 'desserts', name: 'Desserts', color: '#F59E0B', icon: 'cake' },
      ],
      currentUser: null,

      // Cart actions
      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.cart.findIndex(
            (item) => item.product.id === product.id
          );

          if (existingItemIndex > -1) {
            // Update existing item
            const updatedCart = [...state.cart];
            const newQuantity = updatedCart[existingItemIndex].quantity + quantity;
            updatedCart[existingItemIndex] = {
              ...updatedCart[existingItemIndex],
              quantity: newQuantity,
              subtotal: newQuantity * product.price,
            };
            return { cart: updatedCart };
          } else {
            // Add new item
            const newItem: CartItem = {
              product,
              quantity,
              subtotal: quantity * product.price,
            };
            return { cart: [...state.cart, newItem] };
          }
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        }));
      },

      updateCartQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId
              ? {
                  ...item,
                  quantity,
                  subtotal: quantity * item.product.price,
                }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + item.subtotal, 0);
      },

      getCartItemCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },

      // Product actions
      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          products: [...state.products, newProduct],
        }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id
              ? { ...product, ...updates, updatedAt: new Date() }
              : product
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        }));
      },

      getProductById: (id) => {
        return get().products.find((product) => product.id === id);
      },

      getProductsByCategory: (categoryId) => {
        return get().products.filter((product) => product.category === categoryId);
      },

      // Category actions
      addCategory: (categoryData) => {
        const newCategory: Category = {
          ...categoryData,
          id: uuidv4(),
        };

        set((state) => ({
          categories: [...state.categories, newCategory],
        }));
      },

      updateCategory: (id, updates) => {
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === id ? { ...category, ...updates } : category
          ),
        }));
      },

      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((category) => category.id !== id),
        }));
      },

      // Transaction actions
      createTransaction: (paymentMethod) => {
        const state = get();
        const transaction: Transaction = {
          id: uuidv4(),
          items: [...state.cart],
          total: state.getCartTotal(),
          tax: state.getCartTotal() * 0.08, // 8% tax
          paymentMethod,
          timestamp: new Date(),
          cashierName: state.currentUser?.name,
        };

        set({ currentTransaction: transaction });
        return transaction;
      },

      completeTransaction: (transaction) => {
        // Update product stock
        set((state) => {
          const updatedProducts = state.products.map((product) => {
            const cartItem = transaction.items.find(
              (item) => item.product.id === product.id
            );
            if (cartItem) {
              return {
                ...product,
                stock: Math.max(0, product.stock - cartItem.quantity),
              };
            }
            return product;
          });

          return {
            products: updatedProducts,
            cart: [],
            currentTransaction: null,
          };
        });
      },

      // User actions
      setCurrentUser: (user) => {
        set({ currentUser: user });
      },

      logout: () => {
        set({ currentUser: null, cart: [], currentTransaction: null });
      },
    }),
    {
      name: 'pos-store',
      partialize: (state) => ({
        products: state.products,
        categories: state.categories,
        currentUser: state.currentUser,
      }),
    }
  )
);