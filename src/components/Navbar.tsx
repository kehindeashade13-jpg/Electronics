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
    <header className="sticky top-0 z-40 w-full border-b border-blue-950/40 bg-[#070b14]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-radial from-blue-600 to-cyan-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <Sparkles className="h-5 w-5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
              NEXUS<span className="text-cyan-400">GEAR</span>
            </h1>
            <p className="-mt-1 text-[10px] font-mono tracking-widest text-[#5d6d84] uppercase">
              Premium Tech Hub
            </p>
          </div>
        </div>

        {/* Real-time Navigation Search / Category Bar on Desktop */}
        <div className="hidden max-w-md flex-1 px-8 md:block">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-slate-400" />
            </span>
            <input
              id="desktop-search-input"
              type="text"
              placeholder="Search premium electronics..."
              value={searchValue}
              onChange={handleSearchKeyPress}
              className="w-full rounded-xl border border-slate-800 bg-[#0e1423] py-2 pl-9 pr-4 text-xs font-sans text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-500 focus:bg-[#12192d] focus:ring-1 focus:ring-cyan-500"
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
              className="flex items-center gap-1.5 rounded-xl border border-red-950 bg-red-950/10 px-3 py-2 text-xs font-medium text-red-400 transition-all duration-200 hover:bg-red-950/35"
              title="Exit Admin Workspace"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Admin Lock</span>
            </button>
          ) : (
            <button
              id="admin-login-trigger"
              onClick={onTriggerAdminAuth}
              className="flex items-center gap-1.5 rounded-xl border border-blue-950/80 bg-[#0c162b] px-3 py-2 text-xs font-medium text-blue-400 transition-all duration-200 hover:border-cyan-500/50 hover:bg-slate-900"
              title="Administrator Sign In"
            >
              <Lock className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Admin Portal</span>
            </button>
          )}

          {/* Cart Trigger */}
          <button
            id="navbar-cart-toggle"
            onClick={onCartToggle}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-[#0c1324] text-slate-300 transition-all duration-200 hover:border-cyan-500/50 hover:bg-[#11192e] hover:text-white"
          >
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-cyan-500 px-1 text-[9px] font-bold text-black animate-bounce shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Categories & Search on Mobile Grid */}
      <div className="border-t border-slate-900 bg-[#060a12] px-4 py-2 sm:px-6 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          
          {/* Category Chips Container */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((category) => (
              <button
                id={`cat-btn-${category.toLowerCase()}`}
                key={category}
                onClick={() => onCategorySelect(category)}
                className={`flex shrink-0 items-center justify-center rounded-lg px-3 py-1 text-xs font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-cyan-500 text-black shadow-[0_0_8px_rgba(6,182,212,0.25)]"
                    : "bg-[#0c1324] text-slate-400 border border-slate-800/60 hover:border-slate-700 hover:text-white"
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
              className="w-full rounded-xl border border-slate-800 bg-[#0c1324] py-1.5 pl-9 pr-4 text-xs font-sans text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-500 focus:bg-[#12192d] focus:ring-1 focus:ring-cyan-500"
            />
          </div>

        </div>
      </div>
    </header>
  );
}
