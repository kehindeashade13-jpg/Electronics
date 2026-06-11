import { useState, FormEvent } from "react";
import { Plus, Trash2, Edit3, X, Sparkles, ShieldCheck, Tag, Box, AlertCircle } from "lucide-react";
import { Product, Category } from "../types";

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, "id">) => void;
  onDeleteProduct: (id: string) => void;
  onEditProductPrice: (id: string, newPrice: number) => void;
  onClose: () => void;
}

export default function AdminPanel({
  products,
  onAddProduct,
  onDeleteProduct,
  onEditProductPrice,
  onClose,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"add" | "manage">("add");
  const [idEditingPriceMap, setIdEditingPriceMap] = useState<Record<string, string>>({});

  // Add Product Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceStr, setPriceStr] = useState("");
  const [category, setCategory] = useState<Category>(Category.Phones);
  const [imageUrl, setImageUrl] = useState("");

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleCreateProduct = (e: FormEvent) => {
    e.preventDefault();
    const priceVal = parseFloat(priceStr);
    if (!name.trim()) return alert("Product name is required.");
    if (isNaN(priceVal) || priceVal <= 0) return alert("Please specify a valid price details.");

    // Fallback Image mapping if blank to keep it simple and clean
    let selectedImage = imageUrl.trim();
    if (!selectedImage) {
      if (category === Category.Phones) {
        selectedImage = "https://images.unsplash.com/photo-159c311549405-b1a8d0b28ecc?auto=format&fit=crop&w=600&q=80";
      } else if (category === Category.Laptops) {
        selectedImage = "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80";
      } else if (category === Category.Audio) {
        selectedImage = "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80";
      } else {
        selectedImage = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80";
      }
    }

    onAddProduct({
      name,
      description,
      price: priceVal,
      category,
      imageUrl: selectedImage,
    });

    // Reset Form Fields
    setName("");
    setDescription("");
    setPriceStr("");
    setCategory(Category.Phones);
    setImageUrl("");
    alert("New product listing uploaded successfully!");
    setActiveTab("manage");
  };

  const startEditPrice = (id: string, currentPrice: number) => {
    setIdEditingPriceMap((prev) => ({ ...prev, [id]: currentPrice.toString() }));
  };

  const saveEditPrice = (id: string) => {
    const val = parseFloat(idEditingPriceMap[id]);
    if (!isNaN(val) && val >= 0) {
      onEditProductPrice(id, val);
      setIdEditingPriceMap((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } else {
      alert("Please enter a valid amount.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#02050b]/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-blue-900/40 bg-[#070b14] shadow-2xl">
        
        {/* Header Indicator */}
        <div className="flex items-center justify-between border-b border-slate-900 bg-[#0a0f1d] px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-950 text-cyan-400">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-white sm:text-base">
                Owner Workspace Control Panel
              </h3>
              <p className="text-[10px] text-emerald-400 font-mono">
                System Authorized • Session Secured
              </p>
            </div>
          </div>
          <button
            id="admin-close-panel"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Workspace Toolbar Tabs */}
        <div className="flex border-b border-slate-900 bg-[#080d18] px-6">
          <button
            id="admin-tab-add"
            onClick={() => setActiveTab("add")}
            className={`flex items-center gap-2 py-3 text-xs font-semibold border-b-2 px-1 transition-all duration-150 ${
              activeTab === "add"
                ? "border-cyan-500 text-cyan-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Plus className="h-4 w-4" />
            Post New Product
          </button>
          
          <button
            id="admin-tab-manage"
            onClick={() => setActiveTab("manage")}
            className={`flex items-center gap-2 py-3 text-xs font-semibold border-b-2 px-1 ml-6 transition-all duration-150 ${
              activeTab === "manage"
                ? "border-cyan-500 text-cyan-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Box className="h-4 w-4" />
            Manage Listings ({products.length})
          </button>
        </div>

        {/* Tab Body Worksheets */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {activeTab === "add" ? (
            /* Upload product format */
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="prod-name" className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                    PRODUCT TITLE *
                  </label>
                  <input
                    id="prod-name"
                    type="text"
                    required
                    placeholder="e.g. MacBook Pro Mini"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-[#0e1423] px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="prod-price" className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                    PRICE IN NAIRA * (₦)
                  </label>
                  <input
                    id="prod-price"
                    type="number"
                    required
                    placeholder="e.g. 520000"
                    value={priceStr}
                    onChange={(e) => setPriceStr(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-[#0e1423] px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="prod-cat" className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                    CATEGORY CLASSIFICATION *
                  </label>
                  <select
                    id="prod-cat"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full rounded-xl border border-slate-800 bg-[#0e1423] px-3.5 py-2.5 text-xs text-slate-300 outline-none focus:border-cyan-500"
                  >
                    {Object.values(Category).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="prod-img" className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                    IMAGE LINK URL (OPTIONAL)
                  </label>
                  <input
                    id="prod-img"
                    type="url"
                    placeholder="e.g. https://images.unsplash.com/photo-..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-[#0e1423] px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-500"
                  />
                  <p className="text-[9px] text-slate-500">
                    * If left blank, a high-quality preset matching the category will be assigned.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="prod-desc" className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                  DESCRIPTION & KEY FEATURES *
                </label>
                <textarea
                  id="prod-desc"
                  required
                  rows={3}
                  placeholder="Specify hardware features, chip configuration, warranty limits..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-[#0e1423] px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <button
                id="submit-product-listing"
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 text-xs font-bold text-black transition-all hover:bg-cyan-400"
              >
                <Sparkles className="h-4 w-4" />
                Publish to Storefront
              </button>
            </form>
          ) : (
            /* Manage existing products listing */
            <div className="space-y-3">
              {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center text-slate-500">
                  <AlertCircle className="h-8 w-8 text-slate-600 mb-2" />
                  <p className="text-sm">No active catalog products found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-900 bg-slate-950/40 text-slate-400">
                        <th className="p-3 text-[10px] font-mono tracking-wider uppercase">Product Name</th>
                        <th className="p-3 text-[10px] font-mono tracking-wider uppercase">Category</th>
                        <th className="p-3 text-[10px] font-mono tracking-wider uppercase">Price</th>
                        <th className="p-3 text-right text-[10px] font-mono tracking-wider uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900/40">
                      {products.map((p) => {
                        const isEditing = idEditingPriceMap[p.id] !== undefined;
                        return (
                          <tr key={p.id} className="hover:bg-[#0c1221]/50 text-slate-300">
                            <td className="p-3">
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.imageUrl}
                                  alt=""
                                  referrerPolicy="no-referrer"
                                  className="h-8 w-8 rounded object-cover bg-slate-900"
                                />
                                <span className="font-semibold text-white line-clamp-1 max-w-[180px]">{p.name}</span>
                              </div>
                            </td>
                            
                            <td className="p-3">
                              <span className="inline-flex items-center gap-1 rounded bg-slate-950 px-2 py-0.5 text-[10px] font-medium text-cyan-400">
                                <Tag className="h-2.5 w-2.5" />
                                {p.category}
                              </span>
                            </td>

                            <td className="p-3">
                              {isEditing ? (
                                <div className="flex items-center gap-1">
                                  <span className="text-slate-500">₦</span>
                                  <input
                                    id={`tbl-edit-${p.id}`}
                                    type="number"
                                    value={idEditingPriceMap[p.id]}
                                    onChange={(e) =>
                                      setIdEditingPriceMap((prev) => ({
                                        ...prev,
                                        [p.id]: e.target.value,
                                      }))
                                    }
                                    className="w-20 rounded border border-cyan-500 bg-slate-900 px-1 py-0.5 text-xs text-white"
                                  />
                                </div>
                              ) : (
                                <span className="font-mono font-bold text-white">{formatNaira(p.price)}</span>
                              )}
                            </td>

                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {isEditing ? (
                                  <>
                                    <button
                                      id={`tbl-save-${p.id}`}
                                      onClick={() => saveEditPrice(p.id)}
                                      className="rounded bg-emerald-950 px-2 py-1 text-[10px] font-semibold text-emerald-400 hover:bg-emerald-900"
                                    >
                                      Save
                                    </button>
                                    <button
                                      id={`tbl-cancel-${p.id}`}
                                      onClick={() => {
                                        setIdEditingPriceMap((prev) => {
                                          const next = { ...prev };
                                          delete next[p.id];
                                          return next;
                                        });
                                      }}
                                      className="rounded bg-slate-900 px-2 py-1 text-[10px] text-slate-400 hover:bg-slate-800"
                                    >
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      id={`tbl-edit-trig-${p.id}`}
                                      onClick={() => startEditPrice(p.id, p.price)}
                                      className="flex h-7 w-7 items-center justify-center rounded bg-slate-900 text-slate-400 hover:text-cyan-400"
                                      title="Edit Price"
                                    >
                                      <Edit3 className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      id={`tbl-delete-trig-${p.id}`}
                                      onClick={() => {
                                        if (confirm(`Remove ${p.name} from listing catalog?`)) {
                                          onDeleteProduct(p.id);
                                        }
                                      }}
                                      className="flex h-7 w-7 items-center justify-center rounded bg-red-950/20 text-red-400 hover:bg-red-950/50"
                                      title="Delete Product"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="border-t border-slate-900 bg-[#090e1a] px-6 py-3 text-center text-[10px] text-slate-500 font-mono">
          Changes are synchronized to LocalStorage and reflect immediately on your customer-facing catalog storefront.
        </div>
      </div>
    </div>
  );
}
