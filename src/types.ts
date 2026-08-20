export type ViewMode = 
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'auth'
  | 'sanctuary'
  | 'admin';

export type SanctuaryTab = 'orders' | 'wishlist' | 'reviews' | 'profile';
export type AdminTab = 'overview' | 'orders' | 'products' | 'customers' | 'settings';

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  sku: string;
  category: 'Cleansers' | 'Serums' | 'Moisturizers' | 'Masks & Treatments' | 'Toners';
  price: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  isLowStock?: boolean;
  images: string[];
  description: string;
  skinTypes: ('Dry' | 'Oily' | 'Combination' | 'Sensitive')[];
  benefits: string[];
  ingredients: string[];
  keyBotanicals?: string;
  size?: string;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  status: 'Published' | 'Pending Approval' | 'Rejected';
  isVerifiedBuyer?: boolean;
}

export interface UserProfile {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  membershipTier: string;
  avatar: string;
  skinProfile: {
    type: string;
    concerns: string[];
    focus: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}
