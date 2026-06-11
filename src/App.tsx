import { useState, useEffect } from "react";
import { Sparkles, ShoppingBag, Terminal, Lock, Info, RotateCcw } from "lucide-react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import AdminPanel from "./components/AdminPanel";
import AdminAuthModal from "./components/AdminAuthModal";

import { Product, CartItem, Category } from "./types";
import { INITIAL_PRODUCTS } from "./data";

export default function App() {
  // Products management (Loaded from Localstorage or data seed)
  const [products, setProducts] = useState<Product[]>([]);
  
  // Shopping cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Search and Category filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Admin states
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Initialize products on load
  useEffect(() => {
    const stored = localStorage.getItem("nexus_gear_products");
    if (stored) {
      try {
        const parsed: Product[] = JSON.parse(stored);
        // Make sure newly added seed products are integrated into local storage if they don't exist yet
        const parsedIds = new Set(parsed.map((p) => p.id));
        const missingSeeds = INITIAL_PRODUCTS.filter((p) => !parsedIds.has(p.id));
        if (missingSeeds.length > 0) {
          const updatedList = [...parsed, ...missingSeeds];
          setProducts(updatedList);
          localStorage.setItem("nexus_gear_products", JSON.stringify(updatedList));
        } else {
          setProducts(parsed);
        }
      } catch (err) {
        console.error("Failed to parse stored products, falling back to seeds", err);
        setProducts(INITIAL_PRODUCTS);
        localStorage.setItem("nexus_gear_products", JSON.stringify(INITIAL_PRODUCTS));
      }
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem("nexus_gear_products", JSON.stringify(INITIAL_PRODUCTS));
    }

    // Load cart items if any
    const storedCart = localStorage.getItem("nexus_gear_cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("Failed loading cart items", e);
      }
    }
  }, []);

  // Sync cart items to storage
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("nexus_gear_cart", JSON.stringify(items));
  };

  // Sync products list update helper
  const updateStoreProducts = (nextProducts: Product[]) => {
    setProducts(nextProducts);
    localStorage.setItem("nexus_gear_products", JSON.stringify(nextProducts));
  };

  // 1. Add new listing catalog item (Admin workspace)
  const handleAddProduct = (newProductData: Omit<Product, "id">) => {
    const nextProduct: Product = {
      ...newProductData,
      id: `prod-${Date.now()}`,
    };
    const nextList = [nextProduct, ...products];
    updateStoreProducts(nextList);
  };

  // 2. Edit price level
  const handleEditProductPrice = (id: string, newPrice: number) => {
    const nextList = products.map((p) => {
      if (p.id === id) {
        return { ...p, price: newPrice };
      }
      return p;
    });
    updateStoreProducts(nextList);

    // If edited item exists in the cart, sync price changes instantly in cart
    const nextCart = cartItems.map((item) => {
      if (item.product.id === id) {
        return { ...item, product: { ...item.product, price: newPrice } };
      }
      return item;
    });
    saveCart(nextCart);
  };

  // 3. Delete listed item
  const handleDeleteProduct = (id: string) => {
    const nextList = products.filter((p) => p.id !== id);
    updateStoreProducts(nextList);

    // Also purge deleted elements from the customer active cart
    const nextCart = cartItems.filter((item) => item.product.id !== id);
    saveCart(nextCart);
  };

  // Reset Store to Defaults
  const handleResetCatalog = () => {
    if (confirm("Reset store catalogs to default tech selection? All custom uploads and price updates will be cleared.")) {
      updateStoreProducts(INITIAL_PRODUCTS);
      saveCart([]);
      alert("Storefront has been reverted to factory configuration.");
    }
  };

  // Add Item to cart
  const handleAddToCart = (product: Product) => {
    const existingIndex = cartItems.findIndex((item) => item.product.id === product.id);
    if (existingIndex > -1) {
      const nextCart = [...cartItems];
      nextCart[existingIndex].quantity += 1;
      saveCart(nextCart);
    } else {
      saveCart([...cartItems, { product, quantity: 1 }]);
    }
    // Briefly open slide drawer to confirm it was added
    setIsCartOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateCartQuantity = (id: string, delta: number) => {
    const nextCart = cartItems
      .map((item) => {
        if (item.product.id === id) {
          return { ...item, quantity: item.quantity + delta };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    saveCart(nextCart);
  };

  const handleRemoveCartItem = (id: string) => {
    const nextCart = cartItems.filter((item) => item.product.id !== id);
    saveCart(nextCart);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  // Toggle Admin Portal view
  const handleToggleAdminPortal = () => {
    if (isAdmin) {
      setIsAdminPanelOpen((prev) => !prev);
    } else {
      setIsAdminModalOpen(true);
    }
  };

  // Handle successful password entry
  const handleAdminAuthSuccess = () => {
    setIsAdmin(true);
    setIsAdminPanelOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setIsAdminPanelOpen(false);
  };

  // Filtering Logic
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div id="nexus-app-root" className="min-h-screen bg-[#070b14] flex flex-col text-[#f3f4f6]">
      
      {/* Navbar Container */}
      <Navbar
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        cartCount={cartTotalItems}
        onCartToggle={() => setIsCartOpen(true)}
        isAdmin={isAdmin}
        onAdminToggle={handleAdminLogout}
        onTriggerAdminAuth={() => setIsAdminModalOpen(true)}
      />

      {/* Hero Welcome Unit */}
      <Hero onExploreClick={() => {
        const el = document.getElementById("store-grid-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }} />

      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Active Title bar for current grid selection */}
        <div id="store-grid-section" className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-900 pb-5 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-wide text-cyan-400 uppercase">
              <Sparkles className="h-4 w-4 text-cyan-400 animate-spin-slow" />
              Nexus Hardware Catalog
            </div>
            <h3 className="font-display text-xl font-bold text-white sm:text-2xl mt-1">
              {selectedCategory === "All" ? "All Premium Hardware" : `${selectedCategory} Collection`}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-mono">
              Displaying {filteredProducts.length} devices
            </span>
            
            {/* Reset Factory catalog - useful feature */}
            {isAdmin && (
              <button
                id="reset-store-defaults-btn"
                onClick={handleResetCatalog}
                className="flex items-center gap-1 rounded bg-[#0b1424] border border-slate-800/80 hover:border-cyan-500/30 px-2 py-1 text-[11px] text-slate-400 hover:text-white transition-all ml-4"
                title="Restore Storefront Default Mockups"
              >
                <RotateCcw className="h-3 w-3 text-cyan-400" />
                Factory Restore
              </button>
            )}
          </div>
        </div>

        {/* Display Grid */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-slate-900 bg-[#080d17]/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-slate-600 border border-slate-900">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <h4 className="mt-4 text-sm font-semibold text-white">No items found</h4>
            <p className="mt-1 text-xs text-slate-500 max-w-xs px-4">
              Try adjusting your query filter or browser category to explore more high-performance electronics.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isAdmin={isAdmin}
                onAddToCart={handleAddToCart}
                onDeleteProduct={handleDeleteProduct}
                onEditProductPrice={handleEditProductPrice}
              />
            ))}
          </div>
        )}

        {/* Floating Admin Trigger Action Info Card when not logged in to make it fully explicit and transparent */}
        {!isAdmin && (
          <div className="mt-12 rounded-xl border border-blue-950/40 bg-blue-950/5 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs leading-relaxed max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-slate-400">
              <Info className="h-4 w-4 text-cyan-500 shrink-0" />
              <span>
                Want to test editing price values, deleting listed gadgets, or uploading custom mock products?
              </span>
            </div>
            <button
              id="admin-info-trigger"
              onClick={() => setIsAdminModalOpen(true)}
              className="inline-flex self-start sm:self-auto items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold tracking-wider uppercase text-[10px]"
            >
              Sign in as Admin
              <Lock className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </main>

      {/* Global Interactive Drawer States */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      <AdminAuthModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={handleAdminAuthSuccess}
      />

      {isAdmin && isAdminPanelOpen && (
        <AdminPanel
          products={products}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
          onEditProductPrice={handleEditProductPrice}
          onClose={() => setIsAdminPanelOpen(false)}
        />
      )}

      {/* Styled Footer */}
      <footer className="mt-auto border-t border-slate-950 bg-[#05080f] py-8 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-slate-600 font-mono">
              © {new Date().getFullYear()} NEXUSGEAR Lagos. Licensed for AI Studio E-commerce Simulation.
            </p>
            <div className="flex items-center gap-4 text-[10px] text-slate-600 font-mono">
              <button
                id="footer-admin-toggle"
                onClick={handleToggleAdminPortal}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1"
              >
                <Terminal className="h-3 w-3" />
                {isAdmin ? "Admin Desk" : "Owner Workspace Secret Access"}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
