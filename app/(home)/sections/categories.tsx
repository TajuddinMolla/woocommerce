import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    label: "Women",
    count: "1,240 styles",
    image:
      "https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "from-stone-800/60",
  },
  {
    label: "Men",
    count: "890 styles",
    image:
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "from-stone-800/60",
  },
  {
    label: "Accessories",
    count: "320 styles",
    image:
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "from-stone-800/60",
  },
  {
    label: "Footwear",
    count: "540 styles",
    image:
      "https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "from-stone-800/60",
  },
];

export default function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-medium mb-2">
              Shop by
            </p>
            <h2
              className="text-4xl font-bold text-stone-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Category
            </h2>
          </div>
          <Link
            href="/categories"
            className="hidden sm:inline-flex text-sm font-medium text-stone-600 hover:text-stone-900 underline underline-offset-4 transition-colors"
          >
            View all categories
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={`/categories/${encodeURIComponent(cat.label)}`}
              className="group relative rounded-2xl overflow-hidden aspect-3/4 cursor-pointer"
            >
              <Image
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                width={1000}
                height={1000}
              />
              <div
                className={`absolute inset-0 bg-linear-to-t ${cat.color} to-transparent`}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div
                  className="text-white font-bold text-xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {cat.label}
                </div>
                <div className="text-stone-300 text-xs mt-1">{cat.count}</div>
              </div>
              <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-amber-400 rounded-2xl transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
