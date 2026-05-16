import { X } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  Shop: ["New Arrivals", "Women", "Men", "Accessories", "Footwear", "Sale"],
  Help: [
    "FAQ",
    "Shipping & Returns",
    "Size Guide",
    "Track Order",
    "Contact Us",
  ],
  Company: ["About Us", "Careers", "Sustainability", "Press", "Affiliates"],
};

const socials = [
  { icon: X, label: "Instagram" },
  { icon: X, label: "Twitter" },
  { icon: X, label: "Facebook" },
  { icon: X, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              WooCommerce
            </span>
            <p className="text-sm mt-4 leading-relaxed max-w-xs">
              Premium fashion for the modern individual. Crafted with care,
              designed for life.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map(({ icon: Icon, label }) => (
                <Link
                  key={label}
                  href="/"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-200 text-stone-400"
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="/"
                      className="text-sm hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8 border-t border-stone-800 border-b">
          {[
            { title: "Free Shipping", desc: "On orders over $75" },
            { title: "Easy Returns", desc: "30-day return policy" },
            { title: "Secure Payment", desc: "256-bit SSL encryption" },
            { title: "Sustainability", desc: "100% eco packaging" },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="text-sm font-semibold text-white">
                {item.title}
              </div>
              <div className="text-xs mt-1">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs">&copy; 2026 LUMIÈRE. All rights reserved.</p>
          <div className="flex gap-5 text-xs">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
