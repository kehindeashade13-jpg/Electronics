import React, { useState, FormEvent, useEffect } from "react";
import { Plus, Trash2, Edit3, X, Sparkles, ShieldCheck, Tag, Box, AlertCircle, Settings, Image as ImageIcon, Upload } from "lucide-react";
import { Product, Category } from "../types";

const GALLERY_IMAGES = [
  // Phones
  {
    url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
    name: "Titanium Max",
    category: Category.Phones,
  },
  {
    url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    name: "S24 Ultra",
    category: Category.Phones,
  },
  {
    url: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    name: "Pixel 8 Pro",
    category: Category.Phones,
  },
  {
    url: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
    name: "Z Fold5 Folding",
    category: Category.Phones,
  },
  {
    url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    name: "Xiaomi 14 Pro",
    category: Category.Phones,
  },
  {
    url: "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&w=600&q=80",
    name: "OnePlus 12 Active",
    category: Category.Phones,
  },
  {
    url: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80",
    name: "iPhone 15 Light",
    category: Category.Phones,
  },
  // Laptops
  {
    url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    name: "MacBook Pro M3",
    category: Category.Laptops,
  },
  {
    url: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80",
    name: "ROG Zephyrus G14",
    category: Category.Laptops,
  },
  {
    url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80",
    name: "Dell XPS 15 Creator",
    category: Category.Laptops,
  },
  {
    url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80",
    name: "ROG Strix SCAR",
    category: Category.Laptops,
  },
  {
    url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
    name: "Lenovo ThinkPad X1",
    category: Category.Laptops,
  },
  {
    url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",
    name: "HP Spectre Convertible",
    category: Category.Laptops,
  },
  {
    url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    name: "Surface Laptop 5",
    category: Category.Laptops,
  },
  // Audio
  {
    url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    name: "Sony WH-1000XM5",
    category: Category.Audio,
  },
  {
    url: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=600&q=80",
    name: "AirPods Max Silver",
    category: Category.Audio,
  },
  {
    url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    name: "Bose QuietComfort",
    category: Category.Audio,
  },
  {
    url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    name: "Momentum Wireless",
    category: Category.Audio,
  },
  {
    url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
    name: "JBL Boombox 3",
    category: Category.Audio,
  },
  {
    url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
    name: "Sonos Era 300 Smart",
    category: Category.Audio,
  },
  // Accessories
  {
    url: "https://images.unsplash.com/photo-1618384887929-16ec33faf9c1?auto=format&fit=crop&w=600&q=80",
    name: "Keychron Q1 Board",
    category: Category.Accessories,
  },
  {
    url: "https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&w=600&q=80",
    name: "Anker Prime Power",
    category: Category.Accessories,
  },
  {
    url: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
    name: "Logitech MX Master",
    category: Category.Accessories,
  },
  {
    url: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80",
    name: "Apple Watch Active",
    category: Category.Accessories,
  },
  {
    url: "https://images.unsplash.com/photo-1601524909162-be87252be298?auto=format&fit=crop&w=600&q=80",
    name: "Samsung Portable SSD",
    category: Category.Accessories,
  },
  {
    url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
    name: "Elgato Stream Deck",
    category: Category.Accessories,
  }
];

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, "id">) => void;
  onDeleteProduct: (id: string) => void;
  onEditProductPrice: (id: string, newPrice: number) => void;
  onClose: () => void;
  currentPassword: string;
  onUpdatePassword: (newPass: string) => void;
}

export default function AdminPanel({
  products,
  onAddProduct,
  onDeleteProduct,
  onEditProductPrice,
  onClose,
  currentPassword,
  onUpdatePassword,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"add" | "manage" | "settings">("add");
  const [idEditingPriceMap, setIdEditingPriceMap] = useState<Record<string, string>>({});

  // Add Product Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceStr, setPriceStr] = useState("");
  const [category, setCategory] = useState<Category>(Category.Phones);
  const [imageUrl, setImageUrl] = useState("");
  const [imageSource, setImageSource] = useState<"upload" | "gallery" | "custom">("upload");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG, JPG, WEBP, etc.).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImageUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // Sync default category-specific gallery picture if in gallery mode
  useEffect(() => {
    if (imageSource === "gallery") {
      const filtered = GALLERY_IMAGES.filter((img) => img.category === category);
      if (filtered.length > 0) {
        const alreadyMatching = filtered.some((img) => img.url === imageUrl);
        if (!alreadyMatching) {
          setImageUrl(filtered[0].url);
        }
      }
    }
  }, [category, imageSource, imageUrl]);

  // Settings State variables
  const [newPassForm, setNewPassForm] = useState("");
  const [confirmPassForm, setConfirmPassForm] = useState("");
  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState(false);

  const handlePasswordChange = (e: FormEvent) => {
    e.preventDefault();
    setPassError("");
    setPassSuccess(false);

    if (!newPassForm.trim()) {
      setPassError("Password cannot be empty.");
      return;
    }
    if (newPassForm !== confirmPassForm) {
      setPassError("Passwords do not match. Please verify.");
      return;
    }

    onUpdatePassword(newPassForm);
    setPassSuccess(true);
    setNewPassForm("");
    setConfirmPassForm("");
  };

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

          <button
            id="admin-tab-settings"
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 py-3 text-xs font-semibold border-b-2 px-1 ml-6 transition-all duration-150 ${
              activeTab === "settings"
                ? "border-cyan-500 text-cyan-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Settings className="h-4 w-4" />
            Security Settings
          </button>
        </div>

        {/* Tab Body Worksheets */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {activeTab === "add" && (
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
                <div className="flex flex-col gap-1.5 justify-start">
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

                  {/* Selected Image Preview Thumbnail */}
                  <div className="mt-4 rounded-xl border border-slate-800/80 bg-slate-950/40 p-3 flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
                      {imageUrl ? (
                        <img src={imageUrl} alt="Preview" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-600">
                          <ImageIcon className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-[9px] font-mono tracking-wider text-slate-500 uppercase">Selected Asset</span>
                      <span className="block text-xs font-mono text-cyan-400 font-bold truncate">
                        {imageUrl ? (
                          imageUrl.startsWith("data:") 
                            ? "Local Gallery Upload" 
                            : imageUrl.split('?')[0].substring(imageUrl.lastIndexOf('/') + 1)
                        ) : "None assigned"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 rounded-xl bg-[#0a0f1d] p-4 border border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                      IMAGE SOURCE *
                    </span>
                    <div className="flex rounded-lg bg-slate-950 p-0.5 border border-slate-900">
                      <button
                        type="button"
                        onClick={() => setImageSource("upload")}
                        className={`rounded px-2 py-0.5 text-[9px] font-bold uppercase transition-all ${
                          imageSource === "upload"
                            ? "bg-cyan-500 text-black shadow"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Upload file
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageSource("gallery")}
                        className={`rounded px-2 py-0.5 text-[9px] font-bold uppercase transition-all ${
                          imageSource === "gallery"
                            ? "bg-cyan-500 text-black shadow"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Preset Gallery
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageSource("custom")}
                        className={`rounded px-2 py-0.5 text-[9px] font-bold uppercase transition-all ${
                          imageSource === "custom"
                            ? "bg-cyan-500 text-black shadow"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Custom URL
                      </button>
                    </div>
                  </div>

                  {imageSource === "upload" && (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`relative mt-2 flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center transition-all duration-150 ${
                        isDragging
                          ? "border-cyan-400 bg-cyan-950/10"
                          : "border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-950/60"
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileChange(e.target.files[0]);
                          }
                        }}
                        className="absolute inset-0 cursor-pointer opacity-0"
                      />
                      <Upload className="mb-2 h-7 w-7 text-cyan-400/80 animate-pulse" />
                      <p className="text-xs font-semibold text-slate-300">
                        Upload from Phone Gallery / Device
                      </p>
                      <p className="mt-1 text-[9px] text-slate-500 leading-normal">
                        Drag & drop or tap here to upload a photo from your device's library.
                      </p>
                      {imageUrl && imageUrl.startsWith("data:") && (
                        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-950/40 px-2 py-0.5 border border-emerald-900/35 text-[9px] font-mono text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <span>Image Loaded Successfully</span>
                        </div>
                      )}
                    </div>
                  )}

                  {imageSource === "custom" && (
                    <div className="space-y-1.5 mt-1.5">
                      <label htmlFor="prod-img" className="text-[9px] font-mono tracking-wider text-slate-500 uppercase">
                        IMAGE LINK URL
                      </label>
                      <input
                        id="prod-img"
                        type="url"
                        placeholder="e.g. https://images.unsplash.com/photo-..."
                        value={imageUrl && !imageUrl.startsWith("data:") ? imageUrl : ""}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full rounded-xl border border-slate-800 bg-[#0e1423] px-3 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-500"
                      />
                      <p className="text-[9px] text-slate-500 leading-normal">
                        * Provide a direct, public web URL to display your custom product picture.
                      </p>
                    </div>
                  )}

                  {imageSource === "gallery" && (
                    <div className="space-y-1.5 mt-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] text-slate-400 leading-normal font-medium">
                          Select category match photo:
                        </span>
                        <span className="text-[8px] font-mono text-cyan-400 uppercase">
                          {category} Collection
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-1.5 max-h-[110px] overflow-y-auto pr-1 bg-slate-950/60 p-1.5 rounded-lg border border-slate-900">
                        {GALLERY_IMAGES.filter((img) => img.category === category).map((img, idx) => {
                          const isSelected = imageUrl === img.url;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setImageUrl(img.url)}
                              className={`group relative aspect-square overflow-hidden rounded border transition-all ${
                                isSelected
                                  ? "border-cyan-400 ring-2 ring-cyan-400/20 scale-95"
                                  : "border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600"
                              }`}
                            >
                              <img
                                src={img.url}
                                alt={img.name}
                                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-200"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 py-0.5 px-0.5 text-[7px] font-mono text-center text-slate-300 truncate">
                                {img.name}
                              </div>
                              {isSelected && (
                                <div className="absolute top-0.5 right-0.5 rounded-full bg-cyan-400 p-0.5 text-black">
                                  <svg className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
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
          )}

          {activeTab === "manage" && (
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

          {activeTab === "settings" && (
            <div className="space-y-6 max-w-md mx-auto">
              <div className="rounded-xl border border-slate-800/80 bg-[#080d17] p-5">
                <h4 className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-cyan-400 uppercase">
                  <ShieldCheck className="h-4 w-4" />
                  Active Access Control
                </h4>
                <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-950 p-3 border border-slate-900">
                  <span className="text-[11px] text-slate-400 font-mono">Current Administrative Passkey:</span>
                  <span className="text-xs font-mono font-bold tracking-wider text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {currentPassword}
                  </span>
                </div>
                <p className="mt-2 text-[10px] text-slate-500 leading-normal">
                  This key authorizes price alterations, product catalog deletions, and custom item publishing. Inform authorized staff after changing.
                </p>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="new-panel-pass" className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                    New Security Passkey *
                  </label>
                  <input
                    id="new-panel-pass"
                    type="text"
                    required
                    placeholder="Enter customized administrative passkey"
                    value={newPassForm}
                    onChange={(e) => {
                      setNewPassForm(e.target.value);
                      if (passError) setPassError("");
                      if (passSuccess) setPassSuccess(false);
                    }}
                    className="w-full rounded-xl border border-slate-800 bg-[#0e1423] px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="confirm-panel-pass" className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                    Confirm New Passkey *
                  </label>
                  <input
                    id="confirm-panel-pass"
                    type="text"
                    required
                    placeholder="Repeat customized passkey"
                    value={confirmPassForm}
                    onChange={(e) => {
                      setConfirmPassForm(e.target.value);
                      if (passError) setPassError("");
                      if (passSuccess) setPassSuccess(false);
                    }}
                    className="w-full rounded-xl border border-slate-800 bg-[#0e1423] px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-500"
                  />
                </div>

                {passError && (
                  <div className="flex items-center gap-1.5 rounded-lg bg-red-950/20 border border-red-900/40 px-3 py-2 text-[11px] text-red-400">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{passError}</span>
                  </div>
                )}

                {passSuccess && (
                  <div className="flex items-center gap-1.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 px-3 py-2 text-[11px] text-emerald-400">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                    <span>Administrator passkey updated successfully and persistence enabled.</span>
                  </div>
                )}

                <button
                  id="submit-password-change"
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 text-xs font-bold text-black transition-all hover:bg-cyan-400"
                >
                  <Settings className="h-4 w-4" />
                  Save Security Credentials
                </button>
              </form>
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
