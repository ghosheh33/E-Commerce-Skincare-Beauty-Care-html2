import React, { useState } from 'react';
import {
  Printer,
  Check,
  X,
  Star,
  MessageSquare,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { Order, OrderStatus, Review } from '../../types';

interface OrderManagementProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  reviews: Review[];
  onApproveReview: (reviewId: string) => void;
  onRejectReview: (reviewId: string) => void;
  onViewInvoice: (order: Order) => void;
}

export const OrderManagement: React.FC<OrderManagementProps> = ({
  orders,
  onUpdateOrderStatus,
  reviews,
  onApproveReview,
  onRejectReview,
  onViewInvoice,
}) => {
  const [orderSearch, setOrderSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const pendingReviews = reviews.filter((r) => r.status === 'Pending Approval');

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'All' && o.status !== statusFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-semibold text-[#1c1b1b]">
          Order Management & Review Moderation
        </h2>
        <p className="text-xs text-[#747872] mt-0.5">
          Overview of recent transactions and pending customer reviews for moderation.
        </p>
      </div>

      {/* SECTION 1: ORDERS TABLE (Screenshot 6) */}
      <div className="bg-white rounded-2xl border border-[#ece8e5] luxury-shadow-sm space-y-4 overflow-hidden">
        <div className="p-6 border-b border-[#ece8e5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-serif text-lg font-medium text-[#1c1b1b]">
            All Transactions ({filteredOrders.length})
          </h3>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders or customer..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3 py-1.5 text-xs text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
            >
              <option value="All">All Statuses</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#fcf9f8] text-[#747872] font-semibold uppercase tracking-wider border-b border-[#ece8e5]">
                <th className="py-3.5 px-6">Order ID</th>
                <th className="py-3.5 px-6">Customer Details</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Items</th>
                <th className="py-3.5 px-6">Total</th>
                <th className="py-3.5 px-6">Change Status</th>
                <th className="py-3.5 px-6 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ece8e5]">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#fcf9f8] transition-colors">
                  <td className="py-3.5 px-6 font-mono font-medium text-[#1c1b1b]">{order.id}</td>
                  <td className="py-3.5 px-6">
                    <p className="font-medium text-[#1c1b1b]">{order.customerName}</p>
                    <p className="text-[11px] text-[#747872]">{order.customerEmail}</p>
                  </td>
                  <td className="py-3.5 px-6 text-[#747872]">{order.date}</td>
                  <td className="py-3.5 px-6">
                    <span className="text-[#444842]">
                      {order.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 font-serif font-semibold text-[#1c1b1b]">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-6">
                    <select
                      value={order.status}
                      onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold focus:outline-none cursor-pointer ${
                        order.status === 'Completed' || order.status === 'Delivered'
                          ? 'bg-[#e8ede7] text-[#3c4a3c]'
                          : order.status === 'Shipped'
                          ? 'bg-blue-50 text-blue-700'
                          : order.status === 'Cancelled'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button
                      onClick={() => onViewInvoice(order)}
                      className="p-1.5 text-[#516050] hover:bg-[#edeae7] rounded-lg transition-colors inline-flex items-center gap-1"
                      title="View Invoice"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: REVIEW MODERATION QUEUE (Screenshot 6) */}
      <div className="bg-white rounded-2xl border border-[#ece8e5] luxury-shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#516050]" />
            <h3 className="font-serif text-lg font-medium text-[#1c1b1b]">
              Pending Customer Reviews
            </h3>
          </div>
          <span className="px-2.5 py-1 bg-[#edeae7] text-[#516050] rounded-full text-xs font-semibold">
            {pendingReviews.length} Awaiting Moderation
          </span>
        </div>

        {pendingReviews.length === 0 ? (
          <div className="bg-[#fcf9f8] p-8 rounded-xl border border-[#ece8e5] text-center text-xs text-[#747872] flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>All customer reflections have been reviewed and published!</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pendingReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#fcf9f8] p-5 rounded-xl border border-[#ece8e5] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#1c1b1b]">{rev.productName}</span>
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-[#444842] italic leading-relaxed">
                    "{rev.comment}"
                  </p>

                  <div className="pt-2 text-[11px] text-[#747872]">
                    By <span className="font-medium text-[#1c1b1b]">{rev.author}</span> • {rev.date}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#ece8e5] flex items-center justify-end gap-2">
                  <button
                    onClick={() => onRejectReview(rev.id)}
                    className="px-3 py-1.5 bg-[#edeae7] text-[#747872] hover:text-red-600 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>

                  <button
                    onClick={() => onApproveReview(rev.id)}
                    className="px-3.5 py-1.5 bg-[#516050] text-white hover:bg-[#435042] rounded-lg text-xs font-medium transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve & Publish</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
