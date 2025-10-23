// Product interface for POS system
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  barcode?: string;
  image?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Cart item interface
export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

// Transaction interface
export interface Transaction {
  id: string;
  items: CartItem[];
  total: number;
  tax: number;
  discount?: number;
  paymentMethod: PaymentMethod;
  timestamp: Date;
  cashierName?: string;
}

// Payment method enum
export type PaymentMethod = 'cash' | 'card' | 'digital_wallet';

// Category interface
export interface Category {
  id: string;
  name: string;
  color?: string;
  icon?: string;
}

// User/Cashier interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'cashier';
  avatar?: string;
}

// Global state interfaces
export interface PosState {
  cart: CartItem[];
  currentTransaction: Transaction | null;
  products: Product[];
  categories: Category[];
  currentUser: User | null;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Modal props interface
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

// Form validation interfaces
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isLoading: boolean;
  isValid: boolean;
}