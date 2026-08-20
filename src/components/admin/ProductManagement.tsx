import React, { useState, useMemo } from 'react';
import { Search, Plus, Trash2, Edit3, AlertTriangle, Check, Layers } from 'lucide-react';
import { Product } from '../../types';
import { AddProductModal } from './AddProductModal';

interface ProductManagementProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateStock: (productId: string, newStock: number) => void;
}

export const ProductManagement: React.FC<ProductManagementProps> = ({
  products,
  onAddProduct,
  onDeleteProduct,
  onUpdateStock,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState<'All' | 'Low' | 'InStock'>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [stockInputValue, setStockInputValue] = useState<number>(0);

  const categories = ['All', 'Cleansers', 'Serums', 'Moisturizers', 'Masks & Treatments', 'Toners'];

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
      if (stockFilter === 'Low' && !p.isLowStock) return false;
      if (stockFilter === 'InStock' && p.stock <= 0) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, categoryFilter, stockFilter, searchQuery]);

  const handleStartStockEdit = (product: Product) => {
    setEditingStockId(product.id);
    setStockInputValue(product.stock);
  };

  const handleSaveStock = (productId: string) => {
    onUpdateStock(productId, Number(stockInputValue));
    setEditingStockId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#1c1b1b]">
            Product Management
          </h2>
          <p className="text-xs text-[#747872] mt-0.5">
            Manage botanical inventory, active catalog items, and stock thresholds.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#516050] hover:bg-[#435042] text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filters Bar (Screenshot 2 & 5) */}
      <div className="bg-white p-4 rounded-2xl border border-[#ece8e5] luxury-shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by product name, SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl pl-9 pr-3 py-2 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3 py-2 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>

          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as any)}
            className="bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3 py-2 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
          >
            <option value="All">All Stock Levels</option>
            <option value="Low">Low Stock Alert (&lt; 15)</option>
            <option value="InStock">In Stock Only</option>
          </select>
        </div>
      </div>

      {/* Products Data Table (Screenshot 2 & 5) */}
      <div className="bg-white rounded-2xl border border-[#ece8e5] luxury-shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#fcf9f8] text-[#747872] font-semibold uppercase tracking-wider border-b border-[#ece8e5]">
                <th className="py-3.5 px-6">Product</th>
                <th className="py-3.5 px-6">SKU</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Price</th>
                <th className="py-3.5 px-6">Stock Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ece8e5]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#747872]">
                    No formulations match the filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((prod) => (
                  <tr key={prod.id} className="hover:bg-[#fcf9f8] transition-colors">
                    {/* Image + Title */}
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-11 h-11 rounded-lg object-cover bg-stone-100 border border-[#ece8e5]"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-medium text-[#1c1b1b]">{prod.name}</p>
                          <p className="text-[11px] text-[#747872]">{prod.size || '30ml'}</p>
                        </div>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="py-3.5 px-6 font-mono text-[#747872]">{prod.sku}</td>

                    {/* Category Pill */}
                    <td className="py-3.5 px-6">
                      <span className="px-2.5 py-1 bg-[#edeae7] text-[#444842] rounded-full text-[10px] font-semibold">
                        {prod.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-6 font-serif font-semibold text-[#1c1b1b]">
                      ${prod.price.toFixed(2)}
                    </td>

                    {/* Stock */}
                    <td className="py-3.5 px-6">
                      {editingStockId === prod.id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            value={stockInputValue}
                            onChange={(e) => setStockInputValue(Number(e.target.value))}
                            className="w-16 bg-[#fcf9f8] border border-[#516050] rounded px-2 py-0.5 text-xs text-[#1c1b1b]"
                          />
                          <button
                            onClick={() => handleSaveStock(prod.id)}
                            className="p-1 bg-[#516050] text-white rounded hover:bg-[#435042]"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              prod.stock <= 0
                                ? 'bg-red-500'
                                : prod.isLowStock
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                          />
                          <span className="font-medium text-[#1c1b1b]">
                            {prod.stock} Units {prod.isLowStock && <span className="text-amber-600">(Low)</span>}
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-6 text-right space-x-1">
                      <button
                        onClick={() => handleStartStockEdit(prod)}
                        className="p-1.5 text-[#516050] hover:bg-[#edeae7] rounded-lg transition-colors"
                        title="Edit inventory"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteProduct(prod.id)}
                        className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-[#edeae7] rounded-lg transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={onAddProduct}
      />
    </div>
  );
};
