import React, { useState } from 'react';
import {
  Users,
  Package,
  Layers,
  ShoppingBag,
  TrendingUp,
  Download,
  Calendar,
  ArrowUpRight,
  Printer
} from 'lucide-react';
import { Order, Product, SanctuaryTab } from '../../types';

interface AdminOverviewProps {
  orders: Order[];
  products: Product[];
  onViewInvoice: (order: Order) => void;
  onNavigateToOrders: () => void;
  onNavigateToProducts: () => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  orders,
  products,
  onViewInvoice,
  onNavigateToOrders,
  onNavigateToProducts,
}) => {
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [hoveredMonth, setHoveredMonth] = useState<{ month: string; value: number } | null>(null);

  // Sales monthly data
  const salesData = [
    { month: 'Jan', revenue: 18400 },
    { month: 'Feb', revenue: 22600 },
    { month: 'Mar', revenue: 26800 },
    { month: 'Apr', revenue: 24100 },
    { month: 'May', revenue: 31500 },
    { month: 'Jun', revenue: 38200 },
    { month: 'Jul', revenue: 42900 },
  ];

  // Category shares
  const categoryData = [
    { name: 'Serums', percentage: 42, count: 18, color: '#516050' },
    { name: 'Moisturizers', percentage: 28, count: 12, color: '#6d806c' },
    { name: 'Cleansers', percentage: 20, count: 10, color: '#91a690' },
    { name: 'Masks & Treatments', percentage: 10, count: 8, color: '#bccbb9' },
  ];

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);

  return (
    <div className="space-y-8">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#1c1b1b]">
            Dashboard Overview
          </h2>
          <p className="text-xs text-[#747872] mt-0.5">
            Welcome back. Real-time metrics across dispensary sales and inventory.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#c4c8c0] rounded-xl text-xs text-[#444842]">
            <Calendar className="w-3.5 h-3.5 text-[#516050]" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent focus:outline-none font-medium cursor-pointer"
            >
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Year to Date</option>
            </select>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1c1b1b] text-white hover:bg-[#333] rounded-xl text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 4 Stat KPI Cards Grid (Screenshot 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat 1: Total Users */}
        <div className="bg-white p-6 rounded-2xl border border-[#ece8e5] luxury-shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-[#747872]">
            <span className="font-medium uppercase tracking-wider text-[10px]">Total Members</span>
            <div className="p-2 bg-[#f6f3f2] rounded-xl text-[#516050]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-[#1c1b1b]">12,450</h3>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+12% vs last month</span>
            </p>
          </div>
        </div>

        {/* Stat 2: Total Products */}
        <div
          onClick={onNavigateToProducts}
          className="bg-white p-6 rounded-2xl border border-[#ece8e5] luxury-shadow-sm space-y-3 cursor-pointer hover:border-[#516050] transition-colors"
        >
          <div className="flex items-center justify-between text-xs text-[#747872]">
            <span className="font-medium uppercase tracking-wider text-[10px]">Active Formulations</span>
            <div className="p-2 bg-[#f6f3f2] rounded-xl text-[#516050]">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-[#1c1b1b]">{products.length}</h3>
            <p className="text-[11px] text-[#747872]">
              {products.filter((p) => p.isLowStock).length} stock alerts
            </p>
          </div>
        </div>

        {/* Stat 3: Total Categories */}
        <div className="bg-white p-6 rounded-2xl border border-[#ece8e5] luxury-shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-[#747872]">
            <span className="font-medium uppercase tracking-wider text-[10px]">Botanical Lines</span>
            <div className="p-2 bg-[#f6f3f2] rounded-xl text-[#516050]">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-[#1c1b1b]">5</h3>
            <p className="text-[11px] text-[#747872]">Serums, Cleansers, Moisturizers...</p>
          </div>
        </div>

        {/* Stat 4: Total Orders */}
        <div
          onClick={onNavigateToOrders}
          className="bg-white p-6 rounded-2xl border border-[#ece8e5] luxury-shadow-sm space-y-3 cursor-pointer hover:border-[#516050] transition-colors"
        >
          <div className="flex items-center justify-between text-xs text-[#747872]">
            <span className="font-medium uppercase tracking-wider text-[10px]">Orders Fulfilled</span>
            <div className="p-2 bg-[#f6f3f2] rounded-xl text-[#516050]">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-[#1c1b1b]">3,820</h3>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+8.4% vs last period</span>
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section: Sales Overview + Top Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sales Overview Line Chart Area */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-[#ece8e5] luxury-shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-medium text-[#1c1b1b]">Sales Overview</h3>
              <p className="text-xs text-[#747872]">Monthly revenue curve across all botanical distribution</p>
            </div>
            <span className="font-serif text-lg font-bold text-[#516050]">$184,500 YTD</span>
          </div>

          {/* Interactive SVG Spline Line Graph */}
          <div className="relative h-64 w-full pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200">
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#516050" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#516050" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="180" x2="700" y2="180" stroke="#f0ece9" strokeWidth="1" />
              <line x1="0" y1="120" x2="700" y2="120" stroke="#f0ece9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="60" x2="700" y2="60" stroke="#f0ece9" strokeWidth="1" strokeDasharray="4 4" />

              {/* Area Under Curve */}
              <path
                d="M 50 150 Q 150 110, 250 80 T 450 60 T 650 20 L 650 180 L 50 180 Z"
                fill="url(#salesGrad)"
              />

              {/* Line Curve */}
              <path
                d="M 50 150 Q 150 110, 250 80 T 450 60 T 650 20"
                fill="none"
                stroke="#516050"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Data Points */}
              {[
                { x: 50, y: 150, m: 'Jan', val: '$18.4k' },
                { x: 150, y: 125, m: 'Feb', val: '$22.6k' },
                { x: 250, y: 80, m: 'Mar', val: '$26.8k' },
                { x: 350, y: 95, m: 'Apr', val: '$24.1k' },
                { x: 450, y: 60, m: 'May', val: '$31.5k' },
                { x: 550, y: 40, m: 'Jun', val: '$38.2k' },
                { x: 650, y: 20, m: 'Jul', val: '$42.9k' },
              ].map((pt, idx) => (
                <g key={idx} className="cursor-pointer group">
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="5"
                    fill="#ffffff"
                    stroke="#516050"
                    strokeWidth="3"
                    className="hover:r-7 transition-all"
                  />
                  <text
                    x={pt.x}
                    y="198"
                    textAnchor="middle"
                    fill="#747872"
                    fontSize="11"
                    fontFamily="Inter, sans-serif"
                  >
                    {pt.m}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Top Categories Bar Chart Area */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#ece8e5] luxury-shadow-sm space-y-6">
          <div>
            <h3 className="font-serif text-lg font-medium text-[#1c1b1b]">Top Categories</h3>
            <p className="text-xs text-[#747872]">Revenue share by formulation line</p>
          </div>

          <div className="space-y-4 pt-2">
            {categoryData.map((cat) => (
              <div key={cat.name} className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#1c1b1b]">
                  <span className="font-medium">{cat.name}</span>
                  <span className="font-semibold">{cat.percentage}%</span>
                </div>
                <div className="w-full bg-[#f2eeeb] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#fcf9f8] rounded-xl border border-[#ece8e5] text-xs text-[#516050] space-y-1">
            <span className="font-bold uppercase text-[10px] tracking-wider">Growth Leader</span>
            <p>Serums volume surged +24% following the launch of the Midnight Recovery formulation.</p>
          </div>
        </div>
      </div>

      {/* Recent Orders Table (Screenshot 4) */}
      <div className="bg-white rounded-2xl border border-[#ece8e5] luxury-shadow-sm overflow-hidden space-y-4">
        <div className="px-6 py-5 border-b border-[#ece8e5] flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-medium text-[#1c1b1b]">Recent Orders</h3>
            <p className="text-xs text-[#747872]">Latest transactions waiting dispatch or completed</p>
          </div>
          <button
            onClick={onNavigateToOrders}
            className="text-xs text-[#516050] hover:underline font-semibold flex items-center gap-1"
          >
            <span>View All Orders</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#fcf9f8] text-[#747872] font-semibold uppercase tracking-wider border-b border-[#ece8e5]">
                <th className="py-3 px-6">Order ID</th>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6 text-right">Amount</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ece8e5]">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-[#fcf9f8] transition-colors">
                  <td className="py-3.5 px-6 font-mono font-medium text-[#1c1b1b]">{order.id}</td>
                  <td className="py-3.5 px-6">
                    <p className="font-medium text-[#1c1b1b]">{order.customerName}</p>
                    <p className="text-[11px] text-[#747872]">{order.customerEmail}</p>
                  </td>
                  <td className="py-3.5 px-6 text-[#747872]">{order.date}</td>
                  <td className="py-3.5 px-6 text-right font-serif font-semibold text-[#1c1b1b]">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-6">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : order.status === 'Shipped'
                          ? 'bg-blue-50 text-blue-700'
                          : order.status === 'Cancelled'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button
                      onClick={() => onViewInvoice(order)}
                      className="p-1 text-[#516050] hover:bg-[#edeae7] rounded transition-colors inline-flex items-center gap-1"
                      title="View invoice"
                    >
                      <Printer className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
