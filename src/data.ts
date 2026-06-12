import { Category, Product } from "./types";

export const INITIAL_PRODUCTS: Product[] = [
  // --- Phones ---
  {
    id: "prod-1",
    name: "iPhone 15 Pro Max (256GB)",
    description: "Aerospace-grade titanium design, A17 Pro chip, custom Action button, and the strongest pro camera system.",
    price: 1850000,
    category: Category.Phones,
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-3",
    name: "Samsung Galaxy S24 Ultra",
    description: "S Pen support, Galaxy AI capability, 200MP camera, Snapdragon 8 Gen 3, and majestic raw Titanium building.",
    price: 1650000,
    category: Category.Phones,
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-p1",
    name: "Google Pixel 8 Pro (128GB)",
    description: "Advanced Google Tensor G3 chip, upgraded camera system, and industry-leading Magic Editor photo tuning.",
    price: 1150000,
    category: Category.Phones,
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-p2",
    name: "Samsung Galaxy Z Fold5 5G",
    description: "Ultimate multi-tasking workspace with expansive 7.6-inch folding Dynamic AMOLED 2X internal immersive screen.",
    price: 2200000,
    category: Category.Phones,
    imageUrl: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-p3",
    name: "Xiaomi 14 Ultra (512GB)",
    description: "Leica Summilux professional optics, quad high-res camera array, and flagship Snapdragon 8 Gen 3 performance.",
    price: 1350000,
    category: Category.Phones,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-p4",
    name: "OnePlus 12 Dual Sim",
    description: "4th Gen Hasselblad camera for mobile, Snapdragon 8 Gen 3, and ultrafast 100W SuperVOOC rapid flash charge.",
    price: 980000,
    category: Category.Phones,
    imageUrl: "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-p5",
    name: "iPhone 15 Plus (128GB)",
    description: "Super Retina XDR display, Dynamic Island, A16 Bionic chip, and outstanding all-day active battery life.",
    price: 1250000,
    category: Category.Phones,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80"
  },

  // --- Laptops ---
  {
    id: "prod-2",
    name: "MacBook Pro 14\" M3 Max",
    description: "Apple M3 Max chip, 36GB unified memory, 1TB SSD, 14.2-inch Liquid Retina XDR display. Space Black.",
    price: 3600000,
    category: Category.Laptops,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-5",
    name: "ROG Zephyrus G14 Gaming",
    description: "AMD Ryzen 9, RTX 4070, 16GB DDR5, 1TB SSD, Nebula HDR OLED display for flawless work & play gaming.",
    price: 2950000,
    category: Category.Laptops,
    imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-l1",
    name: "Dell XPS 15 9530 Creator",
    description: "Intel Core i9, 32GB RAM, 1TB SSD, GeForce RTX 4060, stunning 15.6-inch OLED responsive touch display.",
    price: 3100000,
    category: Category.Laptops,
    imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-l2",
    name: "ASUS ROG Strix SCAR 16",
    description: "Extreme gaming machine with Intel i9-14900HX, RTX 4090, 32GB RAM, and stunning ROG Aura Sync design.",
    price: 4550000,
    category: Category.Laptops,
    imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-l3",
    name: "Lenovo ThinkPad X1 Carbon Gen 11",
    description: "Ultra-portable corporate business icon. Intel Core i7 vPro, 32GB LPDDR5, and legendary keyboard comfort.",
    price: 2800000,
    category: Category.Laptops,
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-l4",
    name: "HP Spectre x360 2-in-1",
    description: "Convertible laptop with Intel Core Ultra 7 processor, AI acceleration engine, 2.8K OLED folding touch screen.",
    price: 2150000,
    category: Category.Laptops,
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-l5",
    name: "Microsoft Surface Laptop 5",
    description: "Elegant and silent powerhouse. Intel Evo Core i7, 16GB RAM, 512GB SSD, sharp touchscreen display format.",
    price: 1680000,
    category: Category.Laptops,
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80"
  },

  // --- Audio ---
  {
    id: "prod-4",
    name: "Sony WH-1000XM5 ANC",
    description: "Industry-leading active noise canceling wireless headphones with spectacular dual-processor audio output.",
    price: 520000,
    category: Category.Audio,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-8",
    name: "AirPods Max (Space Gray)",
    description: "Apple-designed dynamic driver details custom computational audio, active transparency, and premium knit mesh.",
    price: 920000,
    category: Category.Audio,
    imageUrl: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-a1",
    name: "Bose QuietComfort Ultra",
    description: "Immersive spatial audio, flagship noise canceling performance, custom-tuned sound, and legendary soft ear cushions.",
    price: 480000,
    category: Category.Audio,
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-a2",
    name: "Sennheiser Momentum True Wireless 4",
    description: "Lossless audiophile-grade wireless performance, customizable EQ profiles, and advanced adaptive ANC filters.",
    price: 320000,
    category: Category.Audio,
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-a3",
    name: "JBL Boombox 3 Waterproof",
    description: "Massive 3-way acoustics speaker with deep room-filling bass, IP67 dustproof/waterproof structure, & 24hr play.",
    price: 620000,
    category: Category.Audio,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-a4",
    name: "Sony WF-1000XM5 ANC Earbuds",
    description: "Astonishingly immersive sound in a tiny profile. Dynamic Driver X engine and multi-microphone sound isolation.",
    price: 310000,
    category: Category.Audio,
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-a5",
    name: "Sonos Era 300 Smart Speaker",
    description: "Revolutionary spatial audio speaker with Dolby Atmos tuning. Perfect standalone or for premium home theater grids.",
    price: 580000,
    category: Category.Audio,
    imageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80"
  },

  // --- Accessories ---
  {
    id: "prod-6",
    name: "Keychron Q1 Mechanical Keyboard",
    description: "Full aluminum custom hot-swappable mechanical keyboard featuring double-gasket layout and QMK/VIA.",
    price: 260000,
    category: Category.Accessories,
    imageUrl: "https://images.unsplash.com/photo-1658422685846-53b8b512c4ed?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-7",
    name: "Anker Prime 20,000mAh Power Bank",
    description: "Ultra-high capacity external battery pack with 200W total smart outputs and smart interactive digital display.",
    price: 145000,
    category: Category.Accessories,
    imageUrl: "https://images.unsplash.com/photo-1701048825700-1c9cdcb49141?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-ac1",
    name: "Logitech MX Master 3S Mouse",
    description: "Ergonomic masterpiece wireless mouse. 8K DPI high tracking sensor, silent click tech, and MagSpeed scrolling.",
    price: 115000,
    category: Category.Accessories,
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-ac2",
    name: "Apple Watch Series 9 GPS",
    description: "Comprehensive blood oxygen tracking, heart rate wellness sensors, stellar sports tracking, and watchOS power.",
    price: 680000,
    category: Category.Accessories,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-ac3",
    name: "Samsung T9 Portable SSD 2TB",
    description: "Supercharged file transit up to 2,000MB/s USB-C speed with heavy silicone protective armour shielding.",
    price: 240000,
    category: Category.Accessories,
    imageUrl: "https://images.unsplash.com/photo-1601524909162-be87252be298?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-ac4",
    name: "Belkin BoostCharge Pro 3-in-1",
    description: "Stylish MagSafe charging dock for iPhone, Apple Watch, and AirPods with 15W wireless stream delivery.",
    price: 165000,
    category: Category.Accessories,
    imageUrl: "https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-ac5",
    name: "Elgato Stream Deck MK.2",
    description: "Studio-grade deck controller for content creators. 15 customisable tactile LCD keys to trigger dynamic macros.",
    price: 195000,
    category: Category.Accessories,
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80"
  }
];
