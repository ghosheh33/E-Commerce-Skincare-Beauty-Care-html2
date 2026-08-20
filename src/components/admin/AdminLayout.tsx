import React from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Settings,
  ArrowLeft,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { AdminTab, Order, OrderStatus, Product, Review, ViewMode } from '../../types';
import { AdminOverview } from './AdminOverview';
import { ProductManagement } from './ProductManagement';
import { OrderManagement } from './OrderManagement';

interface AdminLayoutProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onExitAdmin: () => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateStock: (productId: string, stock: number) => void;
  reviews: Review[];
  onApproveReview: (reviewId: string) => void;
  onRejectReview: (reviewId: string) => void;
  onViewInvoice: (order: Order) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  onTabChange,
  onExitAdmin,
  orders,
  onUpdateOrderStatus,
  products,
  onAddProduct,
  onDeleteProduct,
  onUpdateStock,
  reviews,
  onApproveReview,
  onRejectReview,
  onViewInvoice,
}) => {
  return (
    <div className="min-h-screen bg-[#fcf9f8] flex flex-col lg:flex-row">
      {/* Left Admin Sidebar */}
      <aside className="w-full lg:w-64 bg-[#181d18] text-[#e3e7e2] p-6 flex flex-col justify-between border-r border-[#283228] shrink-0">
        <div className="space-y-8">
          {/* Logo & Badge */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold tracking-widest text-white">
                LUMINA
              </span>
              <span className="px-2 py-0.5 bg-[#2a382a] text-[#9db49b] text-[10px] font-bold rounded tracking-wider uppercase">
                Admin
              </span>
            </div>
            <p className="text-[11px] text-[#798879]">Botanical Laboratory Control</p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-medium">
            <button
              onClick={() => onTabChange('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#516050] text-white font-semibold'
                  : 'text-[#a0aba0] hover:bg-[#252e25] hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => onTabChange('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'orders'
                  ? 'bg-[#516050] text-white font-semibold'
                  : 'text-[#a0aba0] hover:bg-[#252e25] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders & Reviews</span>
              </div>
              {reviews.filter((r) => r.status === 'Pending Approval').length > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              )}
            </button>

            <button
              onClick={() => onTabChange('products')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'products'
                  ? 'bg-[#516050] text-white font-semibold'
                  : 'text-[#a0aba0] hover:bg-[#252e25] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>Products</span>
              </div>
              <span className="text-[10px] text-[#798879]">{products.length}</span>
            </button>

            <button
              onClick={() => onTabChange('customers')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'customers'
                  ? 'bg-[#516050] text-white font-semibold'
                  : 'text-[#a0aba0] hover:bg-[#252e25] hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customers</span>
            </button>

            <button
              onClick={() => onTabChange('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#516050] text-white font-semibold'
                  : 'text-[#a0aba0] hover:bg-[#252e25] hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Switcher back to Storefront */}
        <div className="pt-6 border-t border-[#283228] space-y-4">
          <div className="flex items-center gap-2.5 text-xs text-[#a0aba0]">
            <div className="w-8 h-8 rounded-full bg-[#2a382a] flex items-center justify-center text-[#9db49b] font-bold text-xs">
              AD
            </div>
            <div>
              <p className="font-medium text-white">Admin Master</p>
              <p className="text-[10px] text-[#798879]">superadmin@luminaskin.com</p>
            </div>
          </div>

          <button
            onClick={onExitAdmin}
            className="w-full py-2.5 px-3 bg-[#2a342a] text-[#d7ded5] hover:bg-[#516050] hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Storefront</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Container */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl">
        {activeTab === 'overview' && (
          <AdminOverview
            orders={orders}
            products={products}
            onViewInvoice={onViewInvoice}
            onNavigateToOrders={() => onTabChange('orders')}
            onNavigateToProducts={() => onTabChange('products')}
          />
        )}

        {activeTab === 'products' && (
          <ProductManagement
            products={products}
            onAddProduct={onAddProduct}
            onDeleteProduct={onDeleteProduct}
            onUpdateStock={onUpdateStock}
          />
        )}

        {activeTab === 'orders' && (
          <OrderManagement
            orders={orders}
            onUpdateOrderStatus={onUpdateOrderStatus}
            reviews={reviews}
            onApproveReview={onApproveReview}
            onRejectReview={onRejectReview}
            onViewInvoice={onViewInvoice}
          />
        )}

        {activeTab === 'customers' && (
          <div className="bg-white p-8 rounded-2xl border border-[#ece8e5] luxury-shadow-sm space-y-6">
            <h2 className="font-serif text-2xl text-[#1c1b1b]">Registered Members Directory</h2>
            <div className="space-y-4 text-xs">
              {[
                { name: 'Elena Rostova', email: 'elena.r@example.com', orders: 3, spend: '$243.00', tier: 'Gold Member' },
                { name: 'Marcus Sterling', email: 'marcus.s@example.com', orders: 1, spend: '$89.50', tier: 'Silver' },
                { name: 'Sylvia Plath', email: 'sylvia.p@example.com', orders: 2, spend: '$146.88', tier: 'Botanical Circle' },
              ].map((c, i) => (
                <div key={i} className="p-4 bg-[#fcf9f8] rounded-xl border border-[#ece8e5] flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#1c1b1b] text-sm">{c.name}</p>
                    <p className="text-[#747872]">{c.email}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-0.5 bg-[#e8ede7] text-[#3c4a3c] rounded-full text-[10px] font-bold">
                      {c.tier}
                    </span>
                    <p className="text-[#747872] text-[11px] mt-1">{c.orders} orders • {c.spend}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white p-8 rounded-2xl border border-[#ece8e5] luxury-shadow-sm space-y-6 max-w-xl text-xs">
            <h2 className="font-serif text-2xl text-[#1c1b1b]">Storefront & Botanical Settings</h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-medium text-[#1c1b1b]">Store Title</label>
                <input
                  type="text"
                  defaultValue="Lumina Skin Botanical Care"
                  className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3 py-2 text-[#1c1b1b]"
                />
              </div>
              <div className="space-y-1">
                <label className="font-medium text-[#1c1b1b]">Complimentary Shipping Threshold ($ USD)</label>
                <input
                  type="number"
                  defaultValue="50"
                  className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3 py-2 text-[#1c1b1b]"
                />
              </div>
              <div className="space-y-1">
                <label className="font-medium text-[#1c1b1b]">Contact Support Email</label>
                <input
                  type="email"
                  defaultValue="concierge@luminaskin.com"
                  className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3 py-2 text-[#1c1b1b]"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
