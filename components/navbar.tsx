"use client";

import { useState, useEffect } from "react";
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
  highlight?: boolean;
  sub?: {
    label: string;
    items: {
      label: string;
      href: string;
    }[];
  }[];
};

const navLinks: NavItem[] = [
  {
    label: "New Arrivals",
    href: "/products",
  },
  {
    label: "Women",
    href: "#",
    sub: [
      {
        label: "Clothing",
        items: [
          { label: "Tops", href: "#" },
          { label: "Dresses", href: "#" },
          { label: "Bottoms", href: "#" },
          { label: "Outerwear", href: "#" },
        ],
      },
      {
        label: "Accessories",
        items: [
          { label: "Bags", href: "#" },
          { label: "Jewelry", href: "#" },
          { label: "Belts", href: "#" },
          { label: "Scarves", href: "#" },
        ],
      },
    ],
  },
  {
    label: "Men",
    href: "#",
    sub: [
      {
        label: "Fashion",
        items: [
          { label: "Shirts", href: "#" },
          { label: "Pants", href: "#" },
          { label: "Jackets", href: "#" },
        ],
      },
      {
        label: "Footwear",
        items: [
          { label: "Sneakers", href: "#" },
          { label: "Boots", href: "#" },
          { label: "Sandals", href: "#" },
        ],
      },
    ],
  },
  {
    label: "Sale",
    href: "#",
    highlight: true,
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs text-center py-2 tracking-[0.2em] uppercase">
        Free shipping on orders over $75 · New collection every Friday
      </div>

      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-xl shadow-md" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span
                className="text-2xl font-bold tracking-tight text-stone-900"
                style={{
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                WooCommerce
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 text-sm font-medium pb-1 border-b-2 transition-all duration-200 ${
                      link.highlight
                        ? "text-rose-600 border-rose-600 hover:text-rose-700"
                        : "text-stone-700 border-transparent hover:text-stone-900 hover:border-stone-900"
                    }`}
                  >
                    {link.label}

                    {link.sub && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          activeDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Mega Dropdown */}
                  {link.sub && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 min-w-[500px] bg-white border border-stone-100 rounded-xl shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
                      <div className="grid grid-cols-2 gap-10">
                        {link.sub.map((group) => (
                          <div key={group.label}>
                            <h4 className="text-sm font-semibold text-stone-900 mb-4 uppercase tracking-wide">
                              {group.label}
                            </h4>

                            <div className="space-y-3">
                              {group.items.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  className="block text-sm text-stone-600 hover:text-stone-900 transition-colors"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="hidden md:flex p-2 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition">
                <Search size={20} />
              </button>

              <button className="p-2 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition">
                <Heart size={20} />
              </button>

              <button className="relative p-2 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition">
                <ShoppingBag size={20} />

                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center font-semibold">
                  3
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-stone-700"
                onClick={() => setMobileOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-100 bg-white flex flex-col">
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-stone-900"
            >
              WooCommerce
            </Link>

            <button onClick={() => setMobileOpen(false)}>
              <X size={26} className="text-stone-700" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 overflow-y-auto px-6 py-6">
            <div className="space-y-8">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className={`block text-lg font-semibold ${
                      link.highlight ? "text-rose-600" : "text-stone-900"
                    }`}
                  >
                    {link.label}
                  </Link>

                  {/* Mobile Submenu */}
                  {link.sub && (
                    <div className="mt-5 space-y-5 pl-4 border-l border-stone-200">
                      {link.sub.map((group) => (
                        <div key={group.label}>
                          <h4 className="text-sm font-semibold uppercase tracking-wide text-stone-800 mb-3">
                            {group.label}
                          </h4>

                          <div className="space-y-3">
                            {group.items.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="block text-sm text-stone-500 hover:text-stone-900 transition-colors"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
