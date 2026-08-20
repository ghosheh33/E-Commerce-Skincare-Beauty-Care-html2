import React, { useState } from 'react';
import { X, Sparkles, Plus, Image as ImageIcon } from 'lucide-react';
import { Product } from '../../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState<Product['category']>('Serums');
  const [price, setPrice] = useState<number>(65);
  const [stock, setStock] = useState<number>(50);
  const [size, setSize] = useState('30ml / 1 fl. oz');
  const [keyBotanicals, setKeyBotanicals] = useState('Squalane & Rosehip');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80');
  const [description, setDescription] = useState('');
  const [benefits, setBenefits] = useState('Deep hydration, restores cellular radiance, strengthens lipid barrier.');
  const [ingredients, setIngredients] = useState('Squalane, Evening Primrose, Vitamin C, Rosehip Seed Oil');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name,
      subtitle,
      sku: sku || `SKU-${Math.floor(100 + Math.random() * 900)}`,
      category,
      price: Number(price),
      rating: 5.0,
      reviewsCount: 1,
      stock: Number(stock),
      isLowStock: Number(stock) < 15,
      size,
      keyBotanicals,
      images: [imageUrl],
      description: description || 'A potent botanical formulation designed for radiant skin balance.',
      skinTypes: ['Dry', 'Combination', 'Sensitive'],
      benefits: benefits.split(',').map((b) => b.trim()),
      ingredients: ingredients.split(',').map((i) => i.trim()),
      isFeatured: false,
    };

    onAddProduct(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl luxury-shadow-lg overflow-hidden border border-[#e5e1dd] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-[#fcf9f8] border-b border-[#ece8e5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#516050]" />
            <h3 className="font-serif text-lg font-medium text-[#1c1b1b]">Add New Botanical Formulation</h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#747872] hover:text-[#1c1b1b] rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-medium text-[#1c1b1b]">Formulation Name</label>
              <input
                type="text"
                required
                placeholder="E.g. Velvet Restoration Crème"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3 py-2 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-[#1c1b1b]">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3 py-2 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
              >
                <option value="Serums">Serums</option>
                <option value="Cleansers">Cleansers</option>
                <option value="Moisturizers">Moisturizers</option>
                <option value="Masks & Treatments">Masks & Treatments</option>
                <option value="Toners">Toners</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-medium text-[#1c1b1b]">Price ($ USD)</label>
              <input
                type="number"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3 py-2 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
              />
            </div>
            <div className="space-y-1">
              <label className="font-medium text-[#1c1b1b]">Initial Stock Qty</label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3 py-2 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
              />
            </div>
            <div className="space-y-1">
              <label className="font-medium text-[#1c1b1b]">SKU Code</label>
              <input
                type="text"
                placeholder="E.g. MC-004"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3 py-2 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-medium text-[#1c1b1b]">Size / Bottle Spec</label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3 py-2 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
              />
            </div>
            <div className="space-y-1">
              <label className="font-medium text-[#1c1b1b]">Key Bio-Actives</label>
              <input
                type="text"
                value={keyBotanicals}
                onChange={(e) => setKeyBotanicals(e.target.value)}
                className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3 py-2 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-medium text-[#1c1b1b]">Product Image URL</label>
            <div className="flex gap-2 items-center">
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3 py-2 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
              />
              <img
                src={imageUrl}
                alt="Preview"
                className="w-9 h-9 rounded-lg object-cover border border-[#ece8e5]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-medium text-[#1c1b1b]">Formulation Story & Description</label>
            <textarea
              rows={2}
              required
              placeholder="Describe clinical efficacy and sensory notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl p-3 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium text-[#1c1b1b]">Key Benefits (Comma separated)</label>
            <input
              type="text"
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3 py-2 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium text-[#1c1b1b]">Full Ingredients (Comma separated)</label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3 py-2 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-[#ece8e5]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[#747872] hover:text-[#1c1b1b]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#516050] text-white font-medium rounded-xl hover:bg-[#435042] flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
