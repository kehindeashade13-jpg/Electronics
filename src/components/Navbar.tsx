import { useState, ChangeEvent } from "react";
import { ShoppingCart, Search, Lock, Unlock, Sparkles, LogOut } from "lucide-react";
import { Category } from "../types";

interface NavbarProps {
  onSearchChange: (search: string) => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  cartCount: number;
  onCartToggle: () => void;
  isAdmin: boolean;
  onAdminToggle: () => void;
  onTriggerAdminAuth: () => void;
}

export default function Navbar({
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  cartCount,
  onCartToggle,
  isAdmin,
  onAdminToggle,
  onTriggerAdminAuth,
}: NavbarProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchKeyPress = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearchChange(e.target.value);
  };

  const categories = ["All", ...Object.values(Category)];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 border border-slate-905 shadow-sm">
            <Sparkles className="h-4.5 w-4.5 text-yellow-400" />
          </div>
          <div>
            <h1 className="font-display text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
              NEXUS<span className="text-amber-500">GEAR</span>
            </h1>
            <p className="-mt-1 text-[9px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
              Premium Tech Hub
            </p>
          </div>
        </div>

        {/* Real-time Navigation Search / Category Bar on Desktop */}
        <div className="hidden max-w-md flex-1 px-8 md:block">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-slate-450" />
            </span>
            <input
              id="desktop-search-input"
              type="text"
              placeholder="Search premium electronics..."
              value={searchValue}
              onChange={handleSearchKeyPress}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs font-sans text-slate-850 placeholder-slate-400 outline-none transition-all duration-300 focus:border-amber-400 focus:bg-white focus:ring-1 focus:ring-amber-400 shadow-inner"
            />
          </div>
        </div>

        {/* Right side controls: Admin access, Cart & notifications */}
        <div className="flex items-center gap-3">
          
          {/* Admin Space Key */}
          {isAdmin ? (
            <button
              id="admin-logout-btn"
              onClick={onAdminToggle}
              className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-650 transition-all duration-200 hover:bg-red-105"
              title="Exit Admin Workspace"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Admin Lock</span>
            </button>
          ) : (
            <button
              id="admin-login-trigger"
              onClick={onTriggerAdminAuth}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-amber-450 hover:bg-slate-55"
              title="Administrator Sign In"
            >
              <Lock className="h-3.5 w-3.5 text-slate-500" />
              <span className="hidden sm:inline">Admin Portal</span>
            </button>
          )}

          {/* Cart Trigger */}
          <button
            id="navbar-cart-toggle"
            onClick={onCartToggle}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-250 hover:border-amber-400 hover:bg-slate-55"
          >
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[17px] items-center justify-center rounded-full bg-amber-450 px-1 text-[9px] font-extrabold text-slate-950 shadow">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Categories & Search on Mobile Grid */}
      <div className="border-t border-slate-100 bg-[#FAF9F5] px-4 py-2 sm:px-6 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          
          {/* Category Chips Container */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((category) => (
              <button
                id={`cat-btn-${category.toLowerCase()}`}
                key={category}
                onClick={() => onCategorySelect(category)}
                className={`flex shrink-0 items-center justify-center rounded-lg px-3 py-1 text-xs font-semibold transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-slate-900 text-white shadow-sm font-semibold"
                    : "bg-white text-slate-650 border border-slate-200 hover:border-amber-400 hover:text-slate-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Mobile Search input - visible on mobile only */}
          <div className="relative block md:hidden">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-3.5 w-3.5 text-slate-400" />
            </span>
            <input
              id="mobile-search-input"
              type="text"
              placeholder="Search modern devices..."
              value={searchValue}
              onChange={handleSearchKeyPress}
              className="w-full rounded-xl border border-slate-200 bg-white py-1.5 pl-9 pr-4 text-xs font-sans text-slate-800 placeholder-slate-400 outline-none transition-all duration-300 focus:border-amber-400 shadow-sm"
            />
          </div>

        </div>
      </div>
    </header>
  );
}
