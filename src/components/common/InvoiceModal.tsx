import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Order } from '../../types';

interface InvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl luxury-shadow-lg overflow-hidden border border-[#e5e1dd] animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#fcf9f8] border-b border-[#ece8e5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold tracking-wider text-[#1c1b1b]">LUMINA SKIN</span>
            <span className="text-xs text-[#747872] px-2 py-0.5 bg-[#edeae7] rounded font-mono">
              INVOICE {order.id}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 text-[#516050] hover:bg-[#edeae7] rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
              title="Print invoice"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#747872] hover:text-[#1c1b1b] hover:bg-[#edeae7] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="p-8 space-y-6 text-sm text-[#1c1b1b]" id="printable-invoice">
          {/* Invoice Top Details */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-[#edeae7]">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#1c1b1b]">Lumina Skin Botanical Care</h2>
              <p className="text-xs text-[#747872] mt-1">108 Botanical Way, Suite 400</p>
              <p className="text-xs text-[#747872]">Portland, OR 97205 • contact@luminaskin.com</p>
            </div>
            <div className="sm:text-right space-y-1">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#e8ede7] text-[#3c4a3c]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Paid in Full</span>
              </div>
              <p className="text-xs text-[#747872] mt-1">Invoice Date: <span className="font-medium text-[#1c1b1b]">{order.date}</span></p>
              <p className="text-xs text-[#747872]">Order Status: <span className="font-medium text-[#1c1b1b]">{order.status}</span></p>
            </div>
          </div>

          {/* Billed To & Shipped To */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-[#edeae7] text-xs">
            <div>
              <span className="font-medium text-[#747872] uppercase tracking-wider block mb-1">Customer / Billed To:</span>
              <p className="font-semibold text-[#1c1b1b] text-sm">{order.customerName}</p>
              <p className="text-[#444842]">{order.customerEmail}</p>
            </div>
            <div>
              <span className="font-medium text-[#747872] uppercase tracking-wider block mb-1">Shipping Destination:</span>
              <p className="text-[#1c1b1b]">{order.shippingAddress.street}</p>
              <p className="text-[#1c1b1b]">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
              <p className="text-[#1c1b1b]">{order.shippingAddress.country}</p>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#edeae7] text-xs text-[#747872] font-semibold uppercase tracking-wider">
                  <th className="py-2.5">Item Description</th>
                  <th className="py-2.5 text-center">Qty</th>
                  <th className="py-2.5 text-right">Price</th>
                  <th className="py-2.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2eeea] text-xs">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 pr-2">
                      <p className="font-medium text-[#1c1b1b]">{item.name}</p>
                      <p className="text-[#747872] text-[11px]">{item.size}</p>
                    </td>
                    <td className="py-3 text-center text-[#444842]">{item.quantity}</td>
                    <td className="py-3 text-right text-[#444842]">${item.price.toFixed(2)}</td>
                    <td className="py-3 text-right font-medium text-[#1c1b1b]">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Totals Summary */}
          <div className="pt-4 border-t border-[#edeae7] flex justify-end">
            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-[#444842]">
                <span>Subtotal:</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#444842]">
                <span>Estimated Sales Tax:</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#444842]">
                <span>Carbon-Neutral Shipping:</span>
                <span>{order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-serif text-base font-bold text-[#1c1b1b] pt-2 border-t border-[#edeae7]">
                <span>Total Paid:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Botanical Guarantee Note */}
          <div className="bg-[#f7f5f3] p-4 rounded-xl flex items-center gap-3 text-xs text-[#516050]">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <p>
              Thank you for trusting Lumina with your daily ritual. Every formulation is crafted in sterile batch runs and backed by our 30-day contentment guarantee.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#fcf9f8] border-t border-[#ece8e5] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1c1b1b] text-white text-xs font-medium rounded-lg hover:bg-[#333] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
