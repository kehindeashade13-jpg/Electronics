import { useState } from "react";
import { ShoppingBag, Trash2, Edit2, Check, X, Tag } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  key?: string;
  product: Product;
  isAdmin: boolean;
  onAddToCart: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onEditProductPrice: (id: string, newPrice: number) => void;
}

export default function ProductCard({
  product,
  isAdmin,
  onAddToCart,
  onDeleteProduct,
  onEditProductPrice,
}: ProductCardProps) {
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [editedPrice, setEditedPrice] = useState(product.price.toString());

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handlePriceSave = () => {
    const val = parseFloat(editedPrice);
    if (!isNaN(val) && val >= 0) {
      onEditProductPrice(product.id, val);
      setIsEditingPrice(false);
    } else {
      alert("Please enter a valid price amount.");
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-205 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400 hover:shadow-md"
    >
      {/* Admin Action Badge Indicator */}
      {isAdmin && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-md bg-slate-950 border border-slate-900 px-2 py-1 text-[9px] font-mono font-bold tracking-wider text-yellow-400 uppercase shadow-md">
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
          OWNER PREVIEW
        </div>
      )}

      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50 border-b border-slate-100">
        <img
          id={`product-img-${product.id}`}
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Safe fallback if unsplash image fails to load
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80";
          }}
        />
        {/* Category Badge */}
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-slate-950/75 border border-slate-900/10 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm shadow-sm">
          <Tag className="h-3 w-3 text-amber-400" />
          {product.category}
        </span>
      </div>

      {/* Info Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-display text-sm font-bold text-slate-900 sm:text-base tracking-tight line-clamp-1 group-hover:text-amber-600 transition-colors">
          {product.name}
        </h3>
        <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2 md:line-clamp-3">
          {product.description}
        </p>

        {/* Pricing Layout */}
        <div className="mt-4 flex flex-col justify-start gap-1">
          <span className="text-[10px] font-mono tracking-wider text-slate-455 uppercase">
            ESTIMATED PRICE
          </span>
          {isEditingPrice ? (
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-amber-500">₦</span>
              <input
                id={`edit-price-input-${product.id}`}
                type="number"
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
                className="w-28 rounded-md border border-amber-400 bg-white px-2 py-1 text-xs font-semibold text-slate-950 focus:outline-none focus:ring-1 focus:ring-amber-400"
                autoFocus
              />
              <button
                id={`save-price-btn-${product.id}`}
                onClick={handlePriceSave}
                className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500 text-black hover:bg-emerald-400 cursor-pointer shadow-sm"
              >
                <Check className="h-3.5 w-3.5" />
              </button>
              <button
                id={`cancel-price-btn-${product.id}`}
                onClick={() => {
                  setEditedPrice(product.price.toString());
                  setIsEditingPrice(false);
                }}
                className="flex h-6 w-6 items-center justify-center rounded bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer shadow-sm"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="font-mono text-base font-extrabold text-slate-950 sm:text-lg">
                {formatNaira(product.price)}
              </span>

              {/* Inline Owner Quick Price Edit */}
              {isAdmin && (
                <button
                  id={`edit-price-trigger-${product.id}`}
                  onClick={() => setIsEditingPrice(true)}
                  className="flex h-6 w-6 items-center justify-center rounded bg-slate-100 text-slate-500 hover:bg-amber-400 hover:text-black shadow-sm transition-all cursor-pointer"
                  title="Quick Edit Price"
                >
                  <Edit2 className="h-3 w-3" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Add to Cart & Delete buttons section */}
        <div className="mt-5 flex items-center gap-1.5">
          {isAdmin ? (
            <div className="flex w-full items-center gap-2">
              <button
                id={`product-card-add-disabled-${product.id}`}
                disabled
                className="flex-1 rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-400 cursor-not-allowed text-center"
              >
                Admin Mode Active
              </button>
              
              <button
                id={`product-card-delete-${product.id}`}
                onClick={() => {
                  if (confirm(`Are you sure you want to delete ${product.name}?`)) {
                    onDeleteProduct(product.id);
                  }
                }}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 shadow-sm cursor-pointer"
                title="Delete Listing"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              id={`add-to-cart-btn-${product.id}`}
              onClick={() => onAddToCart(product)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-amber-400 border border-slate-900 text-white hover:text-black py-2.5 text-xs font-bold transition-all duration-300 shadow-sm cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
